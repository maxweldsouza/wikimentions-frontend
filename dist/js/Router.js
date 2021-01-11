'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _BlogPage = require('./BlogPage');

var _BlogPage2 = _interopRequireDefault(_BlogPage);

var _BlogPostPage = require('./BlogPostPage');

var _BlogPostPage2 = _interopRequireDefault(_BlogPostPage);

var _BugPage = require('./BugPage');

var _BugPage2 = _interopRequireDefault(_BugPage);

var _ListCreatePage = require('./ListCreatePage');

var _ListCreatePage2 = _interopRequireDefault(_ListCreatePage);

var _ListPage = require('./ListPage');

var _ListPage2 = _interopRequireDefault(_ListPage);

var _ContentPage = require('./ContentPage');

var _ContentPage2 = _interopRequireDefault(_ContentPage);

var _ContributePage = require('./ContributePage');

var _ContributePage2 = _interopRequireDefault(_ContributePage);

var _CreatePage = require('./CreatePage');

var _CreatePage2 = _interopRequireDefault(_CreatePage);

var _DiscussPage = require('./DiscussPage');

var _DiscussPage2 = _interopRequireDefault(_DiscussPage);

var _EditPage = require('./EditPage');

var _EditPage2 = _interopRequireDefault(_EditPage);

var _FeedbackPage = require('./FeedbackPage');

var _FeedbackPage2 = _interopRequireDefault(_FeedbackPage);

var _HistoryPage = require('./HistoryPage');

var _HistoryPage2 = _interopRequireDefault(_HistoryPage);

var _HomePage = require('./HomePage');

var _HomePage2 = _interopRequireDefault(_HomePage);

var _KitchenSinkPage = require('./KitchenSinkPage');

var _KitchenSinkPage2 = _interopRequireDefault(_KitchenSinkPage);

var _LoginPage = require('./LoginPage');

var _LoginPage2 = _interopRequireDefault(_LoginPage);

var _MaintenancePage = require('./MaintenancePage');

var _MaintenancePage2 = _interopRequireDefault(_MaintenancePage);

var _ProfilePage = require('./ProfilePage');

var _ProfilePage2 = _interopRequireDefault(_ProfilePage);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _QuotesPage = require('./QuotesPage');

var _QuotesPage2 = _interopRequireDefault(_QuotesPage);

var _RecentChangesPage = require('./RecentChangesPage');

var _RecentChangesPage2 = _interopRequireDefault(_RecentChangesPage);

var _RecentDiscussionsPage = require('./RecentDiscussionsPage');

var _RecentDiscussionsPage2 = _interopRequireDefault(_RecentDiscussionsPage);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _SearchPage = require('./SearchPage');

var _SearchPage2 = _interopRequireDefault(_SearchPage);

var _SignupPage = require('./SignupPage');

var _SignupPage2 = _interopRequireDefault(_SignupPage);

var _TagPage = require('./TagPage');

var _TagPage2 = _interopRequireDefault(_TagPage);

var _ThingPage = require('./ThingPage');

var _ThingPage2 = _interopRequireDefault(_ThingPage);

var _VideoPage = require('./VideoPage');

var _VideoPage2 = _interopRequireDefault(_VideoPage);

var _nprogress = require('nprogress');

var _nprogress2 = _interopRequireDefault(_nprogress);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateResources = function validateResources(resources) {
    var valid = resources.api.every(function (x) {
        return x.path && x.name;
    });
    if (!valid) {
        throw new Error('Invalid resource');
    }
};

var urlToComponent = function urlToComponent(url) {
    var _url$substr$split = url.substr(1).split('?'),
        _url$substr$split2 = _slicedToArray(_url$substr$split, 2),
        path = _url$substr$split2[0],
        queryS = _url$substr$split2[1];

    var componentName = void 0;
    if (path === '') {
        componentName = _HomePage2.default;
    } else if (/^tags\/([^/]+)$/.test(path)) {
        componentName = _TagPage2.default;
    } else if (/^create$/.test(path)) {
        componentName = _CreatePage2.default;
    } else if (/^login$/.test(path)) {
        componentName = _LoginPage2.default;
    } else if (/^signup$/.test(path)) {
        componentName = _SignupPage2.default;
    } else if (/^lists\/create$/.test(path)) {
        componentName = _ListCreatePage2.default;
    } else if (/^lists\/([0-9]+)\/([^/]+)$/.test(path)) {
        componentName = _ListPage2.default;
    } else if (/^users\/([0-9]+)\/([^/]+)$/.test(path)) {
        componentName = _ProfilePage2.default;
    } else if (/^users\/([0-9]+)\/([^/]+)\/(profile)$/.test(path)) {
        componentName = _ProfilePage2.default;
    } else if (/^history\/([0-9]+)\/([^/]+)$/.test(path)) {
        componentName = _HistoryPage2.default;
    } else if (/^books\/([0-9]+)\/([^/]+)\/(mentionedby)$/.test(path)) {
        componentName = _ThingPage2.default;
    } else if (/^books\/([0-9]+)\/([^/]+)$/.test(path)) {
        componentName = _ThingPage2.default;
    } else if (/^discuss\/([0-9]+)\/([^/]+)$/.test(path)) {
        componentName = _DiscussPage2.default;
    } else if (/^edit\/([0-9]+)\/([^/]+)$/.test(path)) {
        componentName = _EditPage2.default;
    } else if (/^people\/([0-9]+)\/([^/]+)\/(mentioned|mentionedby|books)$/.test(path)) {
        componentName = _ThingPage2.default;
    } else if (/^people\/([0-9]+)\/([^/]+)$/.test(path)) {
        componentName = _ThingPage2.default;
    } else if (/^videos\/([0-9]+)\/([^/]+)\/(mentionedby)$/.test(path)) {
        componentName = _VideoPage2.default;
    } else if (/^videos\/([0-9]+)\/([^/]+)$/.test(path)) {
        componentName = _VideoPage2.default;
    } else if (/^quotes\/([0-9]+)\/([^/]+)$/.test(path)) {
        componentName = _QuotesPage2.default;
    } else if (/^blog$/.test(path)) {
        componentName = _BlogPage2.default;
    } else if (/^blog\/page\/([0-9]+)$/.test(path)) {
        componentName = _BlogPage2.default;
    } else if (/^blog\/(.*)$/.test(path)) {
        componentName = _BlogPostPage2.default;
    } else if (/^contribute$/.test(path)) {
        componentName = _ContributePage2.default;
    } else if (/^recent-changes$/.test(path)) {
        componentName = _RecentChangesPage2.default;
    } else if (/^recent-discussions$/.test(path)) {
        componentName = _RecentDiscussionsPage2.default;
    } else if (/^maintenance\/(.*)\/([0-9]+)\/([0-9]+)$/.test(path)) {
        componentName = _MaintenancePage2.default;
    } else if (/^kitchen-sink$/.test(path)) {
        componentName = _KitchenSinkPage2.default;
    } else if (/^search$/.test(path)) {
        componentName = _SearchPage2.default;
    } else if (/^(about-us|terms-of-use|privacy-policy|guidelines|media-kit)$/.test(path)) {
        componentName = _ContentPage2.default;
    } else if (/^feedback$/.test(path)) {
        componentName = _FeedbackPage2.default;
    } else if (/^bugs$/.test(path)) {
        componentName = _BugPage2.default;
    } else {
        throw {
            status: 404,
            message: 'Count not find what you were looking for'
        };
    }
    return componentName;
};

var clientSide = function () {
    return typeof window !== 'undefined';
}();

var requestPromise = function requestPromise(url) {
    return new Promise(function (resolve, reject) {
        _superagent2.default.get(url).on('progress', function () {
            _nprogress2.default.inc();
        }).end(function (err, res) {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    });
};

var apiCalls = function apiCalls(Component, url) {
    var _url$split = url.split('?'),
        _url$split2 = _slicedToArray(_url$split, 2),
        path = _url$split2[0],
        q = _url$split2[1];

    var query = _queryString2.default.parse(q);
    var resources = Component.resources({
        path: path.substr(1),
        query: query
    });
    validateResources(resources);
    return resources.api;
};

var fetchData = function fetchData(api) {
    var names = api.map(function (x) {
        return x.name;
    });
    var paths = api.map(function (x) {
        // if (clientSide) {
        //     return x.path;
        // }
        return _config2.default.api_endpoint + x.path;
    });
    return new Promise(function (resolve, reject) {
        Promise.all(paths.map(requestPromise)).then(function (values) {
            var apidata = {};
            var etags = [];
            for (var i = 0; i < names.length; i++) {
                apidata[names[i]] = values[i].body;
                etags.push(values[i].headers.etag);
            }
            resolve({ apidata: apidata, etags: etags });
        }).catch(function (err) {
            reject(err);
        });
    });
};

exports.default = {
    urlToComponent: urlToComponent,
    fetchData: fetchData,
    apiCalls: apiCalls
};