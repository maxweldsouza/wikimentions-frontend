var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Login = require('./Login');

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
                <form action='/api/v1/login' method='post'>
                    <div className='row'>
                        <div className='small-12 medium-6 columns'>
                            <h2>Login</h2>
                            <label>E-mail
                                <input type='email' name='email' placeholder='' />
                            </label>
                            <label>Password
                                <input type='password' name='password' placeholder='' />
                            </label>
                            <button type='submit' className='success button'>Submit</button>
                        </div>
                    </div>
                </form>
            </span>

        );
    }
});

module.exports = Login;
