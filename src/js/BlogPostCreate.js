var React = require('react');
var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var cookies = require('browser-cookies');
var ButtonSelect = require('./ButtonSelect');
var Snackbar = require('./Snackbar');
var requests = require('superagent');
var SubmitButton = require('./SubmitButton');
var Restricted = require('./Restricted');

var BlogPostCreate = React.createClass({
    statics: {
        resources (routeObj) {
            return {
                api: []
            };
        }
    },
    getInitialState () {
        return {
            title: '',
            content: '',
            submiting: false
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
                Snackbar({message: res.body.message});
            } else {
                Snackbar({message: 'Blog post saved'});
                history.pushState(null, null, window.location.pathname + window.location.search);
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
                        <input type='hidden' name='action' value='create'/>
                        <h1 className='blog-title'>Create Post</h1>
                        <Restricted>
                            <input type='text' name='title' placeholder='Title' />
                            <textarea name='content' placeholder='Content' />
                            <div>
                                <SubmitButton title='Create' submitting={this.state.submitting} onSubmit={this.onSubmit}/>
                            </div>
                        </Restricted>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = BlogPostCreate;
