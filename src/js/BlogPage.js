var React = require('react');

var Helmet = require('react-helmet');
var _ = require('lodash');

var config = require('./config');
var Navbar = require('./Navbar');
var BlogPost = require('./BlogPost');
var Footer = require('./Footer');

var pageNoFromPath = function (path) {
    var parts = path.split('/');
    var page;
    if (parts.length > 2) {
        page = Number(parts[2]);
    } else {
        page = 0;
    }
    return page;
};

var BlogPage = React.createClass({
    statics: {
        resources (routeObj) {
            var page = pageNoFromPath(routeObj.url);
            return {
                api: [
                    {
                        name: 'posts',
                        path: '/api/v1/blog/' + page
                    }
                ]
            };
        }
    },
    render () {
        var page = pageNoFromPath(this.props.path);
        var newerPosts;
        if (page === 0) {
            newerPosts = null;
        } else if (page === 1) {
            newerPosts = <a href='/blog'>Newer Posts</a>;
        } else {
            newerPosts = <a href={'/blog/page/' + (page - 1)}>Newer Posts</a>;
        }
        return (
            <div className='flex-wrapper'>
                <Helmet
                    title='Blog'
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
                        <div className='row'>
                            <div className='small-12 columns'>
                                <div className=''>
                                    {this.props.data.posts.length === 0 ? <div><h1>Thats all!</h1><div className='callout'>There are no more posts to show</div></div> : null}
                                    {this.props.data.posts.map((x) => {
                                        return <BlogPost
                                            key={x.slug}
                                            title={x.title}
                                            content={x.content}
                                            added={x.added}
                                            slug={x.slug}
                                            prev={x.prev}
                                            next={x.next}
                                            author={x.author}
                                            authorId={x.authorId}
                                            showComments={false}/>;
                                    })}
                                    <div className='row'>
                                        <div className='small-12 columns'>
                                            {newerPosts}
                                        </div>
                                        <div className='small-12 columns'>
                                            {this.props.data.posts.length > 0 ? <a href={'/blog/page/' + (page + 1)}>Older Posts</a> : null}
                                        </div>
                                    </div>
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

module.exports = BlogPage;
