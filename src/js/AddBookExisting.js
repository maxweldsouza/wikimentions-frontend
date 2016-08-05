var React = require('react');
var cookies = require('browser-cookies');
var requests = require('superagent');
var Select = require('./Select');
var Snackbar = require('./Snackbar');
var SubmitButton = require('./SubmitButton');

var AddBookExisting = React.createClass({
    getInitialState () {
        return {
            book_id: '',
            submitting: false
        };
    },
    onSelect (x) {
        this.setState({
            book_id: x.id
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
            if (err && err.status) {
                Snackbar({message: res.body.message});
            } else {
                Snackbar({message: 'Book added'});
                history.pushState(null, null, window.location.pathname + window.location.search);
                Mentions.route(window.location.pathname + window.location.search);
            }
        });
    },
    render () {
        return (
            <form action={'/api/v1/thing/' + this.props.id + '/books'} method='post'>
                Search for a book
                <Select name='book_id' onSelectValue={this.onSelect} types={['book']} placeholder='Book Title'/>
                <SubmitButton title='Add' className='button primary float-right' submitting={this.state.submitting} onSubmit={this.onSubmit}/>
            </form>
        );
    }
});

module.exports = AddBookExisting;
