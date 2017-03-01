import handlebars from 'handlebars';
import cookieParser from 'cookie-parser';
import etag from 'etag';
import express from 'express';
import fs from 'fs';
import Helmet from 'react-helmet';
import md5 from 'md5';
import Memcached from 'memcached';
import moment from 'moment';
import path from 'path';
import queryString from 'query-string';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Router from './dist/js/Router';
import MainComponent from './dist/js/MainComponent';
global.localStorage = require('localStorage');

const readFileContentsSync = file =>
    fs.readFileSync(file, {encoding: 'utf8'});

const TIMESTAMP_FORMAT = 'ddd, MMM DD YYYY HH:mm:ss [GMT]';
const TEN_DAYS_IN_SECS = 864000; // 10 days
const PRODUCTION = process.env.NODE_ENV === 'production';
const SOURCE_DIR = PRODUCTION ? 'dist' : 'src';
let GIT_REV_HASH = PRODUCTION ? readFileContentsSync('.GIT_REV_HASH') : md5(Date.now().toString());
console.log('GIT_REV_HASH: ', GIT_REV_HASH);

const memcached = new Memcached('127.0.0.1:11211');

const app = express();
app.set('etag', false);
app.use(cookieParser());
app.disable('x-powered-by');

const eightdays = { maxAge: 8 * 24 * 3600 * 1000 };
const farfuture = { maxAge: 1 * 365 * 12 * 30 * 24 * 3600 * 1000 };
const nocache = { maxAge: 0 };

app.use('/favicon.ico', express.static(path.join(__dirname, 'public', 'favicon.ico'), eightdays));
app.use('/robots.txt', express.static(path.join(__dirname, 'public', 'robots.txt'), nocache));
app.use('/assets', express.static(path.join(__dirname, 'src', 'assets'), farfuture));
app.use('/bundles', express.static(path.join(__dirname, SOURCE_DIR, 'bundles'), farfuture));

// for uptime robot
app.head('/', (req, res) => {
    res.end();
});

const indexHtml = readFileContentsSync(path.join(__dirname, SOURCE_DIR, 'index.html'));
const notFoundHtml = readFileContentsSync(path.join(__dirname, 'src', '404.html'));
const errorHtml = readFileContentsSync(path.join(__dirname, 'src', '500.html'));
const compiledTemplate = handlebars.compile(indexHtml);
const notFoundCompiled = handlebars.compile(notFoundHtml);
const errorCompiled = handlebars.compile(errorHtml);

const isNotModified = (ifModifiedSince, lastModified) => {
    if (ifModifiedSince && lastModified) {
        const ims = new Date(ifModifiedSince);
        const lm = moment(new Date(lastModified));
        if (lm.isSameOrBefore(ims)) {
            return true;
        }
    }
    return false;
};

app.get('*', (req, res, next) => {
    const componentName = Router.urlToComponentName(req.originalUrl);
    const api = Router.apiCalls(componentName, req.originalUrl);
    Router.fetchData(api)
    .then(({apidata, etags}) => {
        const tag = etag(etags.join() + req.originalUrl + GIT_REV_HASH);
        res.setHeader('ETag', tag);
        res.setHeader('Cache-Control', 'no-cache');

        const ifNoneMatch = req.get('if-none-match');
        if (tag === ifNoneMatch) {
            res.status(304).end();
        }

        const ip = req.get('x-real-ip');
        const rateLimitKey = `rl-node-${ip}`;
        const rateLimitDuration = 60;
        const rateLimitRequests = 30;
        const now = Math.round((new Date()).getTime() / 1000);

        const contentKey = `wb_${tag}`;
        const modifiedKey = `lm_${tag}`;

        memcached.getMulti([contentKey, modifiedKey, rateLimitKey], (err, data) => {
            if (err) {
                next(err);
            }
            let usage = data[rateLimitKey];
            if (usage) {
                if (usage.exp < now) {
                    usage = {
                        'exp': now + rateLimitDuration,
                        'rem': rateLimitRequests
                    };
                    memcached.set(rateLimitKey, usage, rateLimitDuration, () => {});
                } else if (usage.rem > 0) {
                    usage.rem -= 1;
                    res.setHeader('X-Rate-Limit-Remaining', usage.rem);
                    res.setHeader('X-Rate-Limit-Reset', usage.exp);
                    memcached.set(rateLimitKey, usage, usage.exp - now, () => {});
                } else {
                    res.status(429).send('Too many requests').end();
                }
            } else {
                usage = {
                    'exp': now + rateLimitDuration,
                    'rem': rateLimitRequests
                };
                memcached.set(rateLimitKey, usage, rateLimitDuration, () => {});
            }

            let content = data[contentKey];
            const lastModified = data[modifiedKey];
            const ifModifiedSince = req.get('if-modified-since');
            if (lastModified && content) {
                res.setHeader('X-Cache', 'HIT');
                res.setHeader('Last-Modified', lastModified);
                if (isNotModified(ifModifiedSince, lastModified)) {
                    res.status(304).end();
                    return;
                }
                res.send(data[contentKey]);
            } else {
                res.setHeader('X-Cache', 'MISS');
                content = ReactDOMServer.renderToStaticMarkup(React.createElement(MainComponent, {
                    data: apidata,
                    path: req.originalUrl.substr(1).split('?')[0],
                    query: queryString.parse(req.originalUrl.substr(1).split('?')[1]),
                    component: componentName
                }));
                const head = Helmet.rewind();
                const page = compiledTemplate({
                    title: head.title.toString(),
                    meta: head.meta.toString(),
                    link: head.link.toString(),
                    apidata: JSON.stringify(apidata),
                    content
                });
                memcached.set(contentKey, page, TEN_DAYS_IN_SECS, e => {});
                const timestamp = moment.utc().format(TIMESTAMP_FORMAT);
                res.setHeader('Last-Modified', timestamp);
                memcached.set(modifiedKey, timestamp, TEN_DAYS_IN_SECS, e => {});
                res.send(page);
            }
        });
    })
    .catch((err) => {
        next(err);
    });
});

app.use((err, req, res) => {
    if (err) {
        let message;
        const status = err.status || 500;
        res.status(status);
        if (err.status === 404) {
            message = 'We can\'t find what you\'re looking for';
            res.send(notFoundCompiled({
                status,
                title: message,
                content: message
            }));
        } else {
            if (err.status === 429) {
                message = 'You are making too many requests. Wait for some time.';
            } else {
                message = 'We faced an internal error. Try again later.';
                console.log(err);
            }
            res.send(errorCompiled({
                status,
                title: message,
                content: message
            }));
        }
    }
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    if (PRODUCTION) {
        console.log(`Mentions Production Server ${port}`);
    } else {
        console.log(`Mentions Development Server ${port}`);
    }
});
