var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var cookies = require('browser-cookies');
var Xsrf = require('./Xsrf');

var Signup = React.createClass({
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
                <form action='/api/v1/signup' method='post'>
                    <Xsrf/>
                    <div className='row'>
                        <div className='small-12 medium-6 columns'>
                            <h2>Sign Up</h2>
                            You will be user #{this.props.data.signup.count} if you sign up now
                            <input type='text' name='username' placeholder='Username' required />
                            <input type='text' name='email' placeholder='E-mail' />
                            <input type='password' name='password' placeholder='Password' required/>
                            <input type='password' placeholder='Retype Password' required/>
                            <button type='submit' className='success button'>Save</button>
                        </div>
                    </div>
                </form>
            </span>

        );
    }
});

module.exports = Signup;
