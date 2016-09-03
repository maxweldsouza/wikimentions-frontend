var React = require('react');
var ButtonSelect = require('./ButtonSelect');
var cookies = require('browser-cookies');
var Snackbar = require('./Snackbar');
var requests = require('superagent');
var Select = require('./Select');
var SubmitButton = require('./SubmitButton');
var AuthorCard = require('./AuthorCard');
var VelocityTransitionGroup = require('velocity-react').VelocityTransitionGroup;
var Modal = require('./Modal');

var AddAuthors = React.createClass({
    getInitialState () {
        return {
            modalIsOpen: false,
            author: '',
            submitting: false,
            authorValid: true,
            authorMessage: '',
            formMessage: ''
        };
    },
    onOpenModal (e) {
        this.setState({
            modalIsOpen: true
        });
        e.preventDefault();
    },
    onCloseModal () {
        this.setState({
            modalIsOpen: false
        });
    },
    onChangeAuthor (x) {
        this.setState({
            author: x.id
        });
    },
    validateForm () {
        var valid = true;
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
    },
    onSubmit (e) {
        e.preventDefault();
        if (this.validateForm()) {
            var type;
            if (this.props.type === 'book') {
                type = '/booksby';
            } else if (this.props.type === 'video') {
                type = '/videosby';
            }
            requests
            .post('/api/v1/thing/' + this.props.id + type)
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
                    Snackbar({message: 'Added author'});
                    history.pushState(null, null, window.location.pathname + window.location.search);
                    Mentions.route(window.location.pathname + window.location.search);
                }
            });
        }
    },
    render () {
        var id = this.props.id;
        if (this.state.modalIsOpen) {
            return (
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onClose={this.onCloseModal}
                    className='modal-content modal-small'
                    overlayClassName='modal-overlay'>
                    <form>
                        <h1>Edit Authors</h1>
                        {this.state.formMessage ? <div className='callout alert'>
                            {this.state.formMessage}
                        </div> : null}
                        <div className='card-container'>
                            {this.props.authors.map((x) => {
                                return <AuthorCard key={x.id} id={x.id} slug={x.props.slug} title={x.props.title} type={x.props.type} description={x.props.description} image={x.image} sourceType={this.props.type} sourceId={this.props.id}/>;
                            })}
                        </div>
                        <div className='box'>
                            Add Author
                            <Select name='author'
                                onSelectValue={this.onChangeAuthor}
                                valid={this.state.authorValid}
                                message={this.state.authorMessage}
                                types={['person']}/>
                            <div className='button-group float-right'>
                                <SubmitButton
                                title='Add'
                                className='button primary'
                                submitting={this.state.submitting}
                                onSubmit={this.onSubmit}/>
                            </div>
                        </div>
                    </form>
                </Modal>
            );
        }
        return (
            <span className='edit-links'>{' '}
                <a className='secondary' onClick={this.onOpenModal}>Edit Authors</a>
            </span>
        );
    }
});

module.exports = AddAuthors;
