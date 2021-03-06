import React from 'react';
import cookies from 'browser-cookies';
import requests from 'superagent';
import Select from './Select';
import snackbar from './snackbar';
import SubmitButton from './SubmitButton';
import autoBind from 'react-autobind';

class AddBookExisting extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            book_id: '',
            submitting: false,
            bookValid: true,
            bookMessage: '',
            formMessage: ''
        };
    }
    onSelect(x) {
        this.setState({
            book_id: x.id
        });
    }
    validateForm() {
        let valid = true;
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
    }
    onSubmit(e) {
        e.preventDefault();
        if (this.validateForm()) {
            this.setState({
                submitting: true
            });
            requests
                .post(`/api/v1/thing/${this.props.id}/books`)
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
                        snackbar({ message: 'Book added' });
                        history.pushState(
                            null,
                            null,
                            window.location.pathname + window.location.search
                        );
                        Mentions.route(
                            window.location.pathname + window.location.search
                        );
                    }
                });
        }
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                {this.state.formMessage
                    ? <div className="callout alert">
                          {this.state.formMessage}
                      </div>
                    : null}
                Search for a book
                <Select
                    name="book_id"
                    onSelectValue={this.onSelect}
                    types={['book']}
                    valid={this.state.bookValid}
                    message={this.state.bookMessage}
                    placeholder="Book Title"
                />
                <SubmitButton
                    title="Add"
                    className="button primary float-right"
                    submitting={this.state.submitting}
                />
            </form>
        );
    }
}

export default AddBookExisting;
