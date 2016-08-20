var React = require('react');
var Snackbar = require('./Snackbar');
var SubmitButton = require('./SubmitButton');
var cookies = require('browser-cookies');
var requests = require('superagent');
var Input = require('./Input');

var AddVideoNew = React.createClass({
    getInitialState () {
        return {
            title: '',
            url: '',
            titleValid: true,
            urlValid: true,
            titleMessage: '',
            urlMessage: ''
        };
    },
    onChangeText (e) {
        var temp = {};
        temp[e.target.name] = e.target.value;
        this.setState(temp);
    },
    onClear (name) {
        var temp = {};
        temp[name] = '';
        this.setState(temp);
    },
    validateForm () {
        var valid = true;
        if (!this.state.title) {
            this.setState({
                titleValid: false,
                titleMessage: 'Title cannot be empty'
            });
            valid = false;
        } else {
            this.setState({
                titleValid: true,
                titleMessage: ''
            });
        }
        if (!this.state.url) {
            this.setState({
                urlValid: false,
                urlMessage: 'Url cannot be empty'
            });
            valid = false;
        } else {
            this.setState({
                urlValid: true,
                urlMessage: ''
            });
        }
        return valid;
    },
    onSubmit () {
        if (this.validateForm()) {
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
                _xsrf: cookies.get('_xsrf')
            })
            .end((err, res) => {
                if (err && err.status) {
                    this.setState({
                        formMessage: res.body.message
                    });
                } else {
                    requests
                    .post('/api/v1/thing/' + this.props.id + '/videos')
                    .type('form')
                    .send({
                        video_id: res.body.id,
                        _xsrf: cookies.get('_xsrf')
                    })
                    .end((err2, res2) => {
                        this.setState({
                            submitting: false,
                            title: '',
                            url: ''
                        });
                        if (err2 && err2.status) {
                            this.setState({
                                formMessage: res2.body.message
                            });
                        } else {
                            this.setState({
                                formMessage: ''
                            });
                            Snackbar({message: 'Video added'});
                            history.pushState(null, null, window.location.pathname + window.location.search);
                            Mentions.route(window.location.pathname + window.location.search);
                        }
                    });
                }
            });
        }
    },
    render () {
        return (
            <form method='post' action={'/api/v1/thing/' + this.props.id + '/books'}>
                Title
                <Input
                    type='text'
                    name='title'
                    value={this.state.title}
                    onChange={this.onChangeText}
                    onClear={this.onClear}
                    valid={this.state.titleValid}
                    message={this.state.titleMessage}/>
                Url
                <Input
                    type='text'
                    name='url'
                    value={this.state.url}
                    onChange={this.onChangeText}
                    onClear={this.onClear}
                    valid={this.state.urlValid}
                    placeholder='http://'
                    message={this.state.urlMessage} />
                <SubmitButton
                    title='Create'
                    className='button primary float-right'
                    submitting={this.state.submitting}
                    onSubmit={this.onSubmit}/>
            </form>
        );
    }
});

module.exports = AddVideoNew;
