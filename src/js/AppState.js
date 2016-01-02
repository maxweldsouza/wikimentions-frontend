var request = require('superagent');
var parallelRequest = require('./parallelRequest');
var _ = require('underscore');
var HomePage = require('./HomePage');
var BookPage = require('./BookPage');
var Login = require('./Login');
var Signup = require('./Signup');

var validateResources = function (resources) {
    _.map(resources.api, function (x) {
        if (!x.path) {
            throw new Error('resource path is not defined');
        }
        if (!x.name) {
            throw new Error('resource name is not defined');
        }
    });
};

var AppState = (function () {
    var url;
    var component;
    return {
        data: {},
        baseUrl: '', // Incorrect configuration can lead to huge problems
        route (x) {
            this.url = x.substr(1);
            this.fetchData();
        },
        firstLoad (x, embeddedData) {
            this.url = x.substr(1);
            this.fetchData(embeddedData);
        },
        dataDidUpdate (callback) {
            this.onUpdate = callback;
        },
        fetchData (embeddedData) {
            this.component = this.urlToComponent(this.url);
            var Component = require('./' + this.component);
            var resources = Component.resources(this);
            var additionalData = resources.data;
            validateResources(resources);
            var names = _.map(resources.api, function (x) {
                return x.name;
            });
            var paths = _.map(resources.api, (x) => {
                return this.baseUrl + x.path;
            });
            if (embeddedData) {
                this.setData(embeddedData, additionalData);
            } else {
                var apidata;
                if (typeof window === 'undefined') {
                    apidata = {};
                } else {
                    apidata = _.clone(this.data);
                    if (resources.shouldDataUpdate === false) {
                        this.setData(apidata, additionalData);
                        return;
                    }
                }
                parallelRequest.get(
                    paths,
                    (err, res) => {
                        if (err) {
                            apidata = {
                                error: 'offline'
                            };
                        } else {
                            for (var i = 0; i < names.length; i++) {
                                apidata[names[i]] = res[i].body;
                            }
                        }
                        this.setData(apidata, additionalData);
                        return;
                    }
                );
            }
        },
        setData: function (apidata, additionalData) {
            var combined = apidata;
            combined = _.extend(combined, additionalData);
            this.data = combined;
            this.onUpdate();
        },
        urlToComponent (x) {
            var textPages = ['help-us', 'about-us', 'contact-us', 'faq', 'why-us', 'terms', 'privacy'];
            var componentName;
            if (x === '') {
                componentName = 'HomePage';
            } else if (x === 'login') {
                componentName = 'Login';
            } else if (x === 'signup') {
                componentName = 'Signup';
            } else if (/^books\/(.*)$/.test(x)) {
                componentName = 'BookPage';
            }
            return componentName;
        },
        setBaseUrl (baseUrl) {
            this.baseUrl = baseUrl;
        }
    };
}());

module.exports = AppState;
