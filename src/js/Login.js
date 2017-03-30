import React from 'react';
import cookies from 'browser-cookies';
import SubmitButton from './SubmitButton';
import requests from 'superagent';
import snackbar from './snackbar';
import store from 'store';
import Input from './Input';
import autoBind from 'react-autobind';

class Login extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            submitting: false,
            formError: false,
            username: '',
            password: ''
        };
    }
    onChangeText(e) {
        const temp = {};
        temp[e.target.name] = e.target.value;
        this.setState(temp);
    }
    onClear(name) {
        const temp = {};
        temp[name] = '';
        this.setState(temp);
    }
    login(e) {
        e.preventDefault();
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
                    snackbar({ message: 'Logged in' });
                    store.set('username', res.body.username);
                    store.set('level', res.body.level);
                    store.set('id', res.body.id);

                    let path = window.location.pathname +
                        window.location.search;
                    if (path === '/login') {
                        path = '/';
                    }
                    history.pushState(null, null, path);
                    Mentions.route(path);
                }
            });
    }
    render() {
        return (
            <form onSubmit={this.login}>
                <h1>Login</h1>
                {this.state.formError
                    ? <div className="callout alert">
                          Login failed
                      </div>
                    : null}
                Username
                <Input
                    type="text"
                    name="username"
                    onChange={this.onChangeText}
                    onClear={this.onClear}
                    value={this.state.username}
                    valid={true}
                    message={''}
                />
                Password
                <Input
                    type="password"
                    name="password"
                    onChange={this.onChangeText}
                    onClear={this.onClear}
                    value={this.state.password}
                    valid={true}
                    message={''}
                />
                <SubmitButton
                    title="Login"
                    className="expanded button primary"
                    submitting={this.state.submitting}
                />
                <div className="float-right">
                    Don't have an account? <a href="/signup">Signup</a>
                </div>
            </form>
        );
    }
}

export default Login;
