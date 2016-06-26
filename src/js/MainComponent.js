/* The main component is used both on the server and the client
* side. It takes only one prop 'path'. */

var React = require('react');

/* components need to be required because they are used indirectly */
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
var ContentPage = require('./ContentPage');

var store = require('store');
var cookies = require('browser-cookies');
var isNode = require('./isNode');
var Sidebar = require('./Sidebar');

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
    componentWillReceiveProps (nextProps) {
        this.setState({
            sidebar: false
        });
    },
    onSidebarOpen (open) {
        this.setState({
            sidebar: true
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
            <div>
                <Sidebar
                    showing={this.state.sidebar}
                    onToggleSidebar={this.onToggleSidebar}
                    loggedin={loggedin}
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
        );
    }
});

module.exports = MainComponent;
