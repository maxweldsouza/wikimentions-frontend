var React = require('react');
var ReactDOMServer = require('react-dom/server');
var Helmet = require('react-helmet');
var path = require('path');
var express = require("express");
var compress = require('compression');
var cookieParser = require('cookie-parser');
var app = express();
var fs = require('fs');
var cheerio = require('cheerio');
var _ = require("underscore");
var str = require('string');
var request = require('superagent');
var moment = require('moment');
var Log = require('log')
  , log = new Log('info', fs.createWriteStream('googlebot.log', {flags: 'a'}));

global.localStorage = require('localStorage');
require('node-jsx').install();

var AppState = require('./src/js/AppState');

var production = process.env.NODE_ENV === 'production';
var sourceDir = production ? 'dist': 'src';

function readFullFile (file) {
    try {
        return fs.readFileSync(file, {encoding: 'utf8'});
    } catch (err) {
        throw err;
    }
}

function googleBotLogger (req, res, next) {
    var ua = req.headers['user-agent'];
    if (ua && ua.indexOf('Googlebot') >= 0) {
        var path = req.originalUrl;
        var timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
        request
            .post('http://localhost:8001/api/v2/googlebot')
            .type('form')
            .send({ path: req.originalUrl, ua: ua, timestamp: timestamp })
            .end(function(err, res){
            });
    }
    next();
}

app.use(compress());
app.use(cookieParser());
app.use(googleBotLogger);
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
app.use('/assets', express.static(path.join(__dirname, sourceDir, 'assets'), eightdays));
app.use('/js', express.static(path.join(__dirname, sourceDir, 'js'), eightdays));
app.use('/css', express.static(path.join(__dirname, sourceDir, 'css'), eightdays));
app.use('/minified', express.static(path.join(__dirname, sourceDir, 'minified'), eightdays));

// for uptime robot
app.head('/', function (req, res) {
    res.end();
});

var indexHtml = readFullFile(path.join(__dirname, sourceDir, 'index.html'));
var MainComponent = require(path.join(__dirname, sourceDir, 'js', 'MainComponent'));

app.get(/^(.+)$/, function(req, res, next) {
    /* Server specific isomorphic code */
    try {
        var $ = cheerio.load(indexHtml);

        AppState.dataDidUpdate(() => {
            try {
                var content = ReactDOMServer.renderToString(React.createElement(MainComponent, {
                    data: AppState.data,
                    path: AppState.url,
                    component: AppState.component,
                }))
                $('#page-container').html(content);
                $('#api-data').html(JSON.stringify(AppState.data));

                var head = Helmet.rewind();
                // var canonical = routeObj.canonical ? routeObj.canonical : req.originalUrl;
                // canonical = 'https://comparnion.com' + canonical;
                // $('link[rel=canonical]').attr('href', canonical);
                $('title').replaceWith(head.title.toString());
                $('meta[name=browser-tags]').replaceWith(head.meta.toString());
                res.send($.html());
            } catch (err) {
                return next(err);
            }
        });
        AppState.route(req.originalUrl);
    } catch (err) {
        if (err) {
            return next(err);
        }
    }
});

app.use(function(err, req, res, next) {
    if (err) {
        var message;
        var status = err.status || 500;
        if (err.status === 404) {
            message = 'Not found';
        } else {
            message = 'Internal Error';
        }
        res.status(status);
        if (production) {
            res.send({
                message: message,
                status: status
            });
        } else {
            next(err);
        }
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
