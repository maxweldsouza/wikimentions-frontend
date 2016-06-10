var React = require('react');
var cookies = require('browser-cookies');
var SubmitButton = require('./SubmitButton');
var requests = require('superagent');
var Snackbar = require('./Snackbar');

var EditProfile = React.createClass({
    getInitialState () {
        return {
            submitting: false,
            old: '',
            new: '',
            repeat: ''
        };
    },
    onChangeText (e) {
        var temp = {};
        temp[e.target.name] = e.target.value;
        this.setState(temp);
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
    render () {
        return (
            <div className='card'>
                <div className='small-12 columns'>
                    <h2>Change Password</h2>
                    <input type='password' name='old' placeholder='Old Password' onChange={this.onChangeText}/>
                    <input type='password' name='new' placeholder='New Password' onChange={this.onChangeText}/>
                    <input type='password' name='repeat' placeholder='Repeat Password' onChange={this.onChangeText}/>
                    <SubmitButton title='Save' submitting={this.state.submitting} onSubmit={this.changePassword}/>
                </div>
            </div>
        );
    }
});

module.exports = EditProfile;
