var React = require('react');
var cookies = require('browser-cookies');
var SubmitButton = require('./SubmitButton');
var requests = require('superagent');
var Snackbar = require('./Snackbar');

var EditProfile = React.createClass({
    getInitialState () {
        return {
            submitting: false,
            email: '',
            about: '',
            old: '',
            new: '',
            repeat: '',
            password: '',
        };
    },
    componentDidMount () {
        requests
        .get('/api/v1/user/' + this.props.id)
        .end((err, res) => {
            this.setState({
                email: res.body.email,
                about: res.body.about,
            });
        });
    },
    onChangeText (e) {
        var temp = {};
        temp[e.target.name] = e.target.value;
        this.setState(temp);
    },
    updateProfile () {
        this.setState({
            submiting: true
        });
        requests
        .post('/api/v1/user/' + this.props.id)
        .type('form')
        .send({
            email: this.state.email,
            about: this.state.about,
            _xsrf: cookies.get('_xsrf')
        })
        .end((err, res) => {
            this.setState({
                submiting: false
            });
            if (err && err.status) {
                Snackbar({message: res.body.message});
            } else {
                Snackbar({message: 'Profile updated'});
            }
        });
    },
    changePassword () {
        if (this.state.new !== this.state.repeat) {
            Snackbar({message: "Password don't match"});
        } else {
            this.setState({
                submiting: true
            });
            requests
            .post('/api/v1/changepassword')
            .type('form')
            .send({
                old: this.state.old,
                new: this.state.new,
                _xsrf: cookies.get('_xsrf')
            })
            .end((err, res) => {
                this.setState({
                    submiting: false
                });
                if (err && err.status) {
                    Snackbar({message: res.body.message});
                } else {
                    Snackbar({message: 'Password changed'});
                }
            });
        }
    },
    deleteAccount () {
        if (!this.state.password) {
            Snackbar({message: 'Password is empty'});
        } else {
            this.setState({
                submiting: true
            });
            requests
            .post('/api/v1/user/' + this.props.id + '/delete')
            .type('form')
            .send({
                password: this.state.password,
                _xsrf: cookies.get('_xsrf')
            })
            .end((err, res) => {
                this.setState({
                    submiting: false
                });
                if (err && err.status) {
                    Snackbar({message: res.body.message});
                } else {
                    Snackbar({message: 'Account permanently deleted'});
                    history.pushState(null, null, '/');
                    Mentions.route('/');
                }
            });
        }
    },
    render () {
        return (
            <div>
                <div className='card'>
                    <div className='small-12 columns'>
                        <h2>Profile</h2>
                        Email
                        <input type='text' name='email' onChange={this.onChangeText} value={this.state.email}/>
                        About
                        <textarea type='text' name='about' onChange={this.onChangeText} value={this.state.about} rows={6}/>
                        <SubmitButton title='Save' submitting={this.state.submitting} onSubmit={this.updateProfile}/>
                    </div>
                </div>
                <div className='card'>
                    <div className='small-12 columns'>
                        <h2>Change Password</h2>
                        <input type='password' name='old' placeholder='Old Password' onChange={this.onChangeText} value={this.state.old}/>
                        <input type='password' name='new' placeholder='New Password' onChange={this.onChangeText} value={this.state.new}/>
                        <input type='password' name='repeat' placeholder='Repeat Password' onChange={this.onChangeText} value={this.state.repeat}/>
                        <SubmitButton title='Save' submitting={this.state.submitting} onSubmit={this.changePassword}/>
                    </div>
                </div>
                <div className='card'>
                    <div className='small-12 columns'>
                        <h2>Delete Account</h2>
                        <div className='callout warning'>
                            If you delete your account all your account information will be deleted. Any edits/contributions will NOT be deleted. This cannot be undone.
                        </div>
                        <input type='password' name='password' placeholder='Password' onChange={this.onChangeText} value={this.state.password}/>
                        <SubmitButton title='Delete Account' submitting={this.state.submitting} onSubmit={this.deleteAccount}/>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = EditProfile;
