var React = require('react');
var cookies = require('browser-cookies');
var requests = require('superagent');
var Select = require('./Select');
var Notification = require('./Notification');
var SubmitButton = require('./SubmitButton');

var AddBookExisting = React.createClass({
    getInitialState: function() {
        return {
            book_id: '',
            error: false,
            message: '',
            submitting: false
        };
    },
    onSelect (x) {
        this.setState({
            book_id: x.id
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
        .post('/api/v1/thing/' + this.props.id + '/books')
        .type('form')
        .send({
            book_id: this.state.book_id,
            _xsrf: cookies.get('_xsrf')
        })
        .end((err, res) => {
            this.setState({
                submitting: false
            });
            if (err.status) {
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
            <form action={'/api/v1/thing/' + this.props.id + '/books'} method='post'>
                <Notification level='alert' message={this.state.message} showing={this.state.error} onClose={this.onCloseError} closeable/>
                Search for the title of a book to add
                <Select name='book_id' placeholder='Search for book' onSelectValue={this.onSelect}/>
                <SubmitButton title='Create' submitting={this.state.submitting} onSubmit={this.onSubmit}/>
            </form>
        );
    }
});

module.exports = AddBookExisting;
