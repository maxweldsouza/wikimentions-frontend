var request = require('superagent');
var parallelRequest = require('./parallelRequest');
var _ = require('underscore');
var moment = require('moment');
var Snackbar = require('./Snackbar');

var AddMention = require('./AddMention');
var AddVideo = require('./AddVideo');
var CreatePage = require('./CreatePage');
var DiscussPage = require('./DiscussPage');
var EditMention = require('./EditMention');
var EditPage = require('./EditPage');
var HistoryPage = require('./HistoryPage');
var HomePage = require('./HomePage');
var LoginPage = require('./LoginPage');
var ProfilePage = require('./ProfilePage');
var SignupPage = require('./SignupPage');
var Spinner = require('./Spinner');
var ThingPage = require('./ThingPage');
var VideoPage = require('./VideoPage');
var ImagesPage = require('./ImagesPage');
var BlogPostPage = require('./BlogPostPage');
var BlogPage = require('./BlogPage');
var BlogPostCreate = require('./BlogPostCreate');
var ContributePage = require('./ContributePage');
var RecentChangesPage = require('./RecentChangesPage');
var RecentDiscussionsPage = require('./RecentDiscussionsPage');
var SiteStatsPage = require('./SiteStatsPage');
var SearchPage = require('./SearchPage');
var MaintenancePage = require('./MaintenancePage');
var queryString = require('query-string');
var isNode = require('./isNode');
var ContentPage = require('./ContentPage');

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
    var parts = routeObj.url.split('?');
    var x = parts[0];
    var query = parts[1];
    var componentName;
    routeObj.query = queryString.parse(query);
    routeObj.path = x;
    if (x === '') {
        componentName = 'HomePage';
        routeObj.maxAge = 0;
    } else if (/^create$/.test(x)) {
        componentName = 'CreatePage';
        routeObj.maxAge = 0;
    } else if (/^login$/.test(x)) {
        componentName = 'LoginPage';
        routeObj.maxAge = 0;
    } else if (/^signup$/.test(x)) {
        componentName = 'SignupPage';
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
    } else if (/^people\/([0-9]+)\/(.*)\/(.*)$/.test(x)) {
        componentName = 'ThingPage';
        routeObj.maxAge = 0;
    } else if (/^people\/([0-9]+)\/(.*)$/.test(x)) {
        componentName = 'ThingPage';
        routeObj.maxAge = 0;
    } else if (/^videos\/([0-9]+)\/(.*)\/(.*)$/.test(x)) {
        componentName = 'VideoPage';
        routeObj.maxAge = 0;
    } else if (/^videos\/([0-9]+)\/(.*)$/.test(x)) {
        componentName = 'VideoPage';
        routeObj.maxAge = 0;
    } else if (/^images\/([0-9]+)\/(.*)$/.test(x)) {
        componentName = 'ImagesPage';
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
    } else if (/^recent-changes$/.test(x)) {
        componentName = 'RecentChangesPage';
        routeObj.maxAge = 0;
    } else if (/^recent-discussions$/.test(x)) {
        componentName = 'RecentDiscussionsPage';
        routeObj.maxAge = 0;
    } else if (/^maintenance\/(.*)\/([0-9]+)\/([0-9]+)$/.test(x)) {
        componentName = 'MaintenancePage';
        routeObj.maxAge = 0;
    } else if (/^site-stats$/.test(x)) {
        componentName = 'SiteStatsPage';
        routeObj.maxAge = 0;
    } else if (/^search$/.test(x)) {
        componentName = 'SearchPage';
        routeObj.maxAge = 0;
    } else if (/^terms-of-use$/.test(x)) {
        componentName = 'ContentPage';
        routeObj.maxAge = 0;
    } else {
        if (isNode.isBrowser()) {
            Snackbar({message: 'Count not find what you were looking for'});
        }
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
                var timestamps = [];
                var etags = [];
                for (var i = 0; i < names.length; i++) {
                    apidata[names[i]] = res[i].body;
                    if (res[i].body.last_modified) {
                        timestamps.push(moment(res[i].body.last_modified));
                    }
                    etags.push(res[i].headers.etag);
                }
                routeObj.etags = etags;
                if (timestamps.length === names.length) {
                    routeObj.lastModified = moment.max(timestamps);
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
