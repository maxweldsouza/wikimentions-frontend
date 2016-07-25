var consolePolyfill = require('console-polyfill');
var React = require('react');
var ReactDOM = require('react-dom');
var cookies = require('browser-cookies');
var _ = require('underscore');
var $ = require('jquery');
var S = require('string');
var MainComponent = require('./MainComponent');
var Router = require('./Router.js');
var requests = require('superagent');
var Snackbar = require('./Snackbar');
require('velocity-animate');
require('velocity-animate/velocity.ui');

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

var startLoading = function () {
    $('.spinner').removeClass('spinner-hidden');
};
var stopLoading = function () {
    $('.spinner').addClass('spinner-hidden');
};

function getTokenIfRequired () {
    if (!cookies.get('_xsrf')) {
        requests.get('/api/v1/token').end();
    }
}

window.Mentions = {
    route: function (url) {
        if (S(url).endsWith('/')) {
            url = url.substring(0, url.length - 1);
        }
        var routeObj = {
            url: url,
            onUpdate: (robj) => {
                ReactDOM.render(<MainComponent data={robj.data} path={robj.path} component={robj.component} query={robj.query}/>, document.getElementById('page-container'));
                stopLoading();
            }
        };
        Router.route(routeObj);
        return;
    },
    firstLoad: function (url) {
        var data;
        try {
            getTokenIfRequired();
            data = JSON.parse(S($('#api-data').text()).unescapeHTML().toString());
        } catch (e) {
            Mentions.route(url);
        }
        var routeObj = {
            url: url,
            embeddedData: data,
            onUpdate: (robj) => {
                // Dont need to send ga pagview on first load
                ReactDOM.render(<MainComponent data={robj.data} path={robj.path} component={robj.component} query={robj.query}/>, document.getElementById('page-container'));
                stopLoading();
            }
        };
        Router.route(routeObj);
        return;
    },
    logout () {
        requests
        .post('/api/v1/logout')
        .type('form')
        .send({
            _xsrf: cookies.get('_xsrf')
        })
        .end((err, res) => {
            if (err && err.status) {
                Snackbar({message: 'Logout failed'});
            } else {
                Snackbar({message: 'Logged out'});
                var path = window.location.pathname + window.location.search;
                history.pushState(null, null, path);
                Mentions.route(path);
            }
        });
    }
};

Mentions.firstLoad(window.location.pathname + window.location.search);

var LinkChecker = {
    'isExternal': function (href, baseurl) {
        // href is the href attribute from any link
        // checks whether the given href is external to
        // the base url which by default is taken from
        // the browser
        baseurl = baseurl || window.location.href;

        var domain = function (url) {
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
    'samePage': function (href, baseurl) {
        // href is the href attribute from any link
        // checks whether the given href is a hash
        // url to the same page
        baseurl = baseurl || window.location.href;

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

$(document).keydown(function (e) {
    if (e.which === '17') {
        controlPressed = true;
    }
});

$(document).keyup(function () {
    controlPressed = false;
});

$(document).on('click', 'a', function (e) {
    var url = $(this).attr('href');
    var disabled = $(this).data('disabled');
    if (typeof url === 'undefined' || disabled) {
        e.preventDefault();
        return;
    } else if (LinkChecker.samePage(url)) {
        e.preventDefault();
        // smooth scroll
        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top - 80
        }, 200, 'easeOutQuart');
    } else if (!LinkChecker.isExternal(url)
            && $(this).attr('target') !== '_blank'
            && !controlPressed) {
        startLoading();
        var parseUrl = document.createElement('a');
        parseUrl.href = window.location.origin + url;
        if (window.location.pathname !== parseUrl.pathname) {
            window.scrollTo(0, 0);
            ga('send', 'pageview');
        }
        e.preventDefault();
        setTimeout(function () {
            try {
                Mentions.route(url);
                history.pushState(null, null, url);
            } catch (err) {
                if (err.status === 404) {
                    Snackbar({message: '404: Not found'});
                } else {
                    Snackbar({message: 'Something went wrong'});
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
    requests
    .post('/api/v1/bugs')
    .type('form')
    .send({
        message: e.error.stack,
        useragent: window.navigator.userAgent,
        platform: window.navigator.platform,
        url: window.location.pathname + window.location.search,
        _xsrf: cookies.get('_xsrf')
    })
    .end((err, res) => {
    });
});
