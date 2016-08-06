var React = require('react');
var cookies = require('browser-cookies');
var Xsrf = require('./Xsrf');
var SubmitButton = require('./SubmitButton');
var requests = require('superagent');
var Snackbar = require('./Snackbar');
var zxcvbn = require('zxcvbn');
var Input = require('./Input');

var Signup = React.createClass({
    getInitialState () {
        return {
            submitting: false,
            username: '',
            usernameValid: true,
            usernameMessage: '',
            password: '',
            passwordValid: true,
            passwordMessage: '',
            email: '',
            retypePassword: '',
            retypePasswordValid: true,
            retypePasswordMessage: '',
            showPassword: false,
            formError: false,
            score: 0
        };
    },
    onOpenModal () {
        this.setState({
            modalIsOpen: true
        });
    },
    closeModal () {
        this.setState({modalIsOpen: false});
    },
    onChangeText (e) {
        var temp = {};
        if (e.target.name === 'password') {
            temp.score = zxcvbn(this.state.password).score;
        }
        temp[e.target.name] = e.target.value;
        this.setState(temp);
    },
    signup () {
        if (this.validateForm()) {
            this.setState({
                submiting: true
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
                    submiting: false
                });
                if (err && err.status) {
                    Snackbar({message: err.message ? err.message : 'Something went wrong'});
                } else {
                    this.closeModal();
                    Snackbar({message: 'Signed up'});
                    var path = window.location.pathname + window.location.search;
                    history.pushState(null, null, path);
                    Mentions.route(path);
                }
            });
        }
    },
    showPassword () {
        this.setState({
            showPassword: true
        });
    },
    hidePassword () {
        this.setState({
            showPassword: false
        });
    },
    validateForm () {
        var valid = true;
        if (!this.state.username) {
            this.setState({
                usernameValid: false,
                usernameMessage: 'Username cannot be empty'
            });
            valid = false;
        } else if (this.state.username.length < 3) {
            this.setState({
                usernameValid: false,
                usernameMessage: 'Username must be atleast 3 characters'
            });
            valid = false;
        } else if (this.state.username.length > 32) {
            this.setState({
                usernameValid: false,
                usernameMessage: 'Username cannot exceed 32 characters'
            });
            valid = false;
        } else {
            this.setState({
                usernameValid: true,
                usernameMessage: ''
            });
        }
        if (this.state.password.length < 8) {
            this.setState({
                passwordValid: false,
                passwordMessage: 'Password must be atleast 8 characters'
            });
            valid = false;
        } else if (this.state.password.length > 160) {
            this.setState({
                passwordValid: false,
                passwordMessage: 'Password cannot exceed 160 characters'
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
    },
    render () {
        var strength = this.state.score * 100 / 4;
        var meterStyle = {
            'width': strength + '%'
        };
        var cls;
        if (this.state.score === 4) {
            cls = 'progress success';
        } else if (this.state.score === 3) {
            cls = 'progress warning';
        } else if (this.state.score <= 2) {
            cls = 'progress danger';
            meterStyle = {'width': '3%'};
        }
        return (
            <form action='/api/v1/signup' method='post'>
                <Xsrf/>
                {this.state.formError ? <div className='callout warning'>
                    <span className='ion-alert' />{' Form has errors'}
                </div> : null}
                Username
                <Input
                    type='text'
                    name='username'
                    onChange={this.onChangeText}
                    valid={this.state.usernameValid}
                    message={this.state.usernameMessage} />
                E-mail (optional)
                <input type='text' name='email' />
                Password
                {this.state.password.length > 0 && !this.state.showPassword ? <a onClick={this.showPassword} className='secondary float-right'>Show Password</a> : null}
                {this.state.password.length > 0 && this.state.showPassword ? <a onClick={this.hidePassword} className='secondary float-right'>Hide Password</a> : null}
                {this.state.showPassword ? <Input
                    type='text'
                    name='password'
                    valid={this.state.passwordValid}
                    message={this.state.passwordMessage}
                    onChange={this.onChangeText}
                    value={this.state.password}/> : <Input
                    type='password'
                    name='password'
                    valid={this.state.passwordValid}
                    message={this.state.passwordMessage}
                    onChange={this.onChangeText}
                    value={this.state.password}/>}
                {this.state.password.length > 0 ? <div
                    className={cls}
                    role="progressbar"
                    aria-valuenow={strength}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{height: 5}}>
                    <div className="progress-meter" style={meterStyle}></div>
                </div> : null}
                Retype Password
                <Input
                    type='password'
                    name='retypePassword'
                    onChange={this.onChangeText}
                    valid={this.state.retypePasswordValid}
                    message={this.state.retypePasswordMessage}/>
                <SubmitButton title='Signup' className='expanded button primary' submitting={this.state.submitting} onSubmit={this.signup}/>
            </form>
        );
    }
});

module.exports = Signup;
