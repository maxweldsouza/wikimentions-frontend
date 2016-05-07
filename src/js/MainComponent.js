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
var RecentChangesPage = require('./RecentChangesPage');
var RecentDiscussionsPage = require('./RecentDiscussionsPage');
var SiteStatsPage = require('./SiteStatsPage');
var MaintenancePage = require('./MaintenancePage');

var Menu = require('react-burger-menu').slide;
var store = require('store');
var cookies = require('browser-cookies');
var isNode = require('./isNode');

var MainComponent = React.createClass({
    propTypes: {
        component: React.PropTypes.string.isRequired,
        data: React.PropTypes.object.isRequired
    },
    getInitialState () {
        return {
            sidebar: false,
            loggedin: false,
            username: '',
            userid: ''
        };
    },
    componentDidMount () {
        var session, username, userid;
        if (isNode.isBrowser()) {
            session = cookies.get('mentions');
            username = cookies.get('username');
            userid = cookies.get('userid');
        }
        this.setState({
            loggedin: session ? true : false,
            username: username,
            userid: userid
        });
    },
    onSidebarOpen (open) {
        this.setState({
            sidebar: true
        });
    },
    render () {
        var Component = require('./' + this.props.component);
        return (
            <div>
                <Menu
                    isOpen={false}
                    >
                    <a className="menu-item" href="/"><span className='ion-android-home menu-item-icon'/>Home</a>
                    <a className="menu-item" href="/create"><span className='ion-android-create menu-item-icon'/>Create Page</a>
                    <a className="menu-item" href="/create"><span className='ion-android-search menu-item-icon'/>Search</a>
                    <a className="menu-item" href="/contribute"><span className='ion-ios-people menu-item-icon'/>Contribute</a>
                    <a className="menu-item" href="/blog"><span className='ion-document menu-item-icon'/>Blog</a>
                    <a className="menu-item" href="/blog/newpost"><span className='ion-compose menu-item-icon'/>New Blog Post</a>
                    <a className="menu-item" href="/contact"><span className='ion-email menu-item-icon'/>Contact</a>
                    {this.state.loggedin ? <a className="menu-item" href="/contact"><span className='ion-log-out menu-item-icon'/>Log Out</a> : <a className="menu-item" href="/login"><span className='ion-log-in menu-item-icon'/>Log In</a>}
                    {this.state.loggedin ? <a className="menu-item" href="/signup"><span className='ion-person-add menu-item-icon'/>Sign Up</a> : <span></span>}
                </Menu>
                <Spinner />
                <Component
                    data={this.props.data}
                    path={this.props.path}
                    />
            </div>
        );
    }
});

module.exports = MainComponent;
