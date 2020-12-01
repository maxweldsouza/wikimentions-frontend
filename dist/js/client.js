'use strict';

var _main = require('../styles/main.scss');

var _main2 = _interopRequireDefault(_main);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _consolePolyfill = require('console-polyfill');

var _consolePolyfill2 = _interopRequireDefault(_consolePolyfill);

var _browserCookies = require('browser-cookies');

var _browserCookies2 = _interopRequireDefault(_browserCookies);

var _MainComponent = require('./MainComponent');

var _MainComponent2 = _interopRequireDefault(_MainComponent);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _Router = require('./Router.js');

var _Router2 = _interopRequireDefault(_Router);

var _string = require('string');

var _string2 = _interopRequireDefault(_string);

var _snackbar = require('./snackbar');

var _snackbar2 = _interopRequireDefault(_snackbar);

var _store = require('store');

var _store2 = _interopRequireDefault(_store);

var _nprogress = require('nprogress');

var _nprogress2 = _interopRequireDefault(_nprogress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('core-js/es6/string');
require('core-js/es6/array');


require('velocity-animate');
require('velocity-animate/velocity.ui');

_nprogress2.default.configure({ showSpinner: false, minimum: 0.4 });

/*
in console type Perf.printWasted();
var Perf = require('react-addons-perf');
window.Perf = Perf;
Perf.start();
*/
/* client specific isomorphic code */

if (typeof window.ga === 'undefined') {
    window.ga = function () {
        if (arguments.length > 1 && typeof arguments[1] !== 'string') {
            console.log(JSON.stringify(arguments[1])); // eslint-disable-line no-console
        } else {
            console.log(arguments); // eslint-disable-line no-console
        }
    };
}

var startLoading = function startLoading() {
    _nprogress2.default.start();
};
var stopLoading = function stopLoading() {
    _nprogress2.default.done();
};

var getTokenIfRequired = function getTokenIfRequired() {
    if (!_browserCookies2.default.get('_xsrf')) {
        _superagent2.default.get('/api/v1/token').end();
    }
};

window.Mentions = {
    route: function route(url) {
        if ((0, _string2.default)(url).endsWith('/')) {
            url = url.substring(0, url.length - 1);
        }

        var component = _Router2.default.urlToComponent(url);
        var api = _Router2.default.apiCalls(component, url);
        _Router2.default.fetchData(api).then(function (_ref) {
            var apidata = _ref.apidata,
                etags = _ref.etags;

            _nprogress2.default.inc();
            _reactDom2.default.render(_react2.default.createElement(_MainComponent2.default, {
                loggedin: Boolean(_store2.default.get('username')),
                username: _store2.default.get('username'),
                userid: _store2.default.get('id'),
                data: apidata,
                path: url.substr(1).split('?')[0],
                component: component,
                query: _queryString2.default.parse(url.split('?')[1])
            }), document.getElementById('page-container'));
            window.scrollTo(0, 0);
            ga('send', 'pageview', location.pathname);
            stopLoading();
        }).catch(function (err) {
            (0, _snackbar2.default)({ message: err.message });
            stopLoading();
        });
    },
    firstLoad: function firstLoad(url) {
        try {
            var component = _Router2.default.urlToComponent(url);
            getTokenIfRequired();
            var data = JSON.parse((0, _string2.default)((0, _jquery2.default)('#api-data').text()).unescapeHTML().toString());
            _reactDom2.default.render(_react2.default.createElement(_MainComponent2.default, {
                loggedin: Boolean(_store2.default.get('username')),
                username: _store2.default.get('username'),
                userid: _store2.default.get('id'),
                data: data,
                path: url.substr(1).split('?')[0],
                component: component,
                query: _queryString2.default.parse(url.split('?')[1])
            }), document.getElementById('page-container'));
            stopLoading();
        } catch (e) {
            (0, _snackbar2.default)({ message: e.message });
            Mentions.route(url);
        }
    },
    logout: function logout() {
        _superagent2.default.post('/api/v1/logout').type('form').send({
            _xsrf: _browserCookies2.default.get('_xsrf')
        }).end(function (err) {
            if (err && err.status) {
                (0, _snackbar2.default)({ message: 'Logout failed' });
            } else {
                (0, _snackbar2.default)({ message: 'Logged out' });
                _store2.default.remove('username');
                _store2.default.remove('level');
                _store2.default.remove('id');
                var path = window.location.pathname + window.location.search;
                history.pushState(null, null, path);
                Mentions.route(path);
            }
        });
    }
};

Mentions.firstLoad(window.location.pathname + window.location.search);

var LinkChecker = {
    isExternal: function isExternal(href) {
        var baseurl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location.href;

        var domain = function domain(url) {
            return url.replace('http://', '').replace('https://', '').split('/')[0];
        };
        if (href.indexOf('mailto') === 0) {
            return true;
        }
        if (href.indexOf('http') === 0) {
            return domain(baseurl) !== domain(href);
        }
        return false;
    },
    samePage: function samePage(href) {
        var baseurl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location.href;

        if (href.startsWith('http')) {
            var currentWithoutHash = baseurl.split('#')[0];
            var urlWithoutHash = href.split('#')[0];
            return currentWithoutHash === urlWithoutHash;
        }
        if (href.startsWith('#')) {
            return true;
        }
        return false;
    }
};

var controlPressed = false;

(0, _jquery2.default)(document).keydown(function (e) {
    if (e.which === '17') {
        controlPressed = true;
    }
});

(0, _jquery2.default)(document).keyup(function () {
    controlPressed = false;
});

(0, _jquery2.default)(document).on('click', 'a', function (e) {
    var url = (0, _jquery2.default)(this).attr('href');
    var disabled = (0, _jquery2.default)(this).data('disabled');
    var noxhr = (0, _jquery2.default)(this).data('noxhr');
    if (typeof url === 'undefined' || disabled) {
        e.preventDefault();
        return;
    } else if (LinkChecker.samePage(url)) {
        e.preventDefault();
        // smooth scroll
        (0, _jquery2.default)('html, body').animate({
            scrollTop: (0, _jquery2.default)(_jquery2.default.attr(this, 'href')).offset().top - 80
        }, 200, 'easeOutQuart');
    } else if (!LinkChecker.isExternal(url) && (0, _jquery2.default)(this).attr('target') !== '_blank' && !controlPressed && !noxhr) {
        startLoading();
        e.preventDefault();
        setTimeout(function () {
            try {
                Mentions.route(url);
                history.pushState(null, null, url);
            } catch (err) {
                if (err.status === 404) {
                    (0, _snackbar2.default)({ message: '404: Not found' });
                } else {
                    (0, _snackbar2.default)({ message: 'Something went wrong' });
                }
                stopLoading();
            }
        }, 0);
    }
});

window.addEventListener('popstate', function () {
    Mentions.route(window.location.pathname + window.location.search);
});

window.addEventListener('error', function (e) {
    _superagent2.default.post('/api/v1/bugs').type('form').send({
        message: e.error.stack,
        useragent: window.navigator.userAgent,
        platform: window.navigator.platform,
        url: window.location.pathname + window.location.search,
        _xsrf: _browserCookies2.default.get('_xsrf')
    }).end(function (err, res) {});
});