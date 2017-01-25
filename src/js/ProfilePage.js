import React from 'react';
import Helmet from 'react-helmet';
import Navbar from './Navbar';
import _ from 'underscore';
import config from './config';
import HistoryItem from './HistoryItem';
import Time from './Time';
import requests from 'superagent';
import Profile from './Profile';
import S from 'string';
import Pagination from './Pagination';
import TextWidget from './TextWidget';
import Markdown from './Markdown';
import autoBind from 'react-autobind';

class ProfilePage extends React.Component {
    static resources (appstate) {
        const [dummy, id, name, tab] = appstate.path.split('/');
        const page = appstate.query.page;
        const query = page ? `?page=${page}` : '';
        const api = [{
            name: 'user',
            path: `/api/v1/user/${id}?slug=${name}`
        }];
        api.push({
            name: 'history',
            path: `/api/v1/userhistory/${id}${query}`
        });
        return {
            api
        };
    }
    render () {
        let [dummy, id, name, selectedTab] = this.props.path.split('/');
        const self = this.props.userid === Number(id);
        selectedTab = selectedTab ? selectedTab : 'history';
        const user = this.props.data.user;
        const history = this.props.data.history;
        const tabs = ['history'];

        const empty = <div className='callout warning'>
            There is no activity to show.
        </div>;
        const nomore = <div className='callout warning'>
            No more entries to show.
        </div>;
        return (
            <span>
                <Helmet
                    title={user.name}
                    titleTemplate={`%s - ${config.name}`}
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
                        <div className='row margin-bottom'>
                            <div className='small-12 large-9 columns'>
                                <div className='row'>
                                    <div className='small-4 columns'>
                                        User No:
                                    </div>
                                    <div className='small-8 columns'>
                                        {user.id}
                                    </div>
                                </div>
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
                        <div className='row'>
                            <div className='small-12 large-9 columns'>
                                {self ? <div>
                                    <div className='button-group' role='group'>
                                        <a
                                            className={selectedTab === 'history' ? 'button' : 'button secondary'}
                                            rel='nofollow'
                                            href={`/users/${id}/${name}`}
                                            aria-selected={selectedTab === 'history'}>Activity</a>
                                        <a
                                            className={selectedTab === 'profile' ? 'button' : 'button secondary'}
                                            rel='nofollow'
                                            href={`/users/${id}/${name}/profile`}
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
                                {!this.props.query.page && history.length === 0 ? empty : null}
                                {this.props.query.page && history.length === 0 ? nomore : null}
                                <Pagination path={this.props.path} page={this.props.query.page} count={history.length}/>
                            </div>
                        </div> : null}
                    </div>
                </div>
            </span>
        );
    }
}

export default ProfilePage;
