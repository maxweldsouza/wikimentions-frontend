var React = require('react');
var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Mention = require('./Mention');
var _ = require('underscore');
var cookies = require('browser-cookies');
var ButtonSelect = require('./ButtonSelect');
var SubmitButton = require('./SubmitButton');
var requests = require('superagent');
var PageBar = require('./PageBar');
var config = require('./config');
var Snackbar = require('./Snackbar');
var Restricted = require('./Restricted');
var Input = require('./Input');
var LoginModal = require('./LoginModal');
var Footer = require('./Footer');
var queryString = require('query-string');
var Modal = require('./Modal');
var ImageUpload = require('./ImageUpload');
var Markdown = require('./Markdown');

var EditPage = React.createClass({
    statics: {
        resources (appstate) {
            var [type, id, slug] = appstate.path.split('/');
            var queryObj = {};
            if (appstate.query.page) {
                queryObj.page = appstate.query.page;
            }
            queryObj.slug = slug;
            var query = queryString.stringify(queryObj);
            query = query ? '?' + query : '';
            return {
                api: [
                    {
                        name: 'thing',
                        path: '/api/v1/thing/' + id + query
                    }
                ]
            };
        }
    },
    getInitialState () {
        return {
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
            submiting: false,
            confirmDelete: false,
            modalIsOpen: false
        };
    },
    onChangeType (x) {
        this.setState({
            type: x
        });
    },
    onToggleConfirm () {
        this.setState({
            confirmDelete: !this.state.confirmDelete
        });
    },
    onChangeText (e) {
        var temp = {
            error: false,
            message: ''
        };
        temp[e.target.name] = e.target.value;
        this.setState(temp);
    },
    validateForm () {
        var valid = true;
        var message;
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
    },
    onSubmit () {
        var id = Number(this.props.path.split('/')[1]);
        if (this.validateForm()) {
            this.setState({
                submiting: true
            });
            var data = {
                title: this.state.title,
                description: this.state.description,
                type: this.state.type,
                action: 'update',
                _xsrf: cookies.get('_xsrf')
            };
            if (this.state.type === 'book') {
                data.isbn = this.state.isbn;
                data.isbn13 = this.state.isbn13;
            } else if (this.state.type === 'video') {
                data.url = this.state.url;
            }
            requests
            .post('/api/v1/thing/' + id)
            .type('form')
            .send(data)
            .end((err, res) => {
                this.setState({
                    submiting: false
                });
                if (err && err.status) {
                    Snackbar({message: res.body.message});
                } else {
                    Snackbar({message: 'Changes saved'});
                    history.pushState(null, null, res.body.redirect);
                    Mentions.route(res.body.redirect);
                }
            });
        }
    },
    onDeletePage () {
        var id = Number(this.props.path.split('/')[1]);
        this.setState({
            submiting: true
        });
        var data = {
            action: 'delete',
            _xsrf: cookies.get('_xsrf')
        };
        requests
        .post('/api/v1/thing/' + id)
        .type('form')
        .send(data)
        .end((err, res) => {
            this.setState({
                submiting: false
            });
            if (err && err.status) {
                Snackbar({message: res.body.message});
            } else {
                Snackbar({message: 'Page deleted'});
                history.pushState(null, null, res.body.redirect);
                Mentions.route(res.body.redirect);
            }
        });
    },
    onOpenModal (e) {
        this.setState({
            modalIsOpen: true
        });
        e.preventDefault();
    },
    onCloseModal () {
        this.setState({modalIsOpen: false});
    },
    render () {
        var id = Number(this.props.path.split('/')[1]);
        var entry = this.props.data.thing;
        var options = [{name: 'Person', value: 'person'},
            {name: 'Book', value: 'book'},
            {name: 'Video', value: 'video'}];
        var loggedOutMessage = <span>You need to <LoginModal/> to edit a page.</span>;
        return (
            <span>
                <Helmet
                    title={'Edit - ' + entry.props.title}
                    titleTemplate={'%s - ' + config.name}
                    meta={[
                        {'name': 'robots', 'content': 'noindex'}
                    ]}
                    link={[
                        {'rel': 'canonical', 'href': config.url + this.props.path}
                    ]}
                    />
                <Navbar
                    loggedin={this.props.loggedin}
                    username={this.props.username}
                    userid={this.props.userid}
                    toggleSidebar={this.props.toggleSidebar}/>
                <div className='row page-body align-center'>
                    <div className='small-12 large-8 columns'>
                        <h1>{'Edit - ' + entry.props.title}</h1>
                        <PageBar
                            id={id}
                            slug={entry.props.slug}
                            type={entry.props.type}
                            />
                        <Restricted message={loggedOutMessage}>
                            <div className='callout'>
                                <a onClick={this.onOpenModal}>Upload</a> an image for this page.
                            </div>
                            <Modal
                                isOpen={this.state.modalIsOpen}
                                onClose={this.onCloseModal}
                                className='modal-content'
                                overlayClassName='modal-overlay'>
                                <div className='small-12 columns'>
                                    <ImageUpload
                                        title={entry.props.title}
                                        type={entry.props.type}
                                        id={id}
                                        width={250}
                                        height={250}
                                        onClose={this.onCloseModal}/>
                                </div>
                            </Modal>
                            <form action={'/api/v1/thing/' + id} method='post'>
                                <ButtonSelect
                                    name='type'
                                    default={this.props.data.thing.props.type}
                                    options={options}
                                    onChange={this.onChangeType}/>
                                Title
                                <Input
                                    type='text'
                                    name='title'
                                    value={this.state.title} onChange={this.onChangeText}
                                    valid={this.state.titleValid}
                                    message={this.state.titleMessage}/>
                                {this.state.type === 'video' ? <span>
                                    Url
                                    <Input type='text' name='url' placeholder='Url' value={this.state.url} onChange={this.onChangeText} valid={this.state.urlValid}
                                message={this.state.urlMessage}/>
                                </span> : null}
                                {this.state.type === 'person' ? <span>
                                    Description (Optional)
                                    <input
                                        type='text'
                                        name='description'
                                        value={this.state.description}
                                        onChange={this.onChangeText}/>
                                </span> : null}
                                {this.state.type === 'book' ? <span>
                                    ISBN
                                    <input
                                    type='text'
                                    name='isbn'
                                    value={this.state.isbn}
                                    onChange={this.onChangeText}/>
                                </span> : null}
                                {this.state.type === 'book' ? <span>
                                    ISBN-13
                                    <input
                                    type='text'
                                    name='isbn13'
                                    value={this.state.isbn13}
                                    onChange={this.onChangeText}/>
                                </span> : null}
                                <SubmitButton
                                    title='Save'
                                    submitting={this.state.submitting}
                                    onSubmit={this.onSubmit}/>
                            </form>
                            <hr/>
                            <label><input type="checkbox" onChange={this.onToggleConfirm}/>I'm sure</label>
                            <SubmitButton
                                title='Delete Page'
                                confirm={this.state.confirmDelete}
                                submitting={this.state.submitting}
                                onSubmit={this.onDeletePage}/>
                        </Restricted>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = EditPage;
