var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var _ = require('underscore');
var config = require('./config');
var HistoryItem = require('./HistoryItem');
var Time = require('./Time');
var requests = require('superagent');
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
        var self = this.props.userid === Number(id);
        selectedTab = selectedTab ? selectedTab : 'history';
        var user = this.props.data.user;
        var history = this.props.data.history;
        var tabs = ['history'];
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
                <div className='row page-body white'>
                    <div className='small-12 columns'>
                        <h1>{user.name}</h1>
                        <p>
                            <div className='row'>
                                <div className='small-12 large-9 columns'>
                                    <div className='row'>
                                        <div className='small-4 columns'>
                                            Joined:
                                        </div>
                                        <div className='small-8 columns'>
                                            <Time timestamp={user.joined} type='ago'/>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='small-4 columns'>
                                            Level:
                                        </div>
                                        <div className='small-8 columns'>
                                            {user.level}
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='small-4 columns'>
                                            About:
                                        </div>
                                        <div className='small-8 columns'>
                                            <Markdown
                                                markdown={user.about}
                                                />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </p>
                        <div className='row'>
                            <div className='small-12 large-9 columns'>
                                {self ? <div>
                                    <div className='button-group' role='group'>
                                        <a
                                            className={selectedTab === 'history' ? 'button' : 'button secondary'}
                                            href={'/users/' + id + '/' + name}
                                            aria-selected={selectedTab === 'history'}>Activity</a>
                                        <a
                                            className={selectedTab === 'profile' ? 'button' : 'button secondary'}
                                            href={'/users/' + id + '/' + name + '/profile'}
                                            aria-selected={selectedTab === 'profile'}>Edit Profile</a>
                                    </div>
                                </div> : <div><h2>Activity</h2><hr/></div>}
                            </div>
                        </div>
                        {self && selectedTab === 'profile' ? <div className='card-container'>
                            <Profile id={id}/>
                        </div> : null}
                        {selectedTab === 'history' ? <div className='row'>
                            <div className='small-12 large-9 columns'>
                                <div className='row'>
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
                                </div>
                                <PreviousNext path={this.props.path} page={this.props.query.page} count={history.length}/>
                            </div>
                        </div> : null}
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = ProfilePage;
