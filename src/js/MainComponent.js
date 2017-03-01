import React from 'react';

/* components need to be required because they are used indirectly */
import AddMention from './AddMention';
import AddVideo from './AddVideo';
import BlogPage from './BlogPage';
import BlogPostPage from './BlogPostPage';
import BugPage from './BugPage';
import ListCreatePage from './ListCreatePage';
import ListPage from './ListPage';
import ContentPage from './ContentPage';
import ContributePage from './ContributePage';
import cookies from 'browser-cookies';
import CreatePage from './CreatePage';
import DiscussPage from './DiscussPage';
import EditPage from './EditPage';
import Feedback from './Feedback';
import FeedbackPage from './FeedbackPage';
import Footer from './Footer';
import HistoryPage from './HistoryPage';
import HomePage from './HomePage';
import isNode from './isNode';
import KitchenSinkPage from './KitchenSinkPage';
import LoginPage from './LoginPage';
import MaintenancePage from './MaintenancePage';
import ProfilePage from './ProfilePage';
import QuotesPage from './QuotesPage';
import RecentChangesPage from './RecentChangesPage';
import RecentDiscussionsPage from './RecentDiscussionsPage';
import requests from 'superagent';
import SearchPage from './SearchPage';
import Sidebar from './Sidebar';
import SignupPage from './SignupPage';
import store from 'store';
import TagPage from './TagPage';
import ThingPage from './ThingPage';
import VideoPage from './VideoPage';
import autoBind from 'react-autobind';

class MainComponent extends React.Component {
    static get defaultProps () {
        return {
            loggedin: false,
            username: '',
            userid: ''
        };
    }
    constructor (props) {
        super(props);
        autoBind(this);
        this.state = {
            sidebar: false
        };
    }
    componentDidMount () {
        const country = store.get('country');
        if (!country) {
            requests
            .get('/api/v1/country')
            .end((err, res) => {
                if (err) {
                    return;
                }
                if (res.body.country) {
                    store.set('country', res.body.country);
                }
            });
        }
        console.log('Hi there !');
    }
    componentWillReceiveProps () {
        this.setState({
            sidebar: false
        });
    }
    onCloseSidebar () {
        this.setState({
            sidebar: false
        });
    }
    onToggleSidebar () {
        this.setState({
            sidebar: !this.state.sidebar
        });
    }
    render () {
        const Component = require(`./${this.props.component}`).default;
        let session;
        let username;
        let userid;
        let loggedin;
        loggedin = Boolean(session);
        return (
            <div className='main-component'>
                <div className='main-content'>
                    <Sidebar
                        showing={this.state.sidebar}
                        onToggleSidebar={this.onCloseSidebar}
                        loggedin={this.props.loggedin}
                        username={this.props.username}
                        userid={this.props.userid}
                    />
                    <Component
                        data={this.props.data}
                        path={this.props.path}
                        query={this.props.query}
                        loggedin={this.props.loggedin}
                        username={this.props.username}
                        userid={this.props.userid}
                        toggleSidebar={this.onToggleSidebar}
                        />
                </div>
                <div className='footer-feedback'>
                    <div className='row align-right'>
                        <div className='small-12 large-6 columns'>
                            <Feedback/>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

MainComponent.propTypes = {
    query: React.PropTypes.object,
    path (props, propName, componentName) {
        if (props[propName][0] === '/') {
            return new Error(
                'Invalid prop `' + propName + '` supplied to' +
                ' `' + componentName + '`. Validation failed.'
            );
        }
    }
};

export default MainComponent;
