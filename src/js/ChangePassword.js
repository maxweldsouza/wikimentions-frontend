import React from 'react';
import Snackbar from './Snackbar';
import SubmitButton from './SubmitButton';
import requests from 'superagent';
import cookies from 'browser-cookies';
import Input from './Input';

class ChangePassword extends React.Component {
    getInitialState () {
        return {
            submitting: false,
            old: '',
            new: '',
            repeat: '',
            formMessage: ''
        };
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
    }
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
}

export default ChangePassword;
