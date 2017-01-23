import React from 'react';
import Modal from './Modal';
import requests from 'superagent';
import SubmitButton from './SubmitButton';
import cookies from 'browser-cookies';
import Snackbar from './Snackbar';

const allTags = ['Science', 'Startups', 'Programming'];

class EditTags extends React.Component {
    getDefaultProps () {
        return {
            tags: []
        };
    }
    getInitialState () {
        return {
            modalIsOpen: false,
            submitting: false,
            formMessage: '',
            tag: ''
        };
    }
    onOpenModal () {
        this.setState({
            modalIsOpen: true
        });
    }
    onCloseModal () {
        this.setState({
            modalIsOpen: false
        });
    }
    onRemoveTag (tag) {
        this.setState({
            submitting: true
        });
        requests
        .delete(`/api/v1/tag/${this.props.id}`)
        .type('form')
        .send({
            tag,
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
                Snackbar({message: 'Tag removed'});
                history.pushState(null, null, window.location.pathname + window.location.search);
                Mentions.route(window.location.pathname + window.location.search);
            }
        });
    }
    onAddTag (e) {
        e.preventDefault();
        this.setState({
            submitting: true
        });
        requests
        .post(`/api/v1/tag/${this.props.id}`)
        .type('form')
        .send({
            tag: this.state.tag,
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
                Snackbar({message: 'Tag added'});
                history.pushState(null, null, window.location.pathname + window.location.search);
                Mentions.route(window.location.pathname + window.location.search);
            }
        });
    }
    onChangeTag (e) {
        this.setState({
            tag: e.target.value
        });
    }
    render () {
        return (
            <span>
                <a onClick={this.onOpenModal} className='tag round secondary hint--right hint--rounded hint--no-animate' aria-label='Edit Tags'>
                    <span className='ion-edit'/>
                </a>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onClose={this.onCloseModal}
                    className='modal-content modal-small'
                    overlayClassName='modal-overlay'>
                    <form onSubmit={this.onAddTag}>
                        <h1>Edit Tags</h1>
                        {this.state.formMessage ? <div className='callout alert'>
                            {this.state.formMessage}
                        </div> : null}
                        <p>
                            Tags:
                            {this.props.tags.map((x) => {
                                return <span className='tag round no-margin-bottom' href={`/tags/${x}`} key={x}>
                                    {x} <span onClick={this.onRemoveTag.bind(null, x)} className='ion-close-circled'/>
                                </span>;
                            })}
                        </p>
                        <select onChange={this.onChangeTag} value={this.state.tag}>
                            <option value='' disabled>Add Tag...</option>
                            {allTags.map((x) => {
                                return <option value={x} key={x}>{x}</option>;
                            })}
                        </select>
                        <SubmitButton
                            title='Add'
                            className='button float-right'
                            submitting={this.state.submitting}/>
                    </form>
                </Modal>
            </span>
        );
    }
}

export default EditTags;
