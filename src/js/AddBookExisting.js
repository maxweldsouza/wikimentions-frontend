var React = require('react');
var cookies = require('browser-cookies');
var requests = require('superagent');
var Select = require('./Select');
var Snackbar = require('./Snackbar');
var SubmitButton = require('./SubmitButton');
var IpWarning = require('./IpWarning');

var AddBookExisting = React.createClass({
    getInitialState () {
        return {
            book_id: '',
            submitting: false,
            bookValid: true,
            bookMessage: '',
            formMessage: ''
        };
    },
    onSelect (x) {
        this.setState({
            book_id: x.id
        });
    },
    validateForm () {
        var valid = true;
        if (!this.state.book_id) {
            this.setState({
                bookValid: false,
                bookMessage: 'No book selected'
            });
            valid = false;
        } else {
            this.setState({
                bookValid: true,
                bookMessage: ''
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
                    this.setState({
                        formMessage: res.body.message
                    });
                } else {
                    this.setState({
                        formMessage: ''
                    });
                    Snackbar({message: 'Book added'});
                    history.pushState(null, null, window.location.pathname + window.location.search);
                    Mentions.route(window.location.pathname + window.location.search);
                }
            });
        }
    },
    render () {
        return (
            <form action={'/api/v1/thing/' + this.props.id + '/books'} method='post'>
                {this.state.formMessage ? <div className='callout alert'>
                    {this.state.formMessage}
                </div> : null}
                Search for a book
                <Select
                    name='book_id'
                    onSelectValue={this.onSelect}
                    types={['book']}
                    valid={this.state.bookValid}
                    message={this.state.bookMessage}
                    placeholder='Book Title'/>
                <IpWarning loggedin={this.props.loggedin}/>
                <SubmitButton title='Add' className='button primary float-right' submitting={this.state.submitting} onSubmit={this.onSubmit}/>
            </form>
        );
    }
});

module.exports = AddBookExisting;
