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
                                {this.props.data.discuss.map((x) => {
                                    return <div className='card'>
                                        <div className='discuss-topic small-8 columns'>
                                            <a href={'/discuss/' + x.id + '/' + x.slug}>{x.title}</a>
                                        </div>
                                        <div className='discuss-posts small-2 column'>
                                            {x.posts}
                                        </div>
                                        <div className='discuss-time small-2 column'>
                                            {x.last_updated}
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
