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
import ProfilePage from './ProfilePage';
import queryString from 'query-string';
import QuotesPage from './QuotesPage';
import RecentChangesPage from './RecentChangesPage';
import RecentDiscussionsPage from './RecentDiscussionsPage';
import request from 'superagent';
import SearchPage from './SearchPage';
import SignupPage from './SignupPage';
import snackbar from './snackbar';
import Spinner from './Spinner';
import TagPage from './TagPage';
import ThingPage from './ThingPage';
import VideoPage from './VideoPage';
import NProgress from 'nprogress';
import config from './config';

const validateResources = resources => {
    const valid = resources.api.every(x => {
        return x.path && x.name;
    });
    if (!valid) {
        throw new Error('Invalid resource');
    }
};

const urlToComponentName = url => {
    const [path, queryS] = url.substr(1).split('?');

    let componentName;
    if (path === '') {
        componentName = 'HomePage';
    } else if (/^tags\/([^/]+)$/.test(path)) {
        componentName = 'TagPage';
    } else if (/^create$/.test(path)) {
        componentName = 'CreatePage';
    } else if (/^login$/.test(path)) {
        componentName = 'LoginPage';
    } else if (/^signup$/.test(path)) {
        componentName = 'SignupPage';
    } else if (/^lists\/create$/.test(path)) {
        componentName = 'ListCreatePage';
    } else if (/^lists\/([0-9]+)\/([^/]+)$/.test(path)) {
        componentName = 'ListPage';
    } else if (/^users\/([0-9]+)\/([^/]+)$/.test(path)) {
        componentName = 'ProfilePage';
    } else if (/^users\/([0-9]+)\/([^/]+)\/(profile)$/.test(path)) {
        componentName = 'ProfilePage';
    } else if (/^history\/([0-9]+)\/([^/]+)$/.test(path)) {
        componentName = 'HistoryPage';
    } else if (/^books\/([0-9]+)\/([^/]+)\/(mentionedby)$/.test(path)) {
        componentName = 'ThingPage';
    } else if (/^books\/([0-9]+)\/([^/]+)$/.test(path)) {
        componentName = 'ThingPage';
    } else if (/^discuss\/([0-9]+)\/([^/]+)$/.test(path)) {
        componentName = 'DiscussPage';
    } else if (/^edit\/([0-9]+)\/([^/]+)$/.test(path)) {
        componentName = 'EditPage';
    } else if (
        /^people\/([0-9]+)\/([^/]+)\/(mentioned|mentionedby|books)$/.test(path)
    ) {
        componentName = 'ThingPage';
    } else if (/^people\/([0-9]+)\/([^/]+)$/.test(path)) {
        componentName = 'ThingPage';
    } else if (/^videos\/([0-9]+)\/([^/]+)\/(mentionedby)$/.test(path)) {
        componentName = 'VideoPage';
    } else if (/^videos\/([0-9]+)\/([^/]+)$/.test(path)) {
        componentName = 'VideoPage';
    } else if (/^quotes\/([0-9]+)\/([^/]+)$/.test(path)) {
        componentName = 'QuotesPage';
    } else if (/^blog$/.test(path)) {
        componentName = 'BlogPage';
    } else if (/^blog\/page\/([0-9]+)$/.test(path)) {
        componentName = 'BlogPage';
    } else if (/^blog\/(.*)$/.test(path)) {
        componentName = 'BlogPostPage';
    } else if (/^contribute$/.test(path)) {
        componentName = 'ContributePage';
    } else if (/^recent-changes$/.test(path)) {
        componentName = 'RecentChangesPage';
    } else if (/^recent-discussions$/.test(path)) {
        componentName = 'RecentDiscussionsPage';
    } else if (/^maintenance\/(.*)\/([0-9]+)\/([0-9]+)$/.test(path)) {
        componentName = 'MaintenancePage';
    } else if (/^kitchen-sink$/.test(path)) {
        componentName = 'KitchenSinkPage';
    } else if (/^search$/.test(path)) {
        componentName = 'SearchPage';
    } else if (
        /^(about-us|terms-of-use|privacy-policy|guidelines|media-kit)$/.test(
            path
        )
    ) {
        componentName = 'ContentPage';
    } else if (/^feedback$/.test(path)) {
        componentName = 'FeedbackPage';
    } else if (/^bugs$/.test(path)) {
        componentName = 'BugPage';
    } else {
        throw {
            status: 404,
            message: 'Count not find what you were looking for'
        };
    }
    return componentName;
};

const clientSide = (() => typeof window !== 'undefined')();

const requestPromise = url => {
    return new Promise((resolve, reject) => {
        request
            .get(url)
            .on('progress', () => {
                NProgress.inc();
            })
            .end((err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
    });
};

const apiCalls = (componentName, url) => {
    const Component = require(`./${componentName}`).default;
    const [path, q] = url.split('?');
    const query = queryString.parse(q);
    const resources = Component.resources({
        Component: componentName,
        path: path.substr(1),
        query
    });
    validateResources(resources);
    return resources.api;
};

const fetchData = api => {
    const names = api.map(x => x.name);
    const paths = api.map(x => {
        if (clientSide) {
            return x.path;
        }
        return config.api_endpoint + x.path;
    });
    return new Promise((resolve, reject) => {
        Promise.all(paths.map(requestPromise))
            .then(values => {
                const apidata = {};
                const etags = [];
                for (let i = 0; i < names.length; i++) {
                    apidata[names[i]] = values[i].body;
                    etags.push(values[i].headers.etag);
                }
                resolve({ apidata, etags });
            })
            .catch(function(err) {
                reject(err);
            });
    });
};

export default {
    urlToComponentName,
    fetchData,
    apiCalls
};
