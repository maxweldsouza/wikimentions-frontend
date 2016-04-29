var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var moment = require('moment');
var Comment = require('./Comment');
var _ = require('underscore');
var DiscussReply = require('./DiscussReply');
var PageBar = require('./PageBar');

var RecentDiscussions = React.createClass({
    statics: {
        resources (appstate) {
            return {
                api: [
                    {
                        name: 'discuss',
                        path: '/api/v1/discuss/1'
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
                        <div className='card-container'>
                            <div className='card'>
                                <div className='discuss-topic small-8 columns'>
                                    Richard Dawkins
                                </div>
                                <div className='discuss-posts small-2 column'>
                                    4 Posts
                                </div>
                                <div className='discuss-time small-2 column'>
                                    1 min ago
                                </div>
                            </div>
                            <div className='card'>
                                <div className='discuss-topic small-8 columns'>
                                    Richard Dawkins
                                </div>
                                <div className='discuss-posts small-2 column'>
                                    4 Posts
                                </div>
                                <div className='discuss-time small-2 column'>
                                    1 min ago
                                </div>
                            </div>
                            <div className='card'>
                                <div className='discuss-topic small-8 columns'>
                                    Richard Dawkins
                                </div>
                                <div className='discuss-posts small-2 column'>
                                    4 Posts
                                </div>
                                <div className='discuss-time small-2 column'>
                                    1 min ago
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = RecentDiscussions;
