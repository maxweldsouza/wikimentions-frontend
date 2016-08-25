var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var cookies = require('browser-cookies');
var Xsrf = require('./Xsrf');
var Signup = require('./Signup');

var SignupPage = React.createClass({
    statics: {
        resources (appstate) {
            return {
                api: [
                    {
                        name: 'signup',
                        path: '/api/v1/signup'
                    }
                ]
            };
        }
    },
    render () {
        return (
            <span>
                <Helmet
                    title={'Signup'}
                    titleTemplate={'%s - ' + config.name}
                    meta={[
                        {'name': 'description', 'content': ''}
                    ]}
                    link={[
                        {'rel': 'canonical', 'href': ''}
                    ]}
                    />
                <Navbar
                    loggedin={this.props.loggedin}
                    username={this.props.username}
                    userid={this.props.userid}
                    toggleSidebar={this.props.toggleSidebar}/>
                <div className='row page-body align-center white'>
                    <div className='small-12 large-6 columns'>
                        <h1>Sign Up</h1>
                        <Signup />
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = SignupPage;
