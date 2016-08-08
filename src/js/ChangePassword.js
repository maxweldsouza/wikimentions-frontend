var React = require('react');
var Snackbar = require('./Snackbar');
var SubmitButton = require('./SubmitButton');
var requests = require('superagent');

var ChangePassword = React.createClass({
    getInitialState: function() {
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
            <div className='tabs-panel is-active' role='tabpanel'>
                <div className='row'>
                    <div className='large-8 columns'>
                        <h2>Change Password</h2>
                        Old Password
                        <input type='password' name='old' onChange={this.onChangeText} value={this.state.old}/>
                        New Password
                        <input type='password' name='new' onChange={this.onChangeText} value={this.state.new}/>
                        Repeat Password
                        <input type='password' name='repeat' onChange={this.onChangeText} value={this.state.repeat}/>
                        <SubmitButton title='Save' className='button primary float-right' submitting={this.state.submitting} onSubmit={this.changePassword}/>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ChangePassword;
