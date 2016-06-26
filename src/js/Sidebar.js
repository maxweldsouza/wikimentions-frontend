var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var _ = require('underscore');
var config = require('./config');
var requests = require('superagent');
var Snackbar = require('./Snackbar');
var cookies = require('browser-cookies');
var Sidebar = React.createClass({
    onTouchStart: function (e) {
    },
    onTouchMove: function (e) {
    },
    onClickItem (url) {
        this.props.onToggleSidebar();
        history.pushState(null, null, url);
        Comparnion.route(url);
    },
    logout () {
        requests
        .post('/api/v1/logout')
        .type('form')
        .send({
            _xsrf: cookies.get('_xsrf')
        })
        .end((err, res) => {
            if (err && err.status) {
                Snackbar({message: 'Logout failed'});
            } else {
                Snackbar({message: 'Logged out'});
                history.pushState(null, null, '/');
                Mentions.route('/');
            }
        });
    },
    render: function () {
        var sidebar = this.props.showing ? '' : 'hidden';
        var loggedin = this.props.loggedin;
        return (
            <div>
                <div className={'sidebar sidebar-' + sidebar}
                    onTouchStart={this.onTouchStart}
                    onTouchMove={this.onTouchMove}
                    >
                    <div className='sidebar-header'>
                        <a className='sidebar-logo' href='/'>{config.name}</a>
                    </div>
                    <a className="sidebar-item sidebar-button" href="/"><span className='ion-android-home menu-item-icon'/>Home</a>
                    <a className="sidebar-item sidebar-button" href="/create"><span className='ion-android-create menu-item-icon'/>Create Page</a>
                    <a className="sidebar-item sidebar-button" href="/contribute"><span className='ion-ios-people menu-item-icon'/>Contribute</a>
                    <a className="sidebar-item sidebar-button" href="/blog"><span className='ion-document menu-item-icon'/>Blog</a>
                    <a className="sidebar-item sidebar-button" href="/blog/newpost"><span className='ion-compose menu-item-icon'/>New Blog Post</a>
                    <a className="sidebar-item sidebar-button" href="/contact"><span className='ion-email menu-item-icon'/>Contact</a>
                    {loggedin ? <a className="sidebar-item sidebar-button" onClick={this.logout}><span className='ion-log-out menu-item-icon'/>Log Out</a> : <a className="sidebar-item sidebar-button" href="/login"><span className='ion-log-in menu-item-icon'/>Log In</a>}
                    {loggedin ? <span></span> : <a className="sidebar-item sidebar-button" href="/signup"><span className='ion-person-add menu-item-icon'/>Sign Up</a>}
                </div>
                <div className={'sidebar-overlay ' + sidebar}
                    onClick={this.props.onToggleSidebar} >
                </div>
            </div>
        );
    }
});

module.exports = Sidebar;
