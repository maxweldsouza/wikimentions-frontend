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
            submitting: false
        };
    },
    onChangeText (e) {
        var temp = {};
        temp[e.target.name] = e.target.value;
        this.setState(temp);
    },
    validateForm () {
        var message;
        if (!this.state.content) {
            message = 'Your post is empty';
        }
        if (message) {
            Snackbar({message: message});
            return false;
        }
        return true;
    },
    onSubmit () {
        if (!this.validateForm()) {
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
                Snackbar({message: res.body.message});
            } else {
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
                    Post <MarkdownHelp />
                    <textarea type='text' name='content' placeholder='Write your post  here (Markdown is supported)' value={this.state.content} onChange={this.onChangeText} rows='5'></textarea>
                    {this.state.content.length > 0 ? <div>
                        <strong>Preview</strong>
                        <Markdown
                            markdown={this.state.content}
                            />
                    </div> : null}
                    <SubmitButton title='Submit' className='button primary float-right' submitting={this.state.submitting} onSubmit={this.onSubmit}/>
                    </Restricted>
                </div>
            </div>
        );
    }
});

module.exports = DiscussReply;
