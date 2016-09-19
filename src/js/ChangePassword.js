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
            repeat: '',
            formMessage: ''
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
    changePassword (e) {
        e.preventDefault();
        if (this.state.new !== this.state.repeat) {
            this.setState({
                formMessage: 'Passwords do not match'
            });
        } else {
            this.setState({
                submitting: true,
                formMessage: ''
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
                    this.setState({
                        formMessage: res.body.message
                    });
                } else {
                    this.setState({
                        formMessage: ''
                    });
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
                        <form onSubmit={this.changePassword} className='columns box'>
                            <h2>Change Password</h2>
                            {this.state.formMessage ? <div className='callout alert'>
                                {this.state.formMessage}
                            </div> : null}
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
                            <SubmitButton
                                title='Save'
                                className='button primary float-right'
                                submitting={this.state.submitting}/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ChangePassword;
