var React = require('react');
var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Login = require('./Login');
var Signup = require('./Signup');
var cookies = require('browser-cookies');
var ButtonSelect = require('./ButtonSelect');
var Notification = require('./Notification');
var requests = require('superagent');
var SubmitButton = require('./SubmitButton');

var BlogPostCreate = React.createClass({
    statics: {
        resources (routeObj) {
            return {
                api: []
            };
        }
    },
    getInitialState: function() {
        return {
            title: '',
            content: '',
            submiting: false,
            error: false,
            message: ''
        };
    },
    onChangeText (e) {
        var temp = {
            error: false,
            message: ''
        };
        temp[e.target.name] = e.target.value;
        this.setState(temp);
    },
    onCloseError () {
        this.setState({
            error: false,
            message: ''
        });
    },
    validateForm () {
        var message;
        if (!this.state.title) {
            message = 'You need to provide a title'
        }
        if (message) {
            this.setState({
                error: true,
                message: message
            });
            return false;
        }
        return true;
    },
    onSubmit () {
        if (!this.validateForm()) {
            return;
        }
        this.setState({
            submitting: true
        });
        requests
        .post('/api/v1/blog')
        .type('form')
        .send({
            title: this.state.title,
            content: this.state.content,
            _xsrf: cookies.get('_xsrf')
        })
        .end((err, res) => {
            this.setState({
                submitting: false
            });
            if (err && err.status) {
                this.setState({
                    error: true,
                    message: res.body.message
                });
            } else {
                Mentions.route(window.location.pathname + window.location.search);
            }
        });
    },
    render () {
        return (
            <span>
                <Helmet
                    title={'Mentions'}
                    titleTemplate='%s - Mentions'
                    meta={[
                        {'name': 'description', 'content': ''}
                    ]}
                    link={[
                        {'rel': 'canonical', 'href': ''}
                    ]}
                    />
                <Navbar/>
                <div className='row page-body align-center'>
                    <div className='small-12 large-8 columns'>
                        <div className='small-12 large-8 columns'>
                            <form action='/api/v1/blog' method='post'>
                                <Notification level='alert' message={this.state.message} showing={this.state.error} onClose={this.onCloseError} closeable/>
                                <input type='hidden' name='action' value='create'/>
                                <h1 className='page-title'>Create Post</h1>
                                <input type='text' name='title' placeholder='Title' />
                                <textarea name='content' placeholder='Content' />
                                <div>
                                    <SubmitButton title='Create' submitting={this.state.submitting} onSubmit={this.onSubmit}/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = BlogPostCreate;
