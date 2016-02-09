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
                <p>Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.</p>
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
