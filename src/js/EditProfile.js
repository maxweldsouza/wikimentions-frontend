import React from 'react';
import SubmitButton from './SubmitButton';
import requests from 'superagent';
import MarkdownHelp from './MarkdownHelp';
import MarkdownInput from './MarkdownInput';
import cookies from 'browser-cookies';
import Snackbar from './Snackbar';
import Input from './Input';

class EditProfile extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            submitting: false,
            email: '',
            about: '',
            preview: false,
            formMessage: ''
        };
    }
    componentDidMount () {
        requests
        .get(`/api/v1/user/${this.props.id}`)
        .end((err, res) => {
            this.setState({
                email: res.body.email,
                about: res.body.about
            });
        });
    }
    onChangeText (e) {
        const temp = {};
        temp[e.target.name] = e.target.value;
        if (e.target.name === 'about') {
            temp.preview = true;
        }
        this.setState(temp);
    }
    onClear (name) {
        const temp = {};
        temp[name] = '';
        this.setState(temp);
    }
    updateProfile (e) {
        e.preventDefault();
        this.setState({
            submitting: true
        });
        requests
        .post(`/api/v1/user/${this.props.id}`)
        .type('form')
        .send({
            email: this.state.email,
            about: this.state.about,
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
                Snackbar({message: 'Profile updated'});
            }
        });
    }
    render () {
        return (
            <div className='tabs-panel is-active' role='tabpanel'>
                <div className='row'>
                    <div className='large-8 columns'>
                        <form onSubmit={this.updateProfile} className='columns box'>
                            <h2>Profile</h2>
                            {this.state.formMessage ? <div className='callout alert'>
                                {this.state.formMessage}
                            </div> : null}
                            Email
                            <Input
                                type='text'
                                name='email'
                                onChange={this.onChangeText}
                                value={this.state.email}
                                onClear={this.onClear}
                                valid={true}
                                message={''}/>
                            <MarkdownInput
                                name='about'
                                placeholder='Write something about yourself (Markdown is supported)'
                                label='About'
                                rows='5'
                                content={this.state.about}
                                onChange={this.onChangeText}
                                sideBySide={false}
                                maxLength={255} />
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

export default EditProfile;
