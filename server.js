var React = require('react');
var ReactDOMServer = require('react-dom/server');
var Helmet = require('react-helmet');
var path = require('path');
var express = require('express');
var etag = require('etag')
var cookieParser = require('cookie-parser');
var app = express();
var fs = require('fs');
var _ = require('underscore');
var S = require('string');
var request = require('superagent');
var moment = require('moment');
var Memcached = require('memcached');
var md5 = require('md5');

var TIMESTAMP_FORMAT = 'ddd, MMM DD YYYY HH:mm:ss [GMT]';

global.localStorage = require('localStorage');
var production = process.env.NODE_ENV === 'production';

var memcached = new Memcached('127.0.0.1:11211');
var TEN_DAYS_IN_SECS = 864000; // 10 days

var plugins = [
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
require('babel-register')({
    plugins: plugins,
    presets: ['es2015']
});

var Router = require('./src/js/Router');
Router.setBaseUrl('127.0.0.1:8001');

var sourceDir = production ? 'dist': 'src';

function readFullFile (file) {
    try {
        return fs.readFileSync(file, {encoding: 'utf8'});
    } catch (err) {
        throw err;
    }
}
var GIT_REV_HASH;
if (production) {
    GIT_REV_HASH = readFullFile('.GIT_REV_HASH');
} else {
    GIT_REV_HASH = md5(Date.now().toString());
}

console.log('GIT_REV_HASH: ', GIT_REV_HASH);

app.set('etag', false);
app.use(cookieParser());
app.disable('x-powered-by');

var eightdays = {
    maxAge: 8 * 24 * 3600 * 1000
}
var farfuture = {
    maxAge: 1 * 365 * 12 * 30 * 24 * 3600 * 1000
}
var nocache = {
    maxAge: 0
}

// static files
app.use('/favicon.ico', express.static(__dirname + '/favicon.ico', eightdays));
app.use('/robots.txt', express.static(__dirname + '/robots.txt', nocache));
app.use('/assets', express.static(path.join(__dirname, sourceDir, 'assets'), farfuture));

// for uptime robot
app.head('/', function (req, res) {
    res.end();
});

var indexHtml = readFullFile(path.join(__dirname, sourceDir, 'index.html'));
var notFoundHtml = readFullFile(path.join(__dirname, sourceDir, '404.html'));
var errorHtml = readFullFile(path.join(__dirname, sourceDir, '500.html'));
var MainComponent = require(path.join(__dirname, sourceDir, 'js', 'MainComponent'));
var compiledTemplate = _.template(indexHtml);
var notFoundCompiled = _.template(notFoundHtml);
var errorCompiled = _.template(errorHtml);

var isNotModified = function (ifModifiedSince, lastModified) {
    if (ifModifiedSince && lastModified) {
        var ims = new Date(ifModifiedSince);
        var lm = moment(new Date(lastModified));
        if (lm.isSameOrBefore(ims)) {
            return true;
        }
    }
    return false;
}

app.get(/^(.+)$/, function(req, res, next) {
    try {
        var routeObj = {
            url: req.originalUrl,
            onUpdate: (routeObj) => {
                try {
                    if (routeObj.error) {
                        return next(routeObj.error);
                    }
                    var tag = etag(routeObj.etags.join() + routeObj.url + GIT_REV_HASH);
                    res.setHeader('ETag', tag);
                    res.setHeader('Cache-Control', 'no-cache');

                    var ifNoneMatch = req.get('if-none-match');
                    if (tag === ifNoneMatch) {
                        res.status(304).end();
                        return;
                    }

                    var ip = req.get('x-real-ip');
                    var rateLimitKey = 'rl-node-' + ip;
                    var rateLimitDuration = 60;
                    var rateLimitRequests = 30;
                    var now = Math.round((new Date()).getTime() / 1000);

                    var contentKey = 'wb_' + tag;
                    var modifiedKey = 'lm_' + tag;

                    memcached.getMulti([contentKey, modifiedKey, rateLimitKey], function (err, data) {
                        var usage = data[rateLimitKey];
                        if (usage) {
                            if (usage['exp'] < now) {
                                usage = {
                                    'exp': now + rateLimitDuration,
                                    'rem': rateLimitRequests
                                }
                                memcached.set(rateLimitKey, usage, expire=rateLimitDuration, function (err) {});
                            } else {
                                if (usage['rem'] > 0) {
                                    usage['rem'] -= 1;
                                    res.setHeader('X-Rate-Limit-Remaining', usage['rem'])
                                    res.setHeader('X-Rate-Limit-Reset', usage['exp'])
                                    memcached.set(rateLimitKey, usage, usage['exp'] - now, function (err) {});
                                } else {
                                    res.status(429).send('Too many requests');
                                }
                            }
                        } else {
                            usage = {
                                'exp': now + rateLimitDuration,
                                'rem': rateLimitRequests
                            }
                            memcached.set(rateLimitKey, usage, expire=rateLimitDuration, function (err) {});
                        }

                        var content = data[contentKey];
                        var lastModified = data[modifiedKey];
                        var ifModifiedSince= req.get('if-modified-since');
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
                            var content = ReactDOMServer.renderToStaticMarkup(React.createElement(MainComponent, {
                                data: routeObj.data,
                                path: routeObj.path,
                                query: routeObj.query,
                                component: routeObj.component,
                            }));
                            var head = Helmet.rewind();
                            var page = compiledTemplate({
                                title: head.title.toString(),
                                meta: head.meta.toString(),
                                link: head.link.toString(),
                                apidata: S(JSON.stringify(routeObj.data)).escapeHTML().toString(),
                                content: content
                            });
                            memcached.set(contentKey, page, TEN_DAYS_IN_SECS, function (err) {});
                            var timestamp = moment.utc().format(TIMESTAMP_FORMAT);
                            res.setHeader('Last-Modified', timestamp);
                            memcached.set(modifiedKey, timestamp, TEN_DAYS_IN_SECS, function (err) {});
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
});

app.use(function(err, req, res, next) {
    if (err) {
        var message;
        var content;
        var status = err.status || 500;
        res.status(status);
        if (err.status === 404) {
            message = 'We can\'t find what you\'re looking for';
            res.send(notFoundCompiled({
                status: status,
                title: message,
                content: message
            }));
        } else {
            console.log(err);
            message = 'We faced an internal error. Try again later.';
            res.send(errorCompiled({
                status: status,
                title: message,
                content: message
            }));
        }
    }
});

var port = process.env.PORT || 8000;
app.listen(port, function () {
    if (production) {
        console.log('Mentions Production Server ' + port);
    } else {
        console.log('Mentions Development Server ' + port);
    }
});
