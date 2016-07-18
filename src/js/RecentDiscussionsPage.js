var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var moment = require('moment');
var Comment = require('./Comment');
var _ = require('lodash');
var DiscussReply = require('./DiscussReply');
var PageBar = require('./PageBar');
var config = require('./config');
var Time = require('./Time');
var Markdown = require('./Markdown');
var Link = require('./Link');
var PreviousNext = require('./PreviousNext');

var RecentDiscussions = React.createClass({
    statics: {
        resources (appstate) {
            var page = appstate.query.page;
            var query = page ? '?page=' + page : '';
            return {
                api: [
                    {
                        name: 'discuss',
                        path: '/api/v1/recent-discussions' + query
                    }
                ]
            };
        }
    },
    render () {
        return (
            <span>
                <Helmet
                    title={'Recent Discussions'}
                    titleTemplate={'%s - ' + config.name}
                    meta={[
                        {'name': 'robots', 'content': 'noindex'}
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
                        <h1>Recent Discussions</h1>
                        <div className='small-12 columns'>
                            <div className='card-container'>
                                {this.props.data.discuss.map((x) => {
                                    return <div className='card' key={x.id}>
                                        <div className="small-6 columns">
                                            <strong><a href={'/users/' + x.user + '/' + x.username}>{x.username}</a></strong>
                                        </div>
                                        <div className="small-6 columns text-right discuss-updated"><Time timestamp={x.created} type='ago'/></div>
                                        <div className="small-12 columns">
                                            <Markdown
                                                markdown={x.content}
                                                />
                                        </div>
                                        <div className="small-12 columns">
                                            Page: <strong><Link
                                                className='secondary'
                                                id={x.obj.id}
                                                slug={x.obj.slug}
                                                type={x.obj.type}>
                                                {x.obj.title}
                                            </Link></strong>
                                        </div>
                                    </div>
                                })}
                                <PreviousNext path={this.props.path} page={this.props.query.page}/>
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = RecentDiscussions;
