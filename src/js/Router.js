import _ from 'underscore';
import AddMention from './AddMention';
import AddVideo from './AddVideo';
import BlogPage from './BlogPage';
import BlogPostPage from './BlogPostPage';
import BugPage from './BugPage';
import ListCreatePage from './ListCreatePage';
import ListPage from './ListPage';
import ContentPage from './ContentPage';
import ContributePage from './ContributePage';
import CreatePage from './CreatePage';
import DiscussPage from './DiscussPage';
import EditPage from './EditPage';
import FeedbackPage from './FeedbackPage';
import HistoryPage from './HistoryPage';
import HomePage from './HomePage';
import isNode from './isNode';
import KitchenSinkPage from './KitchenSinkPage';
import LoginPage from './LoginPage';
import MaintenancePage from './MaintenancePage';
import moment from 'moment';
import parallelRequest from './parallelRequest';
import ProfilePage from './ProfilePage';
import queryString from 'query-string';
import QuotesPage from './QuotesPage';
import RecentChangesPage from './RecentChangesPage';
import RecentDiscussionsPage from './RecentDiscussionsPage';
import request from 'superagent';
import SearchPage from './SearchPage';
import SignupPage from './SignupPage';
import Snackbar from './Snackbar';
import Spinner from './Spinner';
import TagPage from './TagPage';
import ThingPage from './ThingPage';
import VideoPage from './VideoPage';

const validateResources = resources => {
    _.map(resources.api, x => {
        if (!x.path) {
            throw new Error('resource path is not defined');
        }
        if (!x.name) {
            throw new Error('resource name is not defined');
        }
    });
};

const getComponent = routeObj => {
    const parts = routeObj.url.split('?');
    const x = parts[0];
    const query = parts[1];
    let componentName;
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
    } else if (/^lists\/create$/.test(x)) {
        componentName = 'ListCreatePage';
        routeObj.maxAge = 0;
    } else if (/^lists\/([0-9]+)\/([^/]+)$/.test(x)) {
        componentName = 'ListPage';
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

const clientSide = (() => typeof window !== 'undefined')();

const getResources = (routeObj, beforeUpdate) => {
    const Component = require(`./${routeObj.component}`);
    console.log(Component.default.resources);
    const resources = Component.default.resources(routeObj);
    validateResources(resources);
    const names = _.map(resources.api, x => x.name);
    const paths = _.map(resources.api, (x) => {
        return routeObj.baseUrl + x.path;
    });

    const apidata = {};
    parallelRequest.get(
        paths,
        (err, res) => {
            if (err) {
                routeObj.error = {
                    status: err.status,
                    message: err.message
                };
            } else {
                const timestamps = [];
                const etags = [];
                for (let i = 0; i < names.length; i++) {
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

const Router = {
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

export default Router;
