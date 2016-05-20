var React = require('react');
var ReactDOMServer = require('react-dom/server');
var Helmet = require('react-helmet');
var path = require('path');
var express = require("express");
var compress = require('compression');
var cookieParser = require('cookie-parser');
var app = express();
var fs = require('fs');
var _ = require("underscore");
var str = require('string');
var request = require('superagent');
var moment = require('moment');
var Log = require('log')
  , log = new Log('info', fs.createWriteStream('googlebot.log', {flags: 'a'}));

global.localStorage = require('localStorage');
var production = process.env.NODE_ENV === 'production';

var plugins = [
    // react
    'syntax-flow',
    'syntax-jsx',
    'transform-flow-strip-types',
    'transform-react-jsx',
    'transform-react-display-name',
    'transform-react-constant-elements'
];
if (production) {
    plugins.push("transform-react-inline-elements");
}
require("babel-register")({
    plugins: plugins,
    presets: ["es2015"]
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

app.use(compress());
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
app.use('/js-bundle', express.static(path.join(__dirname, sourceDir, 'js-bundle'), eightdays));
app.use('/assets', express.static(path.join(__dirname, sourceDir, 'assets'), farfuture));
app.use('/js', express.static(path.join(__dirname, sourceDir, 'js'), farfuture));
app.use('/css', express.static(path.join(__dirname, sourceDir, 'css'), farfuture));
app.use('/minified', express.static(path.join(__dirname, sourceDir, 'minified'), farfuture));

// for uptime robot
app.head('/', function (req, res) {
    res.end();
});

var indexHtml = readFullFile(path.join(__dirname, sourceDir, 'index.html'));
var MainComponent = require(path.join(__dirname, sourceDir, 'js', 'MainComponent'));
var compiledTemplate = _.template(indexHtml);

var isNotModified = function (ifModifiedSince, lastModified) {
    if (ifModifiedSince && lastModified) {
        var ims = new Date(ifModifiedSince);
        var lm = moment(new Date(lastModified));
        if (lm.isSameOrAfter(ims)) {
            return true;
        }
    }
    return false;
}

app.get(/^(.+)$/, function(req, res, next) {
    /* Server specific isomorphic code */
    try {
        var routeObj = {
            url: req.originalUrl,
            onUpdate: (routeObj) => {
                try {
                    var headerFormat = 'ddd, MMM DD YYYY HH:mm:ss [GMT]';
                    if (routeObj.lastModified) {
                        res.set('Last-Modified', routeObj.lastModified.utc().format(headerFormat));
                    }
                    if (isNotModified(req.get('if-modified-since'), routeObj.lastModified)) {
                        res.status(304).end();
                    } else {
                        var content = ReactDOMServer.renderToStaticMarkup(React.createElement(MainComponent, {
                            data: routeObj.data,
                            path: routeObj.path,
                            query: routeObj.query,
                            component: routeObj.component,
                        }));
                        var head = Helmet.rewind();
                        if (routeObj.maxAge > 0) {
                            res.set('Cache-Control', 'public, max-age=' + routeObj.maxAge);
                        } else {
                            res.set('Cache-Control', 'no-cache');
                        }
                        res.send(compiledTemplate({
                            title: head.title.toString(),
                            meta: head.meta.toString(),
                            link: head.link.toString(),
                            apidata: JSON.stringify(routeObj.data),
                            content: content
                        }));
                    }
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
        console.log(err);
        var message;
        var content;
        var status = err.status || 500;
        if (err.status === 404) {
            message = 'Not found';
        } else {
            message = 'Internal Error';
        }
        res.status(status);
        res.send(compiledTemplate({
            title: message,
            meta: '',
            link: '',
            apidata: {},
            content: message
        }));
    }
});

var port = process.env.PORT || 8000;
app.listen(port, function() {
    if (production) {
        console.log('Mentions Production Server ' + port);
    } else {
        console.log('Mentions Development Server ' + port);
    }
});
