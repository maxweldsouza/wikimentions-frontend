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
            opened: false,
            video_id: '',
            error: false,
            message: '',
            submitting: false
        };
    },
    onOpen () {
        this.setState({
            opened: true
        });
    },
    onClose () {
        this.setState({
            opened: false
        });
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
        requests
        .post('/api/v1/thing/' + this.props.id + '/videos')
        .type('form')
        .send({
            video_id: this.state.video_id,
            _xsrf: cookies.get('_xsrf')
        })
        .end((err, res) => {
            if (!err) {
                Mentions.route(window.location.pathname + window.location.search);
            }
        });
    },
    render () {
        var id = this.props.id;
        var result;
        if (this.state.opened) {
            result = <div className='small-12 columns'>
                <Notification level='alert' message={this.state.message} showing={this.state.error} onClose={this.onCloseError} closeable/>
                <Select name='video_id' placeholder='Search for video' onSelectValue={this.onSelect}/>
                <SubmitButton title='Create' submitting={this.state.submitting} onSubmit={this.onSubmit}/>
            </div>;
        } else {
            result = <div className='small-12 columns'>
                <button onClick={this.onOpen} className='button'>Add</button>
            </div>;
        }
        return result;
    }
});

module.exports = AddVideo;
