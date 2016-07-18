var React = require('react');

var Helmet = require('react-helmet');
var _ = require('underscore');

var config = require('./config');
var Navbar = require('./Navbar');
var BlogPost = require('./BlogPost');
var Footer = require('./Footer');

var BlogPostPage = React.createClass({
    statics: {
        resources (routeObj) {
            var slug = routeObj.url.split('/')[1];
            return {
                api: [
                    {
                        name: 'post',
                        path: '/api/v1/blogpost/' + slug
                    }
                ]
            };
        }
    },
    render () {
        return (
            <div className='flex-wrapper'>
                <Helmet
                    title={this.props.data.post.title}
                    titleTemplate={'%s - ' + config.name + ' - Blog'}
                    meta={[
                        {name: 'description', 'content': ''},
                        {name: 'twitter:card', content: 'summary'},
                        {name: 'twitter:site', content: config.twitter},
                        {name: 'twitter:title', content: this.props.data.post.title},
                        {name: 'twitter:description', content: ''},
                        {property: 'og:title', content: this.props.data.post.title},
                        {property: 'og:type', content: 'article'},
                        {property: 'og:url', content: config.url + this.props.path},
                        {property: 'og:description', content: ''},
                        {property: 'og:site_name', content: config.name}
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
                        <div className='rows'>
                            <div className='small-12 columns'>
                                <div className=''>
                                    <BlogPost
                                        title={this.props.data.post.title}
                                        slug={this.props.data.post.slug}
                                        content={this.props.data.post.content}
                                        created={this.props.data.post.created}
                                        prev={this.props.data.post.prev}
                                        next={this.props.data.post.next}
                                        author={this.props.data.post.author}
                                        authorId={this.props.data.post.authorId}
                                        showComments={true}
                                        showCta={true}/>
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = BlogPostPage;
