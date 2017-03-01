import cookies from 'browser-cookies';
import LoginModal from './LoginModal';
import MarkdownInput from './MarkdownInput';
import React from 'react';
import requests from 'superagent';
import Restricted from './Restricted';
import SignupModal from './SignupModal';
import snackbar from './snackbar';
import SubmitButton from './SubmitButton';
import autoBind from 'react-autobind';

class DiscussReply extends React.Component {
    constructor (props) {
        super(props);
        autoBind(this);
        this.state = {
            content: '',
            submitting: false,
            preview: false,
            formMessage: ''
        };
    }
    onChangeText (e) {
        const temp = {};
        temp[e.target.name] = e.target.value;
        this.setState(temp);
    }
    onSubmit (e) {
        e.preventDefault();
        if (!this.state.content) {
            this.setState({
                formMessage: 'Post is empty'
            });
            return;
        }
        this.setState({
            submitting: true
        });
        requests
        .post(`/api/v1/discuss/${this.props.id}`)
        .type('form')
        .send({
            content: this.state.content,
            _xsrf: cookies.get('_xsrf')
        })
        .end((err, res) => {
            this.setState({
                submitting: false,
                content: ''
            });
            if (err && err.status) {
                this.setState({
                    formMessage: res.body.message
                });
            } else {
                this.setState({
                    formMessage: ''
                });
                snackbar({ message: 'Posted' });
                history.pushState(null, null, window.location.pathname + window.location.search);
                Mentions.route(window.location.pathname + window.location.search);
            }
        });
    }
    render () {
        const loggedOutMessage = <span>You need to <LoginModal/> / <SignupModal/> to post a message.</span>;
        return (
            <form onSubmit={this.onSubmit} className='small-12 columns'>
                <Restricted
                    message={loggedOutMessage}
                    min_level={1}
                    loggedin={this.props.loggedin}>
                    {this.state.formMessage ? <div className='callout alert'>
                        {this.state.formMessage}
                    </div> : null}
                    <MarkdownInput
                        name='content'
                        placeholder='Write your post  here (Markdown is supported)'
                        rows='5'
                        label='Post'
                        content={this.state.content}
                        onChange={this.onChangeText}
                        sideBySide={true}
                        maxLength={65535} />
                    <SubmitButton
                        title='Submit'
                        className='button primary float-right'
                        submitting={this.state.submitting}/>
                </Restricted>
            </form>
        );
    }
}

export default DiscussReply;
