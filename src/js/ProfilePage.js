var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Login = require('./Login');

var ProfilePage = React.createClass({
    getInitialState () {
        return {
            tab: 'edits'
        };
    },
    statics: {
        resources (appstate) {
            return {
                api: []
            };
        }
    },
    changeTab(tab) {
        this.setState({
            tab: tab
        });
    },
    render () {
        var tab, tabContent;
        if (this.state.tab === 'edits') {
            tabContent = <div className="tabs-panel is-active">
                <table>
                    <thead>
                        <tr>
                            <th width={200}>Table Header</th>
                            <th>Table Header</th>
                            <th width={150}>Table Header</th>
                            <th width={150}>Table Header</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Content Goes Here</td>
                            <td>This is longer content Donec id elit non mi porta gravida at eget metus.</td>
                            <td>Content Goes Here</td>
                            <td>Content Goes Here</td>
                        </tr>
                        <tr>
                            <td>Content Goes Here</td>
                            <td>This is longer Content Goes Here Donec id elit non mi porta gravida at eget metus.</td>
                            <td>Content Goes Here</td>
                            <td>Content Goes Here</td>
                        </tr>
                        <tr>
                            <td>Content Goes Here</td>
                            <td>This is longer Content Goes Here Donec id elit non mi porta gravida at eget metus.</td>
                            <td>Content Goes Here</td>
                            <td>Content Goes Here</td>
                        </tr>
                    </tbody>
                </table>
            </div>;
        } else if (this.state.tab === 'changepassword') {
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
                            <ul className="tabs" data-tabs id="example-tabs">
                                <li className="tabs-title is-active">
                                    <a onClick={this.changeTab.bind(null, 'edits')} aria-selected="true">Edits</a>
                                </li>
                                <li className="tabs-title">
                                    <a onClick={this.changeTab.bind(null, 'changepassword')}>Change Password</a>
                                </li>
                            </ul>
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
