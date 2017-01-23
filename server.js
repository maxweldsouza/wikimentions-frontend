const production = process.env.NODE_ENV === 'production';

const plugins = [
    // react
    'syntax-flow',
    'syntax-jsx',
    'transform-flow-strip-types',
    'transform-react-jsx',
    'transform-react-display-name',
    'transform-react-constant-elements',
    'transform-object-rest-spread'
];
if (production) {
    plugins.push('transform-react-inline-elements');
}
require("babel-core").transform("code", {});

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';
import path from 'path';
import express from 'express';
import etag from 'etag';
import cookieParser from 'cookie-parser';
const app = express();
import fs from 'fs';
import _ from 'underscore';
import S from 'string';
import request from 'superagent';
import moment from 'moment';
import Memcached from 'memcached';
import md5 from 'md5';

const TIMESTAMP_FORMAT = 'ddd, MMM DD YYYY HH:mm:ss [GMT]';

global.localStorage = require('localStorage');

const memcached = new Memcached('127.0.0.1:11211');
const TEN_DAYS_IN_SECS = 864000; // 10 days

import Router from './src/js/Router';
Router.setBaseUrl('127.0.0.1:8001');

const sourceDir = production ? 'dist' : 'src';

function readFullFile (file) {
    try {
        return fs.readFileSync(file, {encoding: 'utf8'});
    } catch (err) {
        throw err;
    }
}
let GIT_REV_HASH;
if (production) {
    GIT_REV_HASH = readFullFile('.GIT_REV_HASH');
} else {
    GIT_REV_HASH = md5(Date.now().toString());
}

console.log('GIT_REV_HASH: ', GIT_REV_HASH);

app.set('etag', false);
app.use(cookieParser());
app.disable('x-powered-by');

const eightdays = {
    maxAge: 8 * 24 * 3600 * 1000
};
const farfuture = {
    maxAge: 1 * 365 * 12 * 30 * 24 * 3600 * 1000
};
const nocache = {
    maxAge: 0
};

// static files
app.use('/favicon.ico', express.static(`${__dirname}/favicon.ico`, eightdays));
app.use('/robots.txt', express.static(`${__dirname}/robots.txt`, nocache));
app.use('/assets', express.static(path.join(__dirname, sourceDir, 'assets'), farfuture));

// for uptime robot
app.head('/', (req, res) => {
    res.end();
});

const indexHtml = readFullFile(path.join(__dirname, sourceDir, 'index.html'));
const notFoundHtml = readFullFile(path.join(__dirname, sourceDir, '404.html'));
const errorHtml = readFullFile(path.join(__dirname, sourceDir, '500.html'));
const MainComponent = require(path.join(__dirname, sourceDir, 'js', 'MainComponent'));
const compiledTemplate = _.template(indexHtml);
const notFoundCompiled = _.template(notFoundHtml);
const errorCompiled = _.template(errorHtml);

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

app.get(/^(.+)$/, (req, res, next) => {
    try {
        const routeObj = {
            url: req.originalUrl,
            onUpdate: (routeObj) => {
                try {
                    if (routeObj.error) {
                        return next(routeObj.error);
                    }
                    const tag = etag(routeObj.etags.join() + routeObj.url + GIT_REV_HASH);
                    res.setHeader('ETag', tag);
                    res.setHeader('Cache-Control', 'no-cache');

                    const ifNoneMatch = req.get('if-none-match');
                    if (tag === ifNoneMatch) {
                        res.status(304).end();
                        return;
                    }

                    const ip = req.get('x-real-ip');
                    const rateLimitKey = `rl-node-${ip}`;
                    const rateLimitDuration = 60;
                    const rateLimitRequests = 30;
                    const now = Math.round((new Date()).getTime() / 1000);

                    const contentKey = `wb_${tag}`;
                    const modifiedKey = `lm_${tag}`;

                    memcached.getMulti([contentKey, modifiedKey, rateLimitKey], (err, data) => {
                        const usage = data[rateLimitKey];
                        // if (usage) {
                        //     if (usage['exp'] < now) {
                        //         usage = {
                        //             'exp': now + rateLimitDuration,
                        //             'rem': rateLimitRequests
                        //         }
                        //         memcached.set(rateLimitKey, usage, expire=rateLimitDuration, function (err) {});
                        //     } else {
                        //         if (usage['rem'] > 0) {
                        //             usage['rem'] -= 1;
                        //             res.setHeader('X-Rate-Limit-Remaining', usage['rem'])
                        //             res.setHeader('X-Rate-Limit-Reset', usage['exp'])
                        //             memcached.set(rateLimitKey, usage, usage['exp'] - now, function (err) {});
                        //         } else {
                        //             res.status(429).send('Too many requests').end();
                        //             return;
                        //         }
                        //     }
                        // } else {
                        //     usage = {
                        //         'exp': now + rateLimitDuration,
                        //         'rem': rateLimitRequests
                        //     }
                        //     memcached.set(rateLimitKey, usage, expire=rateLimitDuration, function (err) {});
                        // }

                        let content = data[contentKey];
                        const lastModified = data[modifiedKey];
                        const ifModifiedSince = req.get('if-modified-since');
                        if (lastModified && content && !err) {
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
                                data: routeObj.data,
                                path: routeObj.path,
                                query: routeObj.query,
                                component: routeObj.component
                            }));
                            const head = Helmet.rewind();
                            const page = compiledTemplate({
                                title: head.title.toString(),
                                meta: head.meta.toString(),
                                link: head.link.toString(),
                                apidata: S(JSON.stringify(routeObj.data)).escapeHTML().toString(),
                                content
                            });
                            memcached.set(contentKey, page, TEN_DAYS_IN_SECS, e => {});
                            const timestamp = moment.utc().format(TIMESTAMP_FORMAT);
                            res.setHeader('Last-Modified', timestamp);
                            memcached.set(modifiedKey, timestamp, TEN_DAYS_IN_SECS, e => {});
                            res.send(page);
                        }
                    });
                } catch (err) {
                    return next(err);
                }
            }
        };
        Router.route(routeObj);
    } catch (err) {
        if (err) {
            return next(err);
        }
    }
    return;
});

app.use((err, req, res, next) => {
    if (err) {
        let message;
        let content;
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
    if (production) {
        console.log(`Mentions Production Server ${port}`);
    } else {
        console.log(`Mentions Development Server ${port}`);
    }
});
