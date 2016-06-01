var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var cookies = require('browser-cookies');
var requests = require('superagent');
var Select = require('./Select');
var Notification = require('./Notification');
var SubmitButton = require('./SubmitButton');

var AddVideo = React.createClass({
    getInitialState () {
        return {
            video_id: '',
            error: false,
            message: '',
            submitting: false
        };
    },
    onSelect (x) {
        this.setState({
            video_id: x.id
        });
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
        .post('/api/v1/thing/' + this.props.id + '/videos')
        .type('form')
        .send({
            video_id: this.state.video_id,
            _xsrf: cookies.get('_xsrf')
        })
        .end((err, res) => {
            this.setState({
                submitting: false
            });
            if (err && err.status) {
                this.setState({
                    error: true,
                    video_id: '',
                    message: res.body.message
                });
            } else {
                history.pushState(null, null, window.location.pathname + window.location.search);
                Mentions.route(window.location.pathname + window.location.search);
            }
        });
    },
    render () {
        var id = this.props.id;
        return <div>
            <Notification level='alert' message={this.state.message} showing={this.state.error} onClose={this.onCloseError} closeable/>
            <Select name='video_id' placeholder='Search for video' onSelectValue={this.onSelect}/>
            <SubmitButton title='Create' submitting={this.state.submitting} onSubmit={this.onSubmit}/>
        </div>;
    }
});

module.exports = AddVideo;
