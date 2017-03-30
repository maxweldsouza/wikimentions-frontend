import React from 'react';
import cookies from 'browser-cookies';
import snackbar from './snackbar';
import requests from 'superagent';
import Select from './Select';
import SubmitButton from './SubmitButton';
import AuthorCard from './AuthorCard';
import Modal from './Modal';
import autoBind from 'react-autobind';

class AddAuthors extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            modalIsOpen: false,
            author: '',
            submitting: false,
            authorValid: true,
            authorMessage: '',
            formMessage: ''
        };
    }
    onOpenModal(e) {
        this.setState({
            modalIsOpen: true
        });
        e.preventDefault();
    }
    onCloseModal() {
        this.setState({
            modalIsOpen: false
        });
    }
    onChangeAuthor(x) {
        this.setState({
            author: x.id
        });
    }
    validateForm() {
        let valid = true;
        if (!this.state.author) {
            this.setState({
                authorValid: false,
                authorMessage: 'No author selected'
            });
            valid = false;
        } else {
            this.setState({
                authorValid: true,
                authorMessage: ''
            });
        }
        return valid;
    }
    onSubmit(e) {
        e.preventDefault();
        if (this.validateForm()) {
            let type;
            if (this.props.type === 'book') {
                type = 'booksby';
            } else if (this.props.type === 'video') {
                type = 'videosby';
            }
            requests
                .post(`/api/v1/thing/${this.props.id}/${type}`)
                .type('form')
                .send({
                    author_id: this.state.author,
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
                            formMessage: '',
                            modalIsOpen: false
                        });
                        snackbar({ message: 'Added author' });
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
        if (this.state.modalIsOpen) {
            return (
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onClose={this.onCloseModal}
                    className="modal-content modal-small"
                    overlayClassName="modal-overlay"
                >
                    <div>
                        <h1>Edit Authors</h1>
                        {this.state.formMessage
                            ? <div className="callout alert">
                                  {this.state.formMessage}
                              </div>
                            : null}
                        <div className="card-container">
                            {this.props.authors.map(x => {
                                return (
                                    <AuthorCard
                                        key={x.id}
                                        id={x.id}
                                        slug={x.props.slug}
                                        title={x.props.title}
                                        type={x.props.type}
                                        description={x.props.description}
                                        image={x.image}
                                        sourceType={this.props.type}
                                        sourceId={this.props.id}
                                    />
                                );
                            })}
                        </div>
                        <form className="box" onSubmit={this.onSubmit}>
                            Add Author
                            <Select
                                name="author"
                                onSelectValue={this.onChangeAuthor}
                                valid={this.state.authorValid}
                                message={this.state.authorMessage}
                                types={['person']}
                            />
                            <div className="button-group float-right">
                                <SubmitButton
                                    title="Add"
                                    className="button primary"
                                    submitting={this.state.submitting}
                                />
                            </div>
                        </form>
                    </div>
                </Modal>
            );
        }
        return (
            <span className="edit-links">
                {' '}
                <a className="secondary" onClick={this.onOpenModal}>
                    Edit Authors
                </a>
            </span>
        );
    }
}

export default AddAuthors;
