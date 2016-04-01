var React = require('react');

var Helmet = require('react-helmet');
var _ = require('underscore');

var Navbar = require('./Navbar');

var BlogPost = require('./BlogPost');

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
                    titleTemplate='%s - Comparnion Blog'
                    meta={[
                        {name: 'description', 'content': ''},
                        {name: 'twitter:card', content: 'summary'},
                        {name: 'twitter:site', content: '@comparnion'},
                        {name: 'twitter:title', content: this.props.data.post.title},
                        {name: 'twitter:description', content: ''},
                        {property: 'og:title', content: this.props.data.post.title},
                        {property: 'og:type', content: 'article'},
                        {property: 'og:url', content: 'https://comparnion.com' + this.props.path},
                        {property: 'og:description', content: ''},
                        {property: 'og:site_name', content: 'Comparnion'}
                    ]}
                    link={[
                        {'rel': 'canonical', 'href': 'https://comparnion.com/' + this.props.path}
                    ]}
                    />
                <Navbar
                    count={0}
                    total={0}
                    navButton={this.props.navButton}
                    />
                <div className='row page-body align-center'>
                    <div className='small-8 columns'>
                        <div className='rows'>
                            <div className='small-12 columns'>
                                <div className='text-page-article'>
                                    <BlogPost
                                        title={this.props.data.post.title}
                                        slug={this.props.data.post.slug}
                                        content={this.props.data.post.content}
                                        added={this.props.data.post.added}
                                        prev={this.props.data.post.prev}
                                        next={this.props.data.post.next}
                                        showComments={true}
                                        showCta={true}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = BlogPostPage;
