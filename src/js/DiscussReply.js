var React = require('react');

var cookies = require('browser-cookies');
var requests = require('superagent');
var Snackbar = require('./Snackbar');
var SubmitButton = require('./SubmitButton');
var Restricted = require('./Restricted');
var LoginModal = require('./LoginModal');
var SignupModal = require('./SignupModal');
var MarkdownInput = require('./MarkdownInput');

var DiscussReply = React.createClass({
    getInitialState () {
        return {
            content: '',
            submitting: false,
            preview: false,
            formMessage: ''
        };
    },
    onChangeText (e) {
        var temp = {};
        temp[e.target.name] = e.target.value;
        this.setState(temp);
    },
    onSubmit () {
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
        .post('/api/v1/discuss/' + this.props.id)
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
                Snackbar({message: 'Posted'});
                history.pushState(null, null, window.location.pathname + window.location.search);
                Mentions.route(window.location.pathname + window.location.search);
            }
        });
    },
    render () {
        var loggedOutMessage = <span>You need to <LoginModal/> / <SignupModal/> to post a message.</span>;
            return (
                <div className='small-12 columns'>
                    <Restricted message={loggedOutMessage}>
                        {this.state.formMessage ? <div className='callout warning'>
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
                            />
                    <SubmitButton title='Submit' className='button primary float-right' submitting={this.state.submitting} onSubmit={this.onSubmit}/>
                </Restricted>
            </div>
        );
    }
});

module.exports = DiscussReply;
