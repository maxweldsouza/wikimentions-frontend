var React = require('react');
var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Login = require('./Login');
var Signup = require('./Signup');
var cookies = require('browser-cookies');
var Xsrf = require('./Xsrf');

var BlogPostCreate = React.createClass({
    statics: {
        resources (routeObj) {
            return {
                api: []
            };
        }
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
                                <input type='hidden' name='action' value='create'/>
                                <Xsrf/>
                                <h1 className='page-title'>Create Post</h1>
                                <input type='text' name='title' placeholder='Title' />
                                <textarea name='content' placeholder='Content' />
                                <div>
                                    <button type='submit' className='success button'>Create</button>
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
