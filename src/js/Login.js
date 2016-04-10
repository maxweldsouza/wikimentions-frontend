var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Login = require('./Login');
var cookies = require('browser-cookies');
var Xsrf = require('./Xsrf');

var Login = React.createClass({
    statics: {
        resources (appstate) {
            return {
                api: []
            };
        }
    },
    render () {
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
                    <div className='small-12 large-6 columns'>
                        <form action='/api/v1/login' method='post'>
                            <Xsrf/>
                            <h2>Login</h2>
                            <input type='text' name='username' placeholder='Username' />
                            <input type='password' name='password' placeholder='Password' />
                            <button type='submit' className='success button'>Login</button>
                        </form>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = Login;
