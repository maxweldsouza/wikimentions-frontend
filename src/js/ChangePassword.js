var React = require('react');
var Snackbar = require('./Snackbar');
var SubmitButton = require('./SubmitButton');
var requests = require('superagent');
var cookies = require('browser-cookies');
var Input = require('./Input');

var ChangePassword = React.createClass({
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
    onClear (name) {
        var temp = {};
        temp[name] = '';
        this.setState(temp);
    },
    changePassword () {
        if (this.state.new !== this.state.repeat) {
            Snackbar({message: "Password don't match"});
        } else {
            this.setState({
                submitting: true
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
                    submitting: false
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
                        <div className='columns box'>
                            <h2>Change Password</h2>
                            Old Password
                            <Input
                                type='password'
                                name='old'
                                onChange={this.onChangeText}
                                value={this.state.old}
                                onClear={this.onClear}
                                valid={true}
                                message={''}/>
                            New Password
                            <Input
                                type='password'
                                name='new'
                                onChange={this.onChangeText}
                                value={this.state.new}
                                onClear={this.onClear}
                                valid={true}
                                message={''}/>
                            Repeat Password
                            <Input
                                type='password'
                                name='repeat'
                                onChange={this.onChangeText}
                                value={this.state.repeat}
                                onClear={this.onClear}
                                valid={true}
                                message={''}/>
                            <SubmitButton title='Save' className='button primary float-right' submitting={this.state.submitting} onSubmit={this.changePassword}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ChangePassword;
