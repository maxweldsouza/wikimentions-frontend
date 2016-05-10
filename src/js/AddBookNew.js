var React = require('react');
var Notification = require('./Notification');
var SubmitButton = require('./SubmitButton');
var cookies = require('browser-cookies');
var requests = require('superagent');

var AddBookNew = React.createClass({
    getInitialState () {
        return {
            title: '',
            description: '',
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
            description: this.state.description,
            type: 'book',
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
                .post('/api/v1/thing/' + this.props.id + '/books')
                .type('form')
                .send({
                    book_id: res.body.id,
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
                <input type='text' name='description' placeholder='Description (Optional)' value={this.state.description} onChange={this.onChangeText}/>
                <SubmitButton title='Create' submitting={this.state.submitting} onSubmit={this.onSubmit}/>
            </form>
        );
    }
});

module.exports = AddBookNew;
