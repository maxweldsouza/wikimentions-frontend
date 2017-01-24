import React from 'react';
import Snackbar from './Snackbar';
import SubmitButton from './SubmitButton';
import requests from 'superagent';
import cookies from 'browser-cookies';
import Input from './Input';

class DeleteAccount extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            submitting: false,
            password: ''
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
    deleteAccount (e) {
        e.preventDefault();
        if (!this.state.password) {
            Snackbar({message: 'Password is empty'});
        } else {
            this.setState({
                submitting: true
            });
            requests
            .post(`/api/v1/user/${this.props.id}/delete`)
            .type('form')
            .send({
                password: this.state.password,
                _xsrf: cookies.get('_xsrf')
            })
            .end((err, res) => {
                this.setState({
                    submitting: false
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
    }
    render () {
        return (
            <div className='tabs-panel is-active' role='tabpanel'>
                <div className='row'>
                    <div className='large-8 columns'>
                        <form onSubmit={this.deleteAccount} className='columns box'>
                            <h2>Delete Account</h2>
                            <div className='callout warning'>
                                If you delete your account all your account information will be deleted. Any edits/contributions will NOT be deleted. This cannot be undone.
                            </div>
                            Password
                            <Input
                                type='password'
                                name='password'
                                onChange={this.onChangeText}
                                value={this.state.password}
                                onClear={this.onClear}
                                valid={true}
                                message={''}/>
                            <SubmitButton title='Delete Account' className='button alert float-right' submitting={this.state.submitting}/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default DeleteAccount;
