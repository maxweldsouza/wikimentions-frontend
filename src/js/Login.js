var React = require('react');
var cookies = require('browser-cookies');
var Xsrf = require('./Xsrf');
var SubmitButton = require('./SubmitButton');
var requests = require('superagent');
var Snackbar = require('./Snackbar');
var store = require('store');
var Input = require('./Input');

var Login = React.createClass({
    getInitialState () {
        return {
            submitting: false,
            formError: false,
            username: '',
            password: ''
        };
    },
    onChangeText (e) {
        var temp = {};
        temp[e.target.name] = e.target.value;
        this.setState(temp);
    },
    onClear (name) {
        var temp = {};
        temp[name] = '';
        this.setState(temp);
    },
    login () {
        this.setState({
            submitting: true
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
                submitting: false
            });
            if (err && err.status) {
                this.setState({
                    formError: true
                });
            } else {
                if (this.props.onLogin) {
                    this.props.onLogin();
                }
                this.setState({
                    formError: false
                });
                Snackbar({message: 'Logged in'});
                store.set('username', res.body.username);
                store.set('level', res.body.level);
                store.set('id', res.body.id);

                var path = window.location.pathname + window.location.search;
                if (this.props.redirect) {
                    path = this.props.redirect;
                }
                history.pushState(null, null, path);
                Mentions.route(path);
            }
        });
    },
    render () {
        return (
            <div>
                <h1>Login</h1>
                {this.state.formError ? <div className='callout warning'>
                    <span className='ion-alert' />{'Login failed'}
                </div> : null}
                Username
                <Input
                    type='text'
                    name='username'
                    onChange={this.onChangeText}
                    onClear={this.onClear}
                    value={this.state.username}
                    valid={true}
                    message={''} />
                Password
                <Input
                    type='password'
                    name='password'
                    onChange={this.onChangeText}
                    onClear={this.onClear}
                    value={this.state.password}
                    valid={true}
                    message={''} />
                <SubmitButton title='Login' className='expanded button primary' submitting={this.state.submitting} onSubmit={this.login}/>
                <div className='float-right'>Don't have an account? <a href='/signup'>Signup</a></div>
            </div>
        );
    }
});

module.exports = Login;
