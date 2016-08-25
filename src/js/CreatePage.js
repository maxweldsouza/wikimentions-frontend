var React = require('react');
var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var cookies = require('browser-cookies');
var ButtonSelect = require('./ButtonSelect');
var Snackbar = require('./Snackbar');
var requests = require('superagent');
var SubmitButton = require('./SubmitButton');
var config = require('./config');
var Restricted = require('./Restricted');
var Input = require('./Input');
var LoginModal = require('./LoginModal');
var SignupModal = require('./SignupModal');

var HomePage = React.createClass({
    statics: {
        resources (appstate) {
            return {
                api: []
            };
        }
    },
    getInitialState () {
        return {
            type: 'person',
            title: '',
            titleValid: true,
            titleMessage: '',
            description: '',
            isbn: '',
            isbn13: '',
            url: '',
            urlValid: true,
            urlMessage: '',
            submitting: false,
            formMessage: ''
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
    onClear (name) {
        var temp = {};
        temp[name] = '';
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
        if (this.validateForm()) {
            this.setState({
                submitting: true
            });
            var data = {
                title: this.state.title,
                description: this.state.description,
                type: this.state.type,
                _xsrf: cookies.get('_xsrf')
            };
            if (this.state.type === 'book') {
                data.isbn = this.state.isbn;
                data.isbn13 = this.state.isbn13;
            } else if (this.state.type === 'video') {
                data.url = this.state.url;
            }
            requests
            .post('/api/v1/thing')
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
                    Snackbar({message: 'Page created'});
                    history.pushState(null, null, res.body.redirect);
                    Mentions.route(res.body.redirect);
                }
            });
        }
    },
    render () {
        var options = [{name: 'Person', value: 'person'},
            {name: 'Book', value: 'book'},
            {name: 'Video', value: 'video'}];
        var loggedOutMessage = <span>You need to <LoginModal/> / <SignupModal/> to create a page.</span>;
        return (
            <span>
                <Helmet
                    title={'Create Page'}
                    titleTemplate={'%s - ' + config.name}
                    meta={[
                        {'name': 'description', 'content': 'Create a new page on WikiMentions'}
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
                <div className='row page-body white'>
                    <div className='small-12 large-8 columns'>
                        <form action='/api/v1/thing' method='post'>
                            <h1>Create Page</h1>
                            {this.state.formMessage ? <div className='callout warning'>
                                {this.state.formMessage}
                            </div> : null}
                            <Restricted message={loggedOutMessage}>
                                <div className='row'>
                                    <div className='small-12 columns'>
                                        Type
                                        <ButtonSelect
                                            name='type'
                                            options={options}
                                            default={'person'}
                                            onChange={this.onChangeType}/>
                                        Title (Name of person, book or video)
                                        <Input type='text'
                                            name='title'
                                            value={this.state.title}
                                            onChange={this.onChangeText}
                                            onClear={this.onClear}
                                            valid={this.state.titleValid}
                                            message={this.state.titleMessage}/>
                                        {this.state.type === 'video' ? <span>
                                            Url
                                            <Input type='text' name='url'
                                            value={this.state.url}
                                            onChange={this.onChangeText}
                                            onClear={this.onClear}
                                            valid={this.state.urlValid}
                                            placeholder='http://'
                                            message={this.state.urlMessage}/></span> : null}
                                        {this.state.type === 'person' ? <span>Description (Optional)
                                            <Input
                                                type='text'
                                                name='description'
                                                value={this.state.description}
                                                onChange={this.onChangeText}
                                                onClear={this.onClear}
                                                />
                                        </span> : null}
                                    </div>
                                </div>
                                <div>
                                    <SubmitButton title='Create' className='button primary float-right' submitting={this.state.submitting} onSubmit={this.onSubmit}/>
                                </div>
                            </Restricted>
                        </form>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = HomePage;
