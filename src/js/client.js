require('core-js/es6/string');
require('core-js/es6/array');
import styles from '../styles/main.scss';
import $ from 'jquery';
import consolePolyfill from 'console-polyfill';
import cookies from 'browser-cookies';
import MainComponent from './MainComponent';
import queryString from 'query-string';
import React from 'react';
import ReactDOM from 'react-dom';
import requests from 'superagent';
import Router from './Router.js';
import S from 'string';
import snackbar from './snackbar';
import store from 'store';

require('velocity-animate');
require('velocity-animate/velocity.ui');
import NProgress from 'nprogress';
NProgress.configure({ showSpinner: false, minimum: 0.4 });

/*
in console type Perf.printWasted();
var Perf = require('react-addons-perf');
window.Perf = Perf;
Perf.start();
*/
/* client specific isomorphic code */

if (typeof window.ga === 'undefined') {
    window.ga = function() {
        if (arguments.length > 1 && typeof arguments[1] !== 'string') {
            console.log(JSON.stringify(arguments[1])); // eslint-disable-line no-console
        } else {
            console.log(arguments); // eslint-disable-line no-console
        }
    };
}

const startLoading = () => {
    NProgress.start();
};
const stopLoading = () => {
    NProgress.done();
};

const getTokenIfRequired = () => {
    if (!cookies.get('_xsrf')) {
        requests.get('/api/v1/token').end();
    }
};

window.Mentions = {
    route(url) {
        if (S(url).endsWith('/')) {
            url = url.substring(0, url.length - 1);
        }

        const componentName = Router.urlToComponentName(url);
        const api = Router.apiCalls(componentName, url);
        Router.fetchData(api)
            .then(({ apidata, etags }) => {
                NProgress.inc();
                ReactDOM.render(
                    <MainComponent
                        loggedin={Boolean(store.get('username'))}
                        username={store.get('username')}
                        userid={store.get('id')}
                        data={apidata}
                        path={url.substr(1).split('?')[0]}
                        component={componentName}
                        query={queryString.parse(url.split('?')[1])}
                    />,
                    document.getElementById('page-container')
                );
                window.scrollTo(0, 0);
                ga('send', 'pageview', location.pathname);
                stopLoading();
            })
            .catch(err => {
                snackbar({ message: err.message });
                stopLoading();
            });
    },
    firstLoad(url) {
        try {
            const componentName = Router.urlToComponentName(url);
            getTokenIfRequired();
            const data = JSON.parse(
                S($('#api-data').text()).unescapeHTML().toString()
            );
            ReactDOM.render(
                <MainComponent
                    loggedin={Boolean(store.get('username'))}
                    username={store.get('username')}
                    userid={store.get('id')}
                    data={data}
                    path={url.substr(1).split('?')[0]}
                    component={componentName}
                    query={queryString.parse(url.split('?')[1])}
                />,
                document.getElementById('page-container')
            );
            stopLoading();
        } catch (e) {
            snackbar({ message: e.message });
            Mentions.route(url);
        }
    },
    logout() {
        requests
            .post('/api/v1/logout')
            .type('form')
            .send({
                _xsrf: cookies.get('_xsrf')
            })
            .end(err => {
                if (err && err.status) {
                    snackbar({ message: 'Logout failed' });
                } else {
                    snackbar({ message: 'Logged out' });
                    store.remove('username');
                    store.remove('level');
                    store.remove('id');
                    const path = window.location.pathname +
                        window.location.search;
                    history.pushState(null, null, path);
                    Mentions.route(path);
                }
            });
    }
};

Mentions.firstLoad(window.location.pathname + window.location.search);

const LinkChecker = {
    isExternal(href, baseurl = window.location.href) {
        const domain = url =>
            url.replace('http://', '').replace('https://', '').split('/')[0];
        if (href.indexOf('mailto') === 0) {
            return true;
        }
        if (href.indexOf('http') === 0) {
            return domain(baseurl) !== domain(href);
        }
        return false;
    },
    samePage(href, baseurl = window.location.href) {
        if (href.startsWith('http')) {
            const currentWithoutHash = baseurl.split('#')[0];
            const urlWithoutHash = href.split('#')[0];
            return currentWithoutHash === urlWithoutHash;
        }
        if (href.startsWith('#')) {
            return true;
        }
        return false;
    }
};

let controlPressed = false;

$(document).keydown(e => {
    if (e.which === '17') {
        controlPressed = true;
    }
});

$(document).keyup(() => {
    controlPressed = false;
});

$(document).on('click', 'a', function(e) {
    const url = $(this).attr('href');
    const disabled = $(this).data('disabled');
    const noxhr = $(this).data('noxhr');
    if (typeof url === 'undefined' || disabled) {
        e.preventDefault();
        return;
    } else if (LinkChecker.samePage(url)) {
        e.preventDefault();
        // smooth scroll
        $('html, body').animate(
            {
                scrollTop: $($.attr(this, 'href')).offset().top - 80
            },
            200,
            'easeOutQuart'
        );
    } else if (
        !LinkChecker.isExternal(url) &&
        $(this).attr('target') !== '_blank' &&
        !controlPressed &&
        !noxhr
    ) {
        startLoading();
        e.preventDefault();
        setTimeout(
            () => {
                try {
                    Mentions.route(url);
                    history.pushState(null, null, url);
                } catch (err) {
                    if (err.status === 404) {
                        snackbar({ message: '404: Not found' });
                    } else {
                        snackbar({ message: 'Something went wrong' });
                    }
                    stopLoading();
                }
            },
            0
        );
    }
});

window.addEventListener('popstate', () => {
    Mentions.route(window.location.pathname + window.location.search);
});

window.addEventListener('error', e => {
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
        .end((err, res) => {});
});
