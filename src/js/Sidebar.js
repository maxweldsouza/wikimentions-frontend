var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var _ = require('lodash');
var config = require('./config');
var requests = require('superagent');
var Snackbar = require('./Snackbar');
var cookies = require('browser-cookies');
var VelocityTransitionGroup = require('velocity-react').VelocityTransitionGroup;

var Sidebar = React.createClass({
    onTouchStart (e) {
    },
    onTouchMove (e) {
    },
    onClickItem (url) {
        this.props.onToggleSidebar();
        history.pushState(null, null, url);
        Comparnion.route(url);
    },
    render () {
        var sidebar = this.props.showing ? '' : 'hidden';
        var loggedin = this.props.loggedin;
        return (
            <div>
                <VelocityTransitionGroup enter={{animation: {translateX: '0px', easing: 'easeIn', duration: 100}}} leave={{animation: {translateX: '-250px', easing: 'easeOut', duration: 100}}}>
                    {this.props.showing ? <div className='sidebar'
                        onTouchStart={this.onTouchStart}
                        onTouchMove={this.onTouchMove}
                        >
                        <div className='sidebar-header'>
                            <a className='sidebar-logo' href='/'>{config.name}</a>
                        </div>
                        <a className='sidebar-item sidebar-button' href='/'>
                            <span className='ion-android-home menu-item-icon'/>Home
                        </a>
                        <a className='sidebar-item sidebar-button' href='/create'>
                            <span className='ion-android-create menu-item-icon'/>Create Page
                        </a>
                        <a className='sidebar-item sidebar-button' href='/contribute'>
                            <span className='ion-ios-people menu-item-icon'/>Contribute
                        </a>
                        <a className='sidebar-item sidebar-button' href='/blog'>
                            <span className='ion-document menu-item-icon'/>Blog
                        </a>
                        <a className='sidebar-item sidebar-button' href='/contact'>
                            <span className='ion-email menu-item-icon'/>Contact
                        </a>
                        {loggedin ? <a className='sidebar-item sidebar-button' onClick={Mentions.logout}><span className='ion-log-out menu-item-icon'/>Log Out</a> : <a className='sidebar-item sidebar-button' href='/login'><span className='ion-log-in menu-item-icon'/>Log In</a>}
                        {loggedin ? <span></span> : <a className='sidebar-item sidebar-button' href='/signup'><span className='ion-person-add menu-item-icon'/>Sign Up</a>}
                        {loggedin ? <span className='sidebar-button sidebar-loggedin'>Logged in as <a className='' href={'/users/' + this.props.userid + '/' + this.props.username}>{this.props.username}</a></span> : null}
                    </div> : null}
                </VelocityTransitionGroup>
                <VelocityTransitionGroup enter={{animation: 'fadeIn'}} leave={{animation: 'transition.fadeOut'}}>
                    {this.props.showing ? <div className='sidebar-overlay'
                        onClick={this.props.onToggleSidebar} >
                    </div> : null}
                </VelocityTransitionGroup>
            </div>
        );
    }
});

module.exports = Sidebar;
