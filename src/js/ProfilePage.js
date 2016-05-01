var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Login = require('./Login');
var _ = require('underscore');
var moment = require('moment');

var ProfilePage = React.createClass({
    statics: {
        resources (appstate) {
            var id = appstate.url.split('/')[1];
            return {
                api: [
                    {
                        name: 'user',
                        path: '/api/v1/user/' + id
                    }
                ]
            };
        }
    },
    getInitialState () {
        return {
            tab: 'Stats'
        };
    },
    changeTab (tab) {
        this.setState({
            tab: tab
        });
    },
    render () {
        var id = Number(this.props.path.split('/')[1]);
        var user = this.props.data.user;
        var tabs = ['Edits', 'Profile', 'Stats'];

        var tab, tabContent;
        tab = <ul className='tabs' data-tabs id='example-tabs'>
            {tabs.map((x) => {
                var cls = this.state.tab === x ? 'tabs-title is-active' : 'tabs-title';
                return <li className={cls}>
                    <a onClick={this.changeTab.bind(null, x)} aria-selected='true'>{x}</a>
                </li>;
            })}
        </ul>;
        if (this.state.tab === 'Edits') {
            tabContent = <div className='card'>
                <div className='small-12 columns'>
                <table>
                    <thead>
                        <tr>
                            <th width={200}>Page</th>
                            <th>Type</th>
                            <th width={150}>Updated</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>The God Delusion</td>
                            <td>Mention</td>
                            <td>2 mins ago</td>
                        </tr>
                        <tr>
                            <td>The Selfish Gene</td>
                            <td>Page</td>
                            <td>12 mins ago</td>
                        </tr>
                        <tr>
                            <td>Phantoms in the Brain</td>
                            <td>Book</td>
                            <td>3 days ago</td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>;
        } else if (this.state.tab === 'Profile') {
            tabContent = <div>
                <div className='card'>
                    <div className='small-12 columns'>
                        <h2>Change Password</h2>
                        <input type='password' name='old' placeholder='Old Password' />
                        <input type='password' name='new' placeholder='New Password' />
                        <input type='password' name='repeat' placeholder='Repeat Password' />
                        <button type='submit' className='success button'>Change Password</button>
                    </div>
                </div>
                <div className='card'>
                    <div className='small-12 columns'>
                        <h2>Change Username</h2>
                        <input type='text' name='username' placeholder='New Username' />
                        <button type='submit' className='success button'>Change Username</button>
                    </div>
                </div>
                <div className='card'>
                    <div className='small-12 columns'>
                        <h2>Verify E-mail</h2>
                        <p>An email with a verification link will be sent to you.</p>
                        <button type='submit' className='success button'>Verify</button>
                    </div>
                </div>
            </div>;
        } else if (this.state.tab === 'Stats') {
            tabContent = <div className='card'>
                <div className='small-12 columns'>
                    Stats
                    Contributions: 12
                    Last Active: 12th Jan 2013
                </div>
            </div>;
        }
        return (
            <span>
                <Helmet
                    title={'Mentions'}
                    titleTemplate='%s - Mentions'
                    meta={[
                        {'name': 'description', 'content': ''}
                    ]}
                    link={[
                        {'rel': 'canonical', 'href': ''}
                    ]}
                    />
                <Navbar/>
                <div className='row page-body align-center'>
                    <div className='small-12 large-8 columns'>
                        <div className='row'>
                            <div className='small-12 columns'>
                                <h1 className='page-title'>{user.name}</h1>
                                <div>
                                    Joined {moment(user.joined).format('MMMM Do YYYY')}
                                </div>
                                <div>Level {user.level}</div>
                                <div className='button-group small'>
                                    <button className='button warning'>Report</button>
                                    <button className='button alert'>Block</button>
                                </div>
                                {tab}
                                <div className='tabs-content' data-tabs-content='example-tabs'>
                                    <div className='tabs-panel is-active'>
                                        <div className='card-container'>
                                            {tabContent}
                                        </div>
                                    </div>
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
