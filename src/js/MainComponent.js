/* The main component is used both on the server and the client
* side. It takes only one prop 'path'. */

var React = require('react');

/* components need to be required because they are used indirectly */
var AddMention = require('./AddMention');
var AddVideo = require('./AddVideo');
var BlogPage = require('./BlogPage');
var BlogPostPage = require('./BlogPostPage');
var ContentPage = require('./ContentPage');
var ContributePage = require('./ContributePage');
var cookies = require('browser-cookies');
var CreatePage = require('./CreatePage');
var DiscussPage = require('./DiscussPage');
var EditPage = require('./EditPage');
var FeedbackPage = require('./FeedbackPage');
var Footer = require('./Footer');
var HistoryPage = require('./HistoryPage');
var HomePage = require('./HomePage');
var isNode = require('./isNode');
var LoginPage = require('./LoginPage');
var MaintenancePage = require('./MaintenancePage');
var ProfilePage = require('./ProfilePage');
var RecentChangesPage = require('./RecentChangesPage');
var RecentDiscussionsPage = require('./RecentDiscussionsPage');
var requests = require('superagent');
var SearchPage = require('./SearchPage');
var Sidebar = require('./Sidebar');
var SignupPage = require('./SignupPage');
var SiteStatsPage = require('./SiteStatsPage');
var store = require('store');
var ThingPage = require('./ThingPage');
var VideoPage = require('./VideoPage');

var MainComponent = React.createClass({
    propTypes: {
        component: React.PropTypes.string.isRequired,
        data: React.PropTypes.object.isRequired
    },
    getInitialState () {
        return {
            sidebar: false
        };
    },
    componentDidMount () {
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
    },
    componentWillReceiveProps (nextProps) {
        this.setState({
            sidebar: false
        });
    },
    onCloseSidebar: function () {
        this.setState({
            sidebar: false
        });
    },
    onToggleSidebar: function () {
        this.setState({
            sidebar: !this.state.sidebar
        });
    },
    render () {
        var Component = require('./' + this.props.component);
        var session, username, userid, loggedin;
        if (isNode.isBrowser()) {
            session = cookies.get('mentions');
            username = cookies.get('username');
            userid = cookies.get('userid');
        }
        loggedin = session ? true : false;
        return (
            <div className='main-component'>
                <div className='main-content'>
                    <Sidebar
                        showing={this.state.sidebar}
                        onToggleSidebar={this.onCloseSidebar}
                        loggedin={loggedin}
                        username={username}
                        userid={userid}
                    />
                    <Component
                        data={this.props.data}
                        path={this.props.path}
                        query={this.props.query}
                        loggedin={loggedin}
                        username={username}
                        userid={userid}
                        toggleSidebar={this.onToggleSidebar}
                        />
                    </div>
                <Footer />
            </div>
        );
    }
});

module.exports = MainComponent;
