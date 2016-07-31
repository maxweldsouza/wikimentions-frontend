var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var cookies = require('browser-cookies');
var requests = require('superagent');
var Select = require('./Select');
var Snackbar = require('./Snackbar');
var SubmitButton = require('./SubmitButton');

var AddVideo = React.createClass({
    getInitialState () {
        return {
            video_id: '',
            submitting: false
        };
    },
    onSelect (x) {
        this.setState({
            video_id: x.id
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
                Snackbar({message: res.body.message});
            } else {
                Snackbar({message: 'Video added'});
                history.pushState(null, null, window.location.pathname + window.location.search);
                Mentions.route(window.location.pathname + window.location.search);
            }
        });
    },
    render () {
        var id = this.props.id;
        return <div>
            Search for video
            <Select name='video_id' onSelectValue={this.onSelect} types={['video']}/>
            <SubmitButton title='Add' submitting={this.state.submitting} onSubmit={this.onSubmit}/>
        </div>;
    }
});

module.exports = AddVideo;
