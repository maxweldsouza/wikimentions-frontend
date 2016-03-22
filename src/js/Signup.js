var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');

var Signup = React.createClass({
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
                <form action='/api/v1/register' method='post'>
                    <div className='row'>
                        <div className='small-12 medium-6 columns'>
                            <h2>Sign Up</h2>
                            You will be user #23 TODO
                            <label>E-mail
                                <input type='email' name='email' placeholder='' required />
                            </label>
                            <label>Password
                                <input type='password' name='password' placeholder='' required/>
                            </label>
                            <label>Retype Password
                                <input type='password' placeholder='' required/>
                            </label>
                            <button type='submit' className='success button'>Save</button>
                        </div>
                    </div>
                </form>
            </span>

        );
    }
});

module.exports = Signup;
