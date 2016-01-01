var React = require('react');
var ReactDOM = require('react-dom');
var cookies = require('browser-cookies');
var _ = require('underscore');
var $ = require('jquery-easing');
var str = require('string');
var MainComponent = require('./MainComponent');
var AppState = require('./AppState.js');

/*
in console type Perf.printWasted();
var Perf = require('react-addons-perf');
window.Perf = Perf;
Perf.start();
*/
/* client specific isomorphic code */

if (typeof window === 'undefined') {
    throw Error('This module is designed to be used in a browser only');
}

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

window.Mentions = {
    route: function (url) {
        if (str(url).endsWith('/')) {
            url = url.substring(0, url.length - 1);
        }
        AppState.dataDidUpdate(() => {
            ReactDOM.render(<MainComponent data={AppState.data} path={AppState.url} component={AppState.component}/>, document.getElementById('page-container'));
            if (window.location.pathname[0] !== url[0]) {
                window.scrollTo(0, 0);
            }
            ga('send', 'pageview');
            stopLoading();
        });
        AppState.route(url);
        return;
    },
    firstLoad: function (url) {
        var data;
        try {
            data = JSON.parse($('#api-data').text());
        } catch (e) {
            Mentions.route(url);
        }
        AppState.dataDidUpdate(() => {
            ReactDOM.render(<MainComponent data={AppState.data} path={AppState.url} component={AppState.component}/>, document.getElementById('page-container'));
            ga('send', 'pageview');
            stopLoading();
        });
        AppState.firstLoad(url, data);
        return;
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

$(document).on('click', 'a', function (e) {
    var url = $(this).attr('href');
    var disabled = $(this).data('disabled');
    if (typeof url === 'undefined' || disabled) {
        e.preventDefault();
        return;
    } else if (LinkChecker.samePage(url)) {
        e.preventDefault();
    } else if (!LinkChecker.isExternal(url) && $(this).attr('target') !== '_blank') {
        startLoading();
        e.preventDefault();
        history.pushState(null, null, url);
        setTimeout(function () {
            Mentions.route(url);
        }, 0);
    }
});

window.addEventListener('popstate', function () {
    Mentions.route(window.location.pathname + window.location.search);
});
