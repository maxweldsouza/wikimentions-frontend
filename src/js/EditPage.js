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
var Dropzone = require('react-dropzone');
var Snackbar = require('./Snackbar');
var Restricted = require('./Restricted');

var EditPage = React.createClass({
    statics: {
        resources (appstate) {
            var id = appstate.url.split('/')[1];
            return {
                api: [
                    {
                        name: 'thing',
                        path: '/api/v1/thing/' + id
                    }
                ]
            };
        }
    },
    getInitialState () {
        return {
            type: this.props.data.thing.type,
            title: this.props.data.thing.title,
            description: this.props.data.thing.props.description,
            isbn: this.props.data.thing.props.isbn,
            isbn13: this.props.data.thing.props.isbn13,
            url: this.props.data.thing.props.url,
            submiting: false,
        };
    },
    onChangeType (x) {
        this.setState({
            type: x
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
        var message;
        if (!this.state.title) {
            message = 'You need to provide a title';
        }
        if (message) {
            Snackbar({message: message});
            return false;
        }
        return true;
    },
    onSubmit () {
        var id = Number(this.props.path.split('/')[1]);
        if (!this.validateForm()) {
            return;
        }
        this.setState({
            submiting: true
        });
        requests
        .post('/api/v1/thing/' + id)
        .type('form')
        .send({
            title: this.state.title,
            description: this.state.description,
            type: this.state.type,
            isbn: this.state.isbn,
            isbn13: this.state.isbn13,
            action: 'update',
            _xsrf: cookies.get('_xsrf')
        })
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
    },
    render () {
        var id = Number(this.props.path.split('/')[1]);
        var entry = this.props.data.thing;
        var options = [{name: 'Person', value: 'person'},
            {name: 'Book', value: 'book'},
            {name: 'Video', value: 'video'}];
        var imageMessage;
        if (this.state.type === 'book') {
            imageMessage = 'Add an image of this book';
        } else if (this.state.type === 'video') {
            imageMessage = 'Add a thumbnail for this video';
        } else if (this.state.type === 'person') {
            imageMessage = 'Add a picture of this person';
        }
        return (
            <span>
                <Helmet
                    title={'Edit - ' + entry.title}
                    titleTemplate={'%s - ' + config.name}
                    meta={[
                        {'name': 'description', 'content': ''}
                    ]}
                    link={[
                        {'rel': 'canonical', 'href': config.url + this.props.path}
                    ]}
                    />
                <Navbar/>
                <div className='row page-body align-center'>
                    <div className='small-12 large-8 columns'>
                        <h1 className='page-title'>{'Edit - ' + entry.title}</h1>
                            <PageBar
                                id={id}
                                slug={entry.slug}
                                type={entry.type}
                                />
                            <Restricted>
                                <form action={'/api/v1/thing/' + id} method='post'>
                                    <input
                                        type='text'
                                        name='title'
                                        placeholder='Title'
                                        value={this.state.title} onChange={this.onChangeText}
                                        required/>
                                    <input
                                        type='text'
                                        name='description'
                                        placeholder='Description (Optional)'
                                        value={this.state.description}
                                        onChange={this.onChangeText}/>
                                    <ButtonSelect
                                        name='type'
                                        default={this.props.data.thing.type}
                                        options={options}
                                        onChange={this.onChangeType}/>
                                    {this.state.type === 'book' ? <input
                                        type='text'
                                        name='isbn'
                                        placeholder='ISBN'
                                        value={this.state.isbn}
                                        onChange={this.onChangeText}/> : null}
                                    {this.state.type === 'book' ? <input
                                        type='text'
                                        name='isbn13'
                                        placeholder='ISBN-13'
                                        value={this.state.isbn13}
                                        onChange={this.onChangeText}/> : null}
                                    {this.state.type === 'video' ? <input type='text' name='url' placeholder='Url' value={this.state.url} onChange={this.onChangeText}/> : null}
                                    <Dropzone>
                                        {imageMessage}
                                    </Dropzone>
                                    <SubmitButton
                                        title='Save'
                                        submitting={this.state.submitting}
                                        onSubmit={this.onSubmit}/>
                                    <hr />
                                    <div className='button-group small'>
                                        <button className='button warning'>Report</button>
                                        <button className='button alert'>Delete Page</button>
                                    </div>
                                </form>
                            </Restricted>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = EditPage;
