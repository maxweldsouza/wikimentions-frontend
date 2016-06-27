var React = require('react');
var cookies = require('browser-cookies');
var Xsrf = require('./Xsrf');
var SubmitButton = require('./SubmitButton');
var requests = require('superagent');
var Snackbar = require('./Snackbar');

var Login = React.createClass({
    getInitialState () {
        return {
            submitting: false
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
                if (this.props.onLogin) {
                    this.props.onLogin();
                }
                Snackbar({message: 'Logged in'});
                history.pushState(null, null, '/');
                Mentions.route('/');
            }
        });
    },
    render () {
        return (
            <div>
                <h1>Login</h1>
                <input type='text' name='username' placeholder='Username' onChange={this.onChangeText}/>
                <input type='password' name='password' placeholder='Password' onChange={this.onChangeText}/>
                <SubmitButton title='Login' className='expanded button' submitting={this.state.submitting} onSubmit={this.login}/>
            </div>
        );
    }
});

module.exports = Login;
