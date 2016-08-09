var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var _ = require('underscore');
var config = require('./config');
var HistoryItem = require('./HistoryItem');
var Time = require('./Time');
var requests = require('superagent');
var Restricted = require('./Restricted');
var Profile = require('./Profile');
var S = require('string');
var PreviousNext = require('./PreviousNext');
var TextWidget = require('./TextWidget');
var Markdown = require('./Markdown');

var ProfilePage = React.createClass({
    statics: {
        resources (appstate) {
            var [dummy, id, name, tab] = appstate.path.split('/');
            var page = appstate.query.page;
            var query = page ? '?page=' + page : '';
            var api = [{
                name: 'user',
                path: '/api/v1/user/' + id + '?slug=' + name
            }];
            api.push({
                name: 'history',
                path: '/api/v1/userhistory/' + id + query
            });
            return {
                api: api
            };
        }
    },
    render () {
        var [dummy, id, name, selectedTab] = this.props.path.split('/');
        var self = this.props.userid === id;

        selectedTab = selectedTab ? selectedTab : 'history';
        var user = this.props.data.user;
        var history = this.props.data.history;
        var tabs = ['history'];
        if (self) {
            tabs.push('profile');
        }
        var tab, tabContent;
        tab = <ul className='tabs' role='tablist'>
            {tabs.map((x) => {
                var cls = selectedTab === x ? 'tabs-title is-active' : 'tabs-title';
                var path;
                if (x === 'history') {
                    path = '/users/' + id + '/' + name;
                } else {
                    path = '/users/' + id + '/' + name + '/' + x;
                }
                return <li className={cls} key={x} role='tab'>
                    <a href={path} aria-selected={selectedTab === x}>{S(x).capitalize().s}</a>
                </li>;
            })}
        </ul>;
        if (selectedTab === 'history') {
            tabContent = <div className=''>
                {history.map((x, i) => {
                    return <HistoryItem
                        key={i}
                        user={user.id}
                        username={user.name}
                        obj_id={x.obj_id}
                        entry={x.entry}
                        entrytype={x.entrytype}
                        timestamp={x.timestamp}
                        deleted={x.deleted}
                        />;
                })}
                <PreviousNext path={this.props.path} page={this.props.query.page} count={history.length}/>
            </div>;
        } else if (selectedTab === 'profile') {
            tabContent = self ? <Profile id={id}/> : null;
        }
        return (
            <span>
                <Helmet
                    title={user.name}
                    titleTemplate={'%s - ' + config.name}
                    meta={[
                        {'name': 'robots', 'content': 'noindex'}
                    ]}
                    link={[
                        {'rel': 'canonical', 'href': config.url + this.props.path}
                    ]}
                    />
                <Navbar
                    loggedin={this.props.loggedin}
                    username={this.props.username}
                    userid={this.props.userid}
                    toggleSidebar={this.props.toggleSidebar}/>
                <div className='row page-body align-center'>
                    <div className='small-12 columns'>
                        <div className='row'>
                            <div className='small-12 columns'>
                                <h1>{user.name}</h1>
                                <div className='callout'>
                                    <div className='row'>
                                        <div className='small-12 medium-9 columns'>
                                            <div className='row'>
                                                <div className='small-4 columns'>
                                                    Joined
                                                </div>
                                                <div className='small-8 columns'>
                                                    <Time timestamp={user.joined} format='D/M/YY' type='timestamp'/>
                                                </div>
                                                <div className='small-4 columns'>
                                                    Level
                                                </div>
                                                <div className='small-8 columns'>
                                                    {user.level}
                                                </div>
                                                <div className='small-4 columns'>
                                                    About
                                                </div>
                                                <div className='small-8 columns'>
                                                    <Markdown
                                                        markdown={user.about}
                                                        />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {tab}
                                <div className='card-container'>
                                    {tabContent}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = ProfilePage;
