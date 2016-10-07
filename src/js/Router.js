var _ = require('underscore');
var AddMention = require('./AddMention');
var AddVideo = require('./AddVideo');
var BlogPage = require('./BlogPage');
var BlogPostPage = require('./BlogPostPage');
var BugPage = require('./BugPage');
var CollectionCreatePage = require('./CollectionCreatePage');
var CollectionPage = require('./CollectionPage');
var ContentPage = require('./ContentPage');
var ContributePage = require('./ContributePage');
var CreatePage = require('./CreatePage');
var DiscussPage = require('./DiscussPage');
var EditPage = require('./EditPage');
var FeedbackPage = require('./FeedbackPage');
var HistoryPage = require('./HistoryPage');
var HomePage = require('./HomePage');
var isNode = require('./isNode');
var KitchenSinkPage = require('./KitchenSinkPage');
var LoginPage = require('./LoginPage');
var MaintenancePage = require('./MaintenancePage');
var moment = require('moment');
var parallelRequest = require('./parallelRequest');
var ProfilePage = require('./ProfilePage');
var queryString = require('query-string');
var QuotesPage = require('./QuotesPage');
var RecentChangesPage = require('./RecentChangesPage');
var RecentDiscussionsPage = require('./RecentDiscussionsPage');
var request = require('superagent');
var SearchPage = require('./SearchPage');
var SignupPage = require('./SignupPage');
var Snackbar = require('./Snackbar');
var Spinner = require('./Spinner');
var TagPage = require('./TagPage');
var ThingPage = require('./ThingPage');
var VideoPage = require('./VideoPage');

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
    } else if (/^tags\/([^/]+)$/.test(x)) {
        componentName = 'TagPage';
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
    } else if (/^collections\/create$/.test(x)) {
        componentName = 'CollectionCreatePage';
        routeObj.maxAge = 0;
    } else if (/^collections\/([0-9]+)\/([^/]+)$/.test(x)) {
        componentName = 'CollectionPage';
        routeObj.maxAge = 0;
    } else if (/^users\/([0-9]+)\/([^/]+)$/.test(x)) {
        componentName = 'ProfilePage';
        routeObj.maxAge = 0;
    } else if (/^users\/([0-9]+)\/([^/]+)\/(profile)$/.test(x)) {
        componentName = 'ProfilePage';
        routeObj.maxAge = 0;
    } else if (/^history\/([0-9]+)\/([^/]+)$/.test(x)) {
        componentName = 'HistoryPage';
        routeObj.maxAge = 0;
    } else if (/^books\/([0-9]+)\/([^/]+)\/(mentionedby)$/.test(x)) {
        componentName = 'ThingPage';
        routeObj.maxAge = 0;
    } else if (/^books\/([0-9]+)\/([^/]+)$/.test(x)) {
        componentName = 'ThingPage';
        routeObj.maxAge = 0;
    } else if (/^discuss\/([0-9]+)\/([^/]+)$/.test(x)) {
        componentName = 'DiscussPage';
        routeObj.maxAge = 0;
    } else if (/^edit\/([0-9]+)\/([^/]+)$/.test(x)) {
        componentName = 'EditPage';
        routeObj.maxAge = 0;
    } else if (/^people\/([0-9]+)\/([^/]+)\/(mentioned|mentionedby|books)$/.test(x)) {
        componentName = 'ThingPage';
        routeObj.maxAge = 0;
    } else if (/^people\/([0-9]+)\/([^/]+)$/.test(x)) {
        componentName = 'ThingPage';
        routeObj.maxAge = 0;
    } else if (/^videos\/([0-9]+)\/([^/]+)\/(mentionedby)$/.test(x)) {
        componentName = 'VideoPage';
        routeObj.maxAge = 0;
    } else if (/^videos\/([0-9]+)\/([^/]+)$/.test(x)) {
        componentName = 'VideoPage';
        routeObj.maxAge = 0;
    } else if (/^quotes\/([0-9]+)\/([^/]+)$/.test(x)) {
        componentName = 'QuotesPage';
        routeObj.maxAge = 0;
    } else if (/^blog$/.test(x)) {
        componentName = 'BlogPage';
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
    } else if (/^kitchen-sink$/.test(x)) {
        componentName = 'KitchenSinkPage';
        routeObj.maxAge = 0;
    } else if (/^search$/.test(x)) {
        componentName = 'SearchPage';
        routeObj.maxAge = 0;
    } else if (/^(about-us|terms-of-use|privacy-policy|guidelines|media-kit)$/.test(x)) {
        componentName = 'ContentPage';
        routeObj.maxAge = 0;
    } else if (/^feedback$/.test(x)) {
        componentName = 'FeedbackPage';
        routeObj.maxAge = 0;
    } else if (/^bugs$/.test(x)) {
        componentName = 'BugPage';
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
    parallelRequest.get(
        paths,
        (err, res) => {
            if (err) {
                routeObj.error = {
                    status: err.status,
                    message: err.message
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

var Router = {
    baseUrl: '',
    data: {},
    route (routeObj) {
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
        routeObj.onUpdate(routeObj);
    },
    setBaseUrl (url) {
        this.baseUrl = url;
    }
};

module.exports = Router;
