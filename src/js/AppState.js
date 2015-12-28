var request = require('superagent');
var parallelRequest = require('./parallelRequest');
var _ = require('underscore');
var HomePage = require('./HomePage');

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
        fetchData: function (embeddedData) {
            this.component = this.urlToComponent(this.url);
            var Component = require('./' + this.component);
            var resources = Component.resources(this);
            var additionalData = resources.data;
            validateResources(resources);
            var names = _.map(resources.api, function (x) {
                return x.name;
            });
            var paths = _.map(resources.api, function (x) {
                return x.path;
            });
            if (embeddedData) {
                this.setData(embeddedData, additionalData);
            } else {
                parallelRequest.get(
                    paths,
                    (err, res) => {
                        var apidata = _.clone(this.data);
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
            var combined = _.clone(apidata);
            combined = _.extend(combined, additionalData);
            this.data = combined;
            this.onUpdate();
        },
        urlToComponent (x) {
            var textPages = ['help-us', 'about-us', 'contact-us', 'faq', 'why-us', 'terms', 'privacy'];
            var componentName;
            if (x === '') {
                componentName = 'HomePage';
            }
            return componentName;
        }
    };
}());

module.exports = AppState;
