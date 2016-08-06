var React = require('react');

var cookies = require('browser-cookies');
var requests = require('superagent');
var Snackbar = require('./Snackbar');
var SubmitButton = require('./SubmitButton');
var Restricted = require('./Restricted');
var LoginModal = require('./LoginModal');
var MarkdownHelp = require('./MarkdownHelp');
var Markdown = require('./Markdown');

var DiscussReply = React.createClass({
    getInitialState () {
        return {
            content: '',
            submitting: false,
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
        var loggedOutMessage = <span>You need to <LoginModal/> to post a message.</span>;
        return (
            <div className='card'>
                <div className='small-12 columns'>
                <Restricted message={loggedOutMessage}>
                    {this.state.formMessage ? <div className='callout warning'>
                        {this.state.formMessage}
                    </div> : null}
                    <div className='row'>
                        <div className={this.state.content.length > 0 ? 'small-12 large-6 columns' : 'small-12 columns'}>
                            Post <MarkdownHelp />
                            <textarea type='text' name='content' placeholder='Write your post  here (Markdown is supported)' value={this.state.content} onChange={this.onChangeText} rows='5'></textarea>
                        </div>
                        {this.state.content.length > 0 ? <div className='small-12 large-6 columns'>
                            <strong>Preview</strong>
                            <Markdown
                                className='callout'
                                markdown={this.state.content}
                                />
                        </div> : null}
                    </div>
                    <SubmitButton title='Submit' className='button primary float-right' submitting={this.state.submitting} onSubmit={this.onSubmit}/>
                    </Restricted>
                </div>
            </div>
        );
    }
});

module.exports = DiscussReply;
