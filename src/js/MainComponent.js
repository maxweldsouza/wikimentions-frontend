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

var Menu = require('react-burger-menu').push;

var store = require('store');

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
    onSidebarOpen (open) {
        this.setState({
            sidebar: true
        });
    },
    render () {
        var Component = require('./' + this.props.component);
        return (
            <div>
                <div id="outer-container">
                    <Menu isOpen={false} pageWrapId={"page-wrap"} outerContainerId={"outer-container"}>
                        <a id="home" className="menu-item" href="/"><span className='ion-android-home menu-item-icon'/>Home</a>
                        <a id="about" className="menu-item" href="/create"><span className='ion-android-search menu-item-icon'/>Search</a>
                        <a id="about" className="menu-item" href="/blog"><span className='ion-edit menu-item-icon'/>Blog</a>
                        <a id="about" className="menu-item" href="/blog/newpost"><span className='ion-edit menu-item-icon'/>New Blog Post</a>
                        <a id="about" className="menu-item" href="/contribute"><span className='ion-edit menu-item-icon'/>Contribute</a>
                        <a id="about" className="menu-item" href="/create"><span className='ion-android-create menu-item-icon'/>Create Page</a>
                        <a id="contact" className="menu-item" href="/contact"><span className='ion-android-contact menu-item-icon'/>Contact</a>
                    </Menu>
                  <main id="page-wrap">
                    <Spinner />
                    <Component
                        data={this.props.data}
                        path={this.props.path}
                        />
                  </main>
                </div>
            </div>
        );
    }
});

module.exports = MainComponent;
