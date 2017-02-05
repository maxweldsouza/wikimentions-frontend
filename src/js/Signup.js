import React from 'react';
import cookies from 'browser-cookies';
import Xsrf from './Xsrf';
import SubmitButton from './SubmitButton';
import requests from 'superagent';
import Snackbar from './Snackbar';
import Input from './Input';
import store from 'store';
import autoBind from 'react-autobind';

class Signup extends React.Component {
    constructor (props) {
        super(props);
        autoBind(this);
        this.state = {
            submitting: false,
            username: '',
            usernameValid: true,
            usernameMessage: '',
            email: '',
            password: '',
            passwordValid: true,
            passwordMessage: '',
            retypePassword: '',
            retypePasswordValid: true,
            retypePasswordMessage: '',
            showPassword: false,
            formError: false
        };
    }
    onOpenModal () {
        this.setState({
            modalIsOpen: true
        });
    }
    closeModal () {
        this.setState({modalIsOpen: false});
    }
    onChangeText (e) {
        const temp = {};
        temp[e.target.name] = e.target.value;
        this.setState(temp);
    }
    onClear (name) {
        const temp = {};
        temp[name] = '';
        this.setState(temp);
    }
    signup (e) {
        e.preventDefault();
        if (this.validateForm()) {
            this.setState({
                submitting: true
            });
            requests
            .post('/api/v1/signup')
            .type('form')
            .send({
                username: this.state.username,
                password: this.state.password,
                email: this.state.email,
                _xsrf: cookies.get('_xsrf')
            })
            .end((err, res) => {
                this.setState({
                    submitting: false
                });
                if (err && err.status) {
                    Snackbar({message: err.message ? err.message : 'Something went wrong'});
                } else {
                    this.closeModal();
                    Snackbar({message: 'Signed up'});
                    store.set('username', res.body.username);
                    store.set('level', res.body.level);
                    store.set('id', res.body.id);

                    let path = window.location.pathname + window.location.search;
                    if (path === '/signup') {
                        path = '/';
                    }
                    history.pushState(null, null, path);
                    Mentions.route(path);
                }
            });
        }
    }
    showPassword () {
        this.setState({
            showPassword: true
        });
    }
    hidePassword () {
        this.setState({
            showPassword: false
        });
    }
    validateForm () {
        let valid = true;
        if (/^[a-zA-Z-_'.0-9]{3,32}$/.test(this.state.username)) {
            this.setState({
                usernameValid: true,
                usernameMessage: ''
            });
        } else {
            this.setState({
                usernameValid: false,
                usernameMessage: 'Username must be between 3 and 32 characters, and can only contain letters, numbers and these special characters -_\'.'
            });
        }
        if (this.state.password.length < 8) {
            this.setState({
                passwordValid: false,
                passwordMessage: 'Password must be between 8 and 160 characters'
            });
            valid = false;
        } else if (this.state.password.length > 160) {
            this.setState({
                passwordValid: false,
                passwordMessage: 'Password must be between 8 and 160 characters'
            });
            valid = false;
        } else {
            this.setState({
                passwordValid: true,
                passwordMessage: ''
            });
        }

        if (this.state.password !== this.state.retypePassword) {
            this.setState({
                retypePasswordValid: false,
                retypePasswordMessage: 'Passwords do not match'
            });
            valid = false;
        } else {
            this.setState({
                retypePasswordValid: true,
                retypePasswordMessage: ''
            });
        }
        this.setState({
            formError: !valid
        });
        return valid;
    }
    render () {
        return (
            <form onSubmit={this.signup}>
                {this.state.formError ? <div className='callout alert'>
                    Form has errors
                </div> : null}
                Username
                <Input
                    type='text'
                    name='username'
                    onChange={this.onChangeText}
                    onClear={this.onClear}
                    value={this.state.username}
                    valid={this.state.usernameValid}
                    message={this.state.usernameMessage} />
                E-mail (optional)
                <Input
                    type='text'
                    name='email'
                    onChange={this.onChangeText}
                    onClear={this.onClear}
                    value={this.state.email}
                    valid={true}
                    message=''/>
                Password
                {this.state.password.length > 0 && !this.state.showPassword ? <a onClick={this.showPassword} className='secondary float-right'>Show Password</a> : null}
                {this.state.password.length > 0 && this.state.showPassword ? <a onClick={this.hidePassword} className='secondary float-right'>Hide Password</a> : null}
                {this.state.showPassword ? <Input
                    type='text'
                    name='password'
                    valid={this.state.passwordValid}
                    message={this.state.passwordMessage}
                    onChange={this.onChangeText}
                    onClear={this.onClear}
                    value={this.state.password}/> : <Input
                    type='password'
                    name='password'
                    valid={this.state.passwordValid}
                    message={this.state.passwordMessage}
                    onChange={this.onChangeText}
                    onClear={this.onClear}
                    value={this.state.password}/>}
                Retype Password
                <Input
                    type='password'
                    name='retypePassword'
                    onChange={this.onChangeText}
                    onClear={this.onClear}
                    valid={this.state.retypePasswordValid}
                    message={this.state.retypePasswordMessage}
                    value={this.state.retypePassword}/>
                <SubmitButton title='Signup' className='expanded button primary' submitting={this.state.submitting}/>
                <div className='float-right'>Already have an account? <a href='/login'>Login</a></div>
            </form>
        );
    }
}

export default Signup;
