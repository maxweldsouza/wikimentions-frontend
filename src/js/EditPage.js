import AdminOnly from './AdminOnly';
import ButtonSelect from './ButtonSelect';
import config from './config';
import cookies from 'browser-cookies';
import Helmet from 'react-helmet';
import ImageUpload from './ImageUpload';
import Input from './Input';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import Modal from './Modal';
import Navbar from './Navbar';
import PageBar from './PageBar';
import queryString from 'query-string';
import React from 'react';
import requests from 'superagent';
import Restricted from './Restricted';
import snackbar from './snackbar';
import SubmitButton from './SubmitButton';
import autoBind from 'react-autobind';

class EditPage extends React.Component {
    static resources(appstate) {
        const [type, id, slug] = appstate.path.split('/');
        const queryObj = {};
        if (appstate.query.page) {
            queryObj.page = appstate.query.page;
        }
        queryObj.slug = slug;
        let query = queryString.stringify(queryObj);
        query = query ? `?${query}` : '';
        return {
            api: [
                {
                    name: 'thing',
                    path: `/api/v1/thing/${id}${query}`
                }
            ]
        };
    }
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            type: this.props.data.thing.props.type,
            title: this.props.data.thing.props.title,
            titleValid: true,
            titleMessage: '',
            description: this.props.data.thing.props.description,
            isbn: this.props.data.thing.props.isbn,
            isbn13: this.props.data.thing.props.isbn13,
            url: this.props.data.thing.props.url,
            urlValid: true,
            urlMessage: '',
            submitting: false,
            formMessage: '',
            confirmDelete: false,
            modalIsOpen: false
        };
    }
    onChangeType(x) {
        this.setState({
            type: x
        });
    }
    onToggleConfirm() {
        this.setState({
            confirmDelete: !this.state.confirmDelete
        });
    }
    onChangeText(e) {
        const temp = {
            error: false,
            message: ''
        };
        temp[e.target.name] = e.target.value;
        this.setState(temp);
    }
    onClear(name) {
        const temp = {};
        temp[name] = '';
        this.setState(temp);
    }
    validateForm() {
        let valid = true;
        if (!this.state.title) {
            this.setState({
                titleValid: false,
                titleMessage: 'Title cannot be empty'
            });
            valid = false;
        }
        if (this.state.type === 'video' && !this.state.url) {
            this.setState({
                urlValid: false,
                urlMessage: 'Url cannot be empty'
            });
            valid = false;
        }
        return valid;
    }
    onSubmit(e) {
        e.preventDefault();
        const id = Number(this.props.path.split('/')[1]);
        if (this.validateForm()) {
            this.setState({
                submitting: true,
                formMessage: ''
            });
            const data = {
                title: this.state.title,
                description: this.state.description,
                type: this.state.type,
                _xsrf: cookies.get('_xsrf')
            };
            if (this.state.type === 'book') {
                data.isbn = this.state.isbn;
                data.isbn13 = this.state.isbn13;
            } else if (
                this.state.type === 'video' || this.state.type === 'person'
            ) {
                data.url = this.state.url;
            }
            requests
                .put(`/api/v1/thing/${id}`)
                .type('form')
                .send(data)
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
                        snackbar({ message: 'Changes saved' });
                        history.pushState(null, null, res.body.redirect);
                        Mentions.route(res.body.redirect);
                    }
                });
        }
    }
    onDeletePage(e) {
        e.preventDefault();
        const id = Number(this.props.path.split('/')[1]);
        this.setState({
            submitting: true
        });
        const data = {
            _xsrf: cookies.get('_xsrf')
        };
        requests
            .delete(`/api/v1/thing/${id}`)
            .type('form')
            .send(data)
            .end((err, res) => {
                this.setState({
                    submitting: false
                });
                if (err && err.status) {
                    snackbar({ message: res.body.message });
                } else {
                    snackbar({ message: 'Page deleted' });
                    history.pushState(null, null, res.body.redirect);
                    Mentions.route(res.body.redirect);
                }
            });
    }
    onOpenModal(e) {
        this.setState({
            modalIsOpen: true
        });
        e.preventDefault();
    }
    onCloseModal() {
        this.setState({ modalIsOpen: false });
    }
    render() {
        const id = Number(this.props.path.split('/')[1]);
        const entry = this.props.data.thing;
        const options = [
            { name: 'Person', value: 'person' },
            { name: 'Book', value: 'book' },
            { name: 'Video', value: 'video' }
        ];
        const loggedOutMessage = (
            <span>
                You need to <LoginModal /> / <SignupModal /> to edit a page.
            </span>
        );
        return (
            <span>
                <Helmet
                    title={`Edit - ${entry.props.title}`}
                    titleTemplate={`%s - ${config.name}`}
                    meta={[{ name: 'robots', content: 'noindex' }]}
                    link={[
                        { rel: 'canonical', href: config.url + this.props.path }
                    ]}
                />
                <Navbar
                    loggedin={this.props.loggedin}
                    username={this.props.username}
                    userid={this.props.userid}
                    toggleSidebar={this.props.toggleSidebar}
                />
                <div className="row page-body white">
                    <div className="small-12 large-8 columns">
                        <h1>{`Edit - ${entry.props.title}`}</h1>
                        <PageBar
                            id={id}
                            slug={entry.props.slug}
                            type={entry.props.type}
                        />
                        <Restricted
                            message={loggedOutMessage}
                            min_level={1}
                            loggedin={this.props.loggedin}
                        >
                            <div className="callout">
                                <a onClick={this.onOpenModal}>
                                    Upload
                                </a> an image for this page.
                            </div>
                            <Modal
                                isOpen={this.state.modalIsOpen}
                                onClose={this.onCloseModal}
                                className="modal-content"
                                overlayClassName="modal-overlay"
                            >
                                <ImageUpload
                                    title={entry.props.title}
                                    type={entry.props.type}
                                    id={id}
                                    width={250}
                                    height={250}
                                    onClose={this.onCloseModal}
                                />
                            </Modal>
                            <form onSubmit={this.onSubmit}>
                                {this.state.formMessage
                                    ? <div className="callout alert">
                                          {this.state.formMessage}
                                      </div>
                                    : null}
                                Type
                                <ButtonSelect
                                    name="type"
                                    default={this.props.data.thing.props.type}
                                    options={options}
                                    onChange={this.onChangeType}
                                />
                                Title
                                <Input
                                    type="text"
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.onChangeText}
                                    onClear={this.onClear}
                                    valid={this.state.titleValid}
                                    message={this.state.titleMessage}
                                />
                                {this.state.type === 'video'
                                    ? <span>
                                          Url
                                          <Input
                                              type="text"
                                              name="url"
                                              value={this.state.url}
                                              onChange={this.onChangeText}
                                              onClear={this.onClear}
                                              valid={this.state.urlValid}
                                              message={this.state.urlMessage}
                                          />
                                      </span>
                                    : null}
                                {this.state.type === 'person'
                                    ? <span>
                                          Description (Optional)
                                          <Input
                                              type="text"
                                              name="description"
                                              value={this.state.description}
                                              onChange={this.onChangeText}
                                              onClear={this.onClear}
                                          />
                                      </span>
                                    : null}
                                {this.state.type === 'person'
                                    ? <span>
                                          Url (Optional)
                                          <Input
                                              type="text"
                                              name="url"
                                              value={this.state.url}
                                              onChange={this.onChangeText}
                                              onClear={this.onClear}
                                              valid={this.state.urlValid}
                                              placeholder="http://"
                                              message={this.state.urlMessage}
                                          />
                                      </span>
                                    : null}
                                {this.state.type === 'book'
                                    ? <span>
                                          ISBN
                                          <Input
                                              type="text"
                                              name="isbn"
                                              value={this.state.isbn}
                                              onChange={this.onChangeText}
                                              onClear={this.onClear}
                                          />
                                      </span>
                                    : null}
                                {this.state.type === 'book'
                                    ? <span>
                                          ISBN-13
                                          <Input
                                              type="text"
                                              name="isbn13"
                                              value={this.state.isbn13}
                                              onChange={this.onChangeText}
                                              onClear={this.onClear}
                                          />
                                      </span>
                                    : null}
                                <SubmitButton
                                    title="Save"
                                    className="button primary float-right"
                                    submitting={this.state.submitting}
                                />
                            </form>
                            <AdminOnly>
                                <form onSubmit={this.onDeletePage}>
                                    <hr />
                                    <div className="row align-middle">
                                        <div className="small-6 columns">
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    onChange={
                                                        this.onToggleConfirm
                                                    }
                                                    onClear={this.onClear}
                                                />
                                                I'm sure
                                            </label>
                                        </div>
                                        <div className="small-6 columns">
                                            <SubmitButton
                                                title="Delete Page"
                                                className="button primary float-right"
                                                confirm={
                                                    this.state.confirmDelete
                                                }
                                                submitting={
                                                    this.state.submitting
                                                }
                                            />
                                        </div>
                                    </div>
                                </form>
                            </AdminOnly>
                        </Restricted>
                    </div>
                </div>
            </span>
        );
    }
}

export default EditPage;
