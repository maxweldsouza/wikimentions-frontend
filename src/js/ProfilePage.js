var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Login = require('./Login');
var DATA = require('./dummy');
var _ = require('underscore');
var moment = require('moment');

var ProfilePage = React.createClass({
    statics: {
        resources (appstate) {
            return {
                api: []
            };
        }
    },
    getInitialState () {
        return {
            tab: 'edits'
        };
    },
    changeTab (tab) {
        this.setState({
            tab: tab
        });
    },
    render () {
        var id = Number(this.props.path.split('/')[1]);
        var user = _.find(DATA.users, function (x) {
            return x.id === id;
        });
        var tab, tabContent;
        if (this.state.tab === 'edits') {
            tab = <ul className="tabs" data-tabs id="example-tabs">
                <li className="tabs-title is-active">
                    <a onClick={this.changeTab.bind(null, 'edits')} aria-selected="true">Edits</a>
                </li>
                <li className="tabs-title">
                    <a onClick={this.changeTab.bind(null, 'changepassword')}>Change Password</a>
                </li>
            </ul>;
            tabContent = <div className="tabs-panel is-active">
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
            </div>;
        } else if (this.state.tab === 'changepassword') {
            tab = <ul className="tabs" data-tabs id="example-tabs">
                <li className="tabs-title">
                    <a onClick={this.changeTab.bind(null, 'edits')}>Edits</a>
                </li>
                <li className="tabs-title is-active">
                    <a onClick={this.changeTab.bind(null, 'changepassword')} aria-selected="true">Change Password</a>
                </li>
            </ul>;
            tabContent = <div className="tabs-panel is-active">
                <div className='row'>
                    <div className='small-12 medium-6 columns'>
                        <label>Old Password
                            <input type='password' name='password' placeholder='' />
                        </label>
                        <label>New Password
                            <input type='password' name='password' placeholder='' />
                        </label>
                        <label>Repeat Password
                            <input type='password' name='password' placeholder='' />
                        </label>
                        <button type='submit' className='success button'>Submit</button>
                    </div>
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
                <div className='row'>
                    <div className='small-12 columns'>
                        <div className='row'>
                            <div className='small-12 columns'>
                                <h1>{user.name}</h1>
                                Joined {moment(user.joined).format('MMMM Do YYYY')}
                                {tab}
                            </div>
                            <div className="tabs-content" data-tabs-content="example-tabs">
                                {tabContent}
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = ProfilePage;
