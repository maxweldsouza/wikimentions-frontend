var React = require('react');
var cookies = require('browser-cookies');
var Xsrf = require('./Xsrf');
var SubmitButton = require('./SubmitButton');
var requests = require('superagent');
var Snackbar = require('./Snackbar');
var zxcvbn = require('zxcvbn');

var Signup = React.createClass({
    getInitialState () {
        return {
            submitting: false,
            username: '',
            password: '',
            email: '',
            retypePassword: '',
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
        if (this.state.password !== this.state.retypePassword) {
            Snackbar({message: 'Passwords do not match'});
            return;
        }
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
        } else if (this.state.score === 2) {
            cls = 'progress danger';
        } else if (this.state.score === 1) {
            cls = 'progress danger';
        } else if (this.state.score === 0) {
            cls = 'progress secondary';
        }
        if (this.state.password.length < 8) {
            meterStyle = {'width': '0%'};
            cls = 'progress secondary';
        }
        return (
            <form action='/api/v1/signup' method='post'>
                <Xsrf/>
                Username
                <input type='text' name='username' onChange={this.onChangeText} />
                E-mail (optional)
                <input type='text' name='email' />
                Password
                <input type='password' name='password' onChange={this.onChangeText}/>
                {this.state.password.length > 0 ? <div className={cls} role="progressbar" tabIndex="0" aria-valuenow={strength} aria-valuemin="0" aria-valuemax="100" style={{height: 5}}>
                    <div className="progress-meter" style={meterStyle}></div>
                </div> : null}
                Retype Password
                <input type='password' name='retypePassword' onChange={this.onChangeText}/>
                <SubmitButton title='Signup' className='expanded button primary' submitting={this.state.submitting} onSubmit={this.signup}/>
            </form>
        );
    }
});

module.exports = Signup;
