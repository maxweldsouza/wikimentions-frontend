var React = require('react');

var cookies = require('browser-cookies');
var requests = require('superagent');
var Notification = require('./Notification');
var SubmitButton = require('./SubmitButton');

var DiscussReply = React.createClass({
    getInitialState () {
        return {
            content: '',
            submitting: false,
            error: false,
            message: ''
        };
    },
    onChangeText (e) {
        var temp = {};
        temp[e.target.name] = e.target.value;
        this.setState(temp);
    },
    onCloseError () {
        this.setState({
            error: false,
            message: ''
        });
    },
    validateForm () {
        var message;
        if (!this.state.content) {
            message = 'Your post is empty';
        }
        if (message) {
            this.setState({
                error: true,
                message: message
            });
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
                this.setState({
                    error: true,
                    message: res.body.message
                });
            } else {
                Mentions.route(window.location.pathname + window.location.search);
            }
        });
    },
    render () {
        return (
            <div className='discuss-reply small-12 columns'>
                <form action={'/api/v1/discuss/' + this.props.id} method='post'>
                    <div className='row'>
                        <div className='small-12 columns'>
                            <Notification level='alert' message={this.state.message} showing={this.state.error} onClose={this.onCloseError} closeable/>
                            <textarea type='text' name='content' placeholder='Write your post  here (Markdown is supported)' value={this.state.content} onChange={this.onChangeText} rows='5'></textarea>
                        </div>
                        <div className='small-12 columns'>
                            <SubmitButton title='Create' submitting={this.state.submitting} onSubmit={this.onSubmit}/>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
});

module.exports = DiscussReply;
