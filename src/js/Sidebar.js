import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import _ from 'underscore';
import config from './config';
import requests from 'superagent';
import snackbar from './snackbar';
import cookies from 'browser-cookies';
import { VelocityTransitionGroup } from 'velocity-react';
import autoBind from 'react-autobind';

class Sidebar extends React.Component {
    shouldComponentUpdate (nextProps, nextState) {
        return this.props.showing !== nextProps.showing ||
            this.props.username !== nextProps.username ||
            this.props.loggedin !== nextProps.loggedin ||
            this.props.userid !== nextProps.userid;
    }
    onClickItem (url) {
        this.props.onToggleSidebar();
        history.pushState(null, null, url);
        Comparnion.route(url);
    }
    random () {
        requests
        .get('/api/v1/random')
        .send()
        .end((err, res) => {
            if (!err) {
                history.pushState(null, null, res.body.path);
                Mentions.route(res.body.path);
            }
        });
    }
    render () {
        const sidebar = this.props.showing ? '' : 'hidden';
        const loggedin = this.props.loggedin;
        return (
            <div aria-hidden={!this.props.showing} role='complementary' aria-label='Sidebar'>
                <VelocityTransitionGroup enter={{ animation: { translateX: '0px', easing: 'easeIn', duration: 100 } }} leave={{ animation: { translateX: '-250px', easing: 'easeOut', duration: 100 } }}>
                    {this.props.showing ? <div className='sidebar'>
                        <div className='sidebar-header'>
                            <a className='sidebar-logo' href='/'>{config.name}</a>
                        </div>
                        <a className='sidebar-item sidebar-button' href='/'>
                            <span className='ion-android-home menu-item-icon'/>Home
                        </a>
                        <a className='sidebar-item sidebar-button' href='/create'>
                            <span className='ion-android-create menu-item-icon'/>Create Page
                        </a>
                        <a className='sidebar-item sidebar-button' href='/lists/create'>
                            <span className='ion-android-list menu-item-icon'/>Create List
                        </a>
                        <a className='sidebar-item sidebar-button' onClick={this.random}>
                            <span className='ion-shuffle menu-item-icon'/>Random Page
                        </a>
                        <a className='sidebar-item sidebar-button' href='/recent-changes' rel='nofollow'>
                            <span className='ion-flash menu-item-icon'/>Recent Changes
                        </a>
                        <a className='sidebar-item sidebar-button' href='/recent-discussions' rel='nofollow'>
                            <span className='ion-chatbubbles menu-item-icon'/>Recent Discussions
                        </a>
                        <a className='sidebar-item sidebar-button' href='/blog'>
                            <span className='ion-document menu-item-icon'/>Blog
                        </a>
                        {loggedin ? <a className='sidebar-item sidebar-button' onClick={Mentions.logout}><span className='ion-log-out menu-item-icon'/>Log Out</a> : <a className='sidebar-item sidebar-button' href='/login'><span className='ion-log-in menu-item-icon'/>Log In</a>}
                        {loggedin ? <span></span> : <a className='sidebar-item sidebar-button' href='/signup'><span className='ion-person-add menu-item-icon'/>Sign Up</a>}
                        {loggedin ? <span className='sidebar-button sidebar-loggedin'>Logged in as <a className='' href={`/users/${this.props.userid}/${this.props.username}`}>{this.props.username}</a></span> : null}
                    </div> : null}
                </VelocityTransitionGroup>
                <VelocityTransitionGroup enter={{ animation: 'fadeIn' }} leave={{ animation: 'transition.fadeOut' }}>
                    {this.props.showing ? <div className='sidebar-overlay'
                        onClick={this.props.onToggleSidebar} >
                    </div> : null}
                </VelocityTransitionGroup>
            </div>
        );
    }
}

export default Sidebar;
