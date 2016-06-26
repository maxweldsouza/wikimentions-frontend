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
var Footer = require('./Footer');

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
            submiting: false
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
                submiting: true
            });
            var data = {
                title: this.state.title,
                description: this.state.description,
                type: this.state.type,
                action: 'create',
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
                    submiting: false
                });
                if (err && err.status) {
                    Snackbar({message: res.body.message});
                } else {
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
        var loggedOutMessage = <span>You need to <LoginModal/> to create a page.</span>;
        return (
            <span>
                <Helmet
                    title={'Create Page'}
                    titleTemplate={'%s - ' + config.name}
                    meta={[
                        {'name': 'description', 'content': ''}
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
                        <form action='/api/v1/thing' method='post'>
                            <h1 className='page-title'>Create Page</h1>
                            <Restricted message={loggedOutMessage}>
                                <Input type='text' name='title' placeholder='Title' value={this.state.title} onChange={this.onChangeText} valid={this.state.titleValid}
                                message={this.state.titleMessage}/>
                                <input type='text' name='description' placeholder='Description (Optional)' value={this.state.description} onChange={this.onChangeText}/>
                                <div className='row'>
                                    <div className='small-12 columns'>
                                        Type
                                        <ButtonSelect
                                            name='type'
                                            options={options}
                                            default={'person'}
                                            onChange={this.onChangeType}/>
                                        {this.state.type === 'book' ? <input type='text' name='isbn' placeholder='ISBN' value={this.state.isbn} onChange={this.onChangeText}/> : null}
                                        {this.state.type === 'book' ? <input type='text' name='isbn13' placeholder='ISBN-13' value={this.state.isbn13} onChange={this.onChangeText}/> : null}
                                        {this.state.type === 'video' ? <Input type='text' name='url' placeholder='Url' value={this.state.url} onChange={this.onChangeText}
                                        valid={this.state.urlValid}
                                        message={this.state.urlMessage}/> : null}
                                    </div>
                                </div>
                                <div>
                                    <SubmitButton title='Create' submitting={this.state.submitting} onSubmit={this.onSubmit}/>
                                </div>
                            </Restricted>
                        </form>
                        <Footer />
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = HomePage;
