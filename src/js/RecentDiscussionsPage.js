var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var moment = require('moment');
var Comment = require('./Comment');
var _ = require('underscore');
var DiscussReply = require('./DiscussReply');
var PageBar = require('./PageBar');
var moment = require('moment');

var RecentDiscussions = React.createClass({
    statics: {
        resources (appstate) {
            return {
                api: [
                    {
                        name: 'discuss',
                        path: '/api/v1/recent-discussions/0'
                    }
                ]
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
                        <h1 className='page-title'>Recent Discussions</h1>
                        <div className='small-12 columns'>
                            <div className='card-container'>
                                <div className='card'>
                                    <div className='small-6 columns'>
                                        Page
                                    </div>
                                    <div className='small-3 column text-right'>
                                        Posts
                                    </div>
                                    <div className='small-3 column text-right'>
                                        Updated
                                    </div>
                                </div>
                                {this.props.data.discuss.map((x) => {
                                    return <div className='card'>
                                        <div className='discuss-topic small-6 columns'>
                                            <a href={'/discuss/' + x.id + '/' + x.slug}>{x.title}</a>
                                        </div>
                                        <div className='discuss-posts small-3 column text-right'>
                                            {x.posts}
                                        </div>
                                        <div className='discuss-time small-3 column text-right'>
                                            {moment(x.last_updated).fromNow()}
                                        </div>
                                    </div>;
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = RecentDiscussions;
