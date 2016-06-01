var React = require('react');
var Notification = require('./Notification');
var SubmitButton = require('./SubmitButton');
var cookies = require('browser-cookies');
var requests = require('superagent');

var AddVideoNew = React.createClass({
    getInitialState () {
        return {
            title: '',
            url: '',
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
    onSubmit () {
        this.setState({
            submitting: true
        });
        requests
        .post('/api/v1/thing')
        .type('form')
        .send({
            title: this.state.title,
            url: this.state.url,
            type: 'video',
            action: 'create',
            _xsrf: cookies.get('_xsrf')
        })
        .end((err, res) => {
            if (err && err.status) {
                this.setState({
                    error: true,
                    message: res.body.message
                });
            } else {
                requests
                .post('/api/v1/thing/' + this.props.id + '/videos')
                .type('form')
                .send({
                    video_id: res.video_id,
                    _xsrf: cookies.get('_xsrf')
                })
                .end((err, res) => {
                    this.setState({
                        submitting: false,
                        title: '',
                        description: ''
                    });
                    if (err && err.status) {
                        this.setState({
                            error: true,
                            message: res.body.message
                        });
                    } else {
                        history.pushState(null, null, window.location.pathname + window.location.search);
                        Mentions.route(window.location.pathname + window.location.search);
                    }
                });
            }
        });
    },
    render () {
        return (
            <form method='post' action={'/api/v1/thing/' + this.props.id + '/books'}>
                <Notification level='alert' message={this.state.message} showing={this.state.error} onClose={this.onCloseError} closeable/>
                <input type='text' name='title' placeholder='Title' value={this.state.title} onChange={this.onChangeText} required/>
                <input type='text' name='url' placeholder='Url' value={this.state.url} onChange={this.onChangeText}/>
                <SubmitButton title='Create' submitting={this.state.submitting} onSubmit={this.onSubmit}/>
            </form>
        );
    }
});

module.exports = AddVideoNew;