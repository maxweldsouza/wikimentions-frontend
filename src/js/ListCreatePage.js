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
var IpWarning = require('./IpWarning');

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
            title: this.props.query.title ? this.props.query.title : '',
            titleValid: true,
            titleMessage: '',
            description: '',
            descriptionValid: true,
            descriptionMessage: '',
            submitting: false,
            formMessage: ''
        };
    },
    componentWillReceiveProps (nextProps) {
        if (nextProps.query.title) {
            this.setState({
                title: nextProps.query.title
            });
        }
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
        return valid;
    },
    onSubmit (e) {
        e.preventDefault();
        if (this.validateForm()) {
            this.setState({
                submitting: true
            });
            requests
            .post('/api/v1/lists')
            .type('form')
            .send({
                title: this.state.title,
                description: this.state.description,
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
                    Snackbar({message: 'List created'});
                    history.pushState(null, null, res.body.redirect);
                    Mentions.route(res.body.redirect);
                }
            });
        }
    },
    render () {
        var loggedOutMessage = <span>You need to <LoginModal/> / <SignupModal/> to create a list.</span>;
        return (
            <span>
                <Helmet
                    title={'Create list'}
                    titleTemplate={'%s - ' + config.name}
                    meta={[
                        {'name': 'description', 'content': 'Create a new list on WikiMentions'}
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
                    <div className='small-12 columns'>
                        <div>
                            <h1>Create list</h1>
                            {this.state.formMessage ? <div className='callout alert'>
                                {this.state.formMessage}
                            </div> : null}
                            <Restricted message={loggedOutMessage}>
                                <div className='row'>
                                    <div className='small-12 large-4 large-order-2 columns'>
                                        <div className='callout warning'>
                                            Search to check whether a list already exists before adding a new one. Make sure you have read our <a href='/guidelines'>Guidelines</a>
                                        </div>
                                    </div>
                                    <div className='small-12 large-8 large-order-1  columns'>
                                        <IpWarning loggedin={this.props.loggedin}/>
                                        <form onSubmit={this.onSubmit}>
                                            Title
                                            <Input type='text'
                                                name='title'
                                                value={this.state.title}
                                                onChange={this.onChangeText}
                                                onClear={this.onClear}
                                                valid={this.state.titleValid}
                                                message={this.state.titleMessage}/>
                                            <span>Description (Optional)
                                                <textarea
                                                    type='text'
                                                    name='description'
                                                    rows={3}
                                                    value={this.state.description}
                                                    onChange={this.onChangeText}
                                                    />
                                            </span>
                                            <SubmitButton title='Create' className='button primary float-right' submitting={this.state.submitting}/>
                                        </form>
                                    </div>
                                </div>
                            </Restricted>
                        </div>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = HomePage;
