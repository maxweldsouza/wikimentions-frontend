var request = require('superagent');
var parallelRequest = require('./parallelRequest');
var _ = require('underscore');

var AddMention = require('./AddMention');
var AddVideo = require('./AddVideo');
var CreatePage = require('./CreatePage');
var DiscussPage = require('./DiscussPage');
var EditMention = require('./EditMention');
var EditPage = require('./EditPage');
var HistoryPage = require('./HistoryPage');
var HomePage = require('./HomePage');
var Login = require('./Login');
var ProfilePage = require('./ProfilePage');
var Signup = require('./Signup');
var Spinner = require('./Spinner');
var ThingPage = require('./ThingPage');
var VideoPage = require('./VideoPage');
var BlogPostPage = require('./BlogPostPage');
var BlogPage = require('./BlogPage');
var BlogPostCreate = require('./BlogPostCreate');
var ContributePage = require('./ContributePage');

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

var getComponent = function (routeObj) {
    var x = routeObj.url;
    var textPages = ['help-us', 'about-us', 'contact-us', 'faq', 'why-us', 'terms', 'privacy'];
    var componentName;
    if (x === '') {
        componentName = 'HomePage';
        routeObj.maxAge = 0;
    } else if (/^create$/.test(x)) {
        componentName = 'CreatePage';
        routeObj.maxAge = 0;
    } else if (/^login$/.test(x)) {
        componentName = 'Login';
        routeObj.maxAge = 0;
    } else if (/^signup$/.test(x)) {
        componentName = 'Signup';
        routeObj.maxAge = 0;
    } else if (/^users\/([0-9]+)\/(.*)$/.test(x)) {
        componentName = 'ProfilePage';
        routeObj.maxAge = 0;
    } else if (/^history\/([0-9]+)\/(.*)$/.test(x)) {
        componentName = 'HistoryPage';
        routeObj.maxAge = 0;
    } else if (/^books\/([0-9]+)\/(.*)$/.test(x)) {
        componentName = 'ThingPage';
        routeObj.maxAge = 0;
    } else if (/^discuss\/([0-9]+)\/(.*)$/.test(x)) {
        componentName = 'DiscussPage';
        routeObj.maxAge = 0;
    } else if (/^edit\/([0-9]+)\/(.*)$/.test(x)) {
        componentName = 'EditPage';
        routeObj.maxAge = 0;
    } else if (/^pages\/([0-9]+)\/(.*)$/.test(x)) {
        componentName = 'ThingPage';
        routeObj.maxAge = 0;
    } else if (/^videos\/([0-9]+)\/(.*)$/.test(x)) {
        componentName = 'VideoPage';
        routeObj.maxAge = 0;
    } else if (/^mentions\/([0-9]+)\/edit$/.test(x)) {
        componentName = 'EditMention';
        routeObj.maxAge = 0;
    } else if (/^blog$/.test(x)) {
        componentName = 'BlogPage';
        routeObj.maxAge = 0;
    } else if (/^blog\/newpost$/.test(x)) {
        componentName = 'BlogPostCreate';
        routeObj.maxAge = 0;
    } else if (/^blog\/page\/([0-9]+)$/.test(x)) {
        componentName = 'BlogPage';
        routeObj.maxAge = 0;
    } else if (/^blog\/(.*)$/.test(x)) {
        componentName = 'BlogPostPage';
        routeObj.maxAge = 0;
    } else if (/^contribute$/.test(x)) {
        componentName = 'ContributePage';
        routeObj.maxAge = 0;
    } else {
        throw { status: 404, message: 'Count not find what you were looking for'};
    }
    routeObj.component = componentName;
    return routeObj;
};

var clientSide = function () {
    return typeof window !== 'undefined';
}();

var getResources = function (routeObj, beforeUpdate) {
    var Component = require('./' + routeObj.component);
    var resources = Component.resources(routeObj);
    validateResources(resources);
    var names = _.map(resources.api, function (x) {
        return x.name;
    });
    var paths = _.map(resources.api, (x) => {
        return routeObj.baseUrl + x.path;
    });

    var apidata = {};
    if (resources.shouldDataUpdate === false) {
        beforeUpdate(routeObj);
        return routeObj;
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
            routeObj.data = apidata;
            beforeUpdate(routeObj);
            return;
        }
    );
    return routeObj;
};

var ClientDataStore = {};

var Router = {
    baseUrl: '',
    data: {},
    route (routeObj) {
        if (clientSide) {
            routeObj.data = ClientDataStore;
        }
        routeObj.baseUrl = this.baseUrl;
        routeObj.url = routeObj.url.substr(1);
        routeObj = getComponent(routeObj);
        if (!_.isEmpty(routeObj.embeddedData)) {
            routeObj.data = routeObj.embeddedData;
            this.beforeUpdate(routeObj);
        } else {
            routeObj = getResources(routeObj, this.beforeUpdate);
        }
    },
    beforeUpdate (routeObj) {
        if (clientSide) {
            ClientDataStore = routeObj.data;
        }
        routeObj.onUpdate(routeObj);
    },
    setBaseUrl (url) {
        this.baseUrl = url;
    }
};

module.exports = Router;
