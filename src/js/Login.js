var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Login = require('./Login');
var cookies = require('browser-cookies');
var Xsrf = require('./Xsrf');
var SubmitButton = require('./SubmitButton');
var requests = require('superagent');
var Snackbar = require('./Snackbar');

var Login = React.createClass({
    statics: {
        resources (appstate) {
            return {
                api: []
            };
        }
    },
    getInitialState: function() {
        return {
            submitting: false,
            username: '',
            password: ''
        };
    },
    onChangeText (e) {
        var temp = {};
        temp[e.target.name] = e.target.value;
        this.setState(temp);
    },
    login () {
        this.setState({
            submiting: true
        });
        requests
        .post('/api/v1/login')
        .type('form')
        .send({
            username: this.state.username,
            password: this.state.password,
            _xsrf: cookies.get('_xsrf')
        })
        .end((err, res) => {
            this.setState({
                submiting: false
            });
            if (err && err.status) {
                Snackbar({message: 'Login failed'});
            } else {
                Snackbar({message: 'Logged in'});
                history.pushState(null, null, '/');
                Mentions.route('/');
            }
        });
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
                            <h1>Login</h1>
                            <input type='text' name='username' placeholder='Username' onChange={this.onChangeText}/>
                            <input type='password' name='password' placeholder='Password' onChange={this.onChangeText}/>
                            <SubmitButton title='Login' submitting={this.state.submitting} onSubmit={this.login}/>
                        </form>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = Login;
