var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Comment = require('./Comment');
var _ = require('underscore');
var DiscussReply = require('./DiscussReply');
var PageBar = require('./PageBar');
var config = require('./config');
var PreviousNext = require('./PreviousNext');
var VelocityTransitionGroup = require('velocity-react').VelocityTransitionGroup;
var queryString = require('query-string');

var DiscussPage = React.createClass({
    statics: {
        resources (appstate) {
            var data;
            var [type, id, slug] = appstate.path.split('/');
            var queryObj = {};
            if (appstate.query.page) {
                queryObj.page = appstate.query.page;
            }
            queryObj.slug = slug;
            var query = queryString.stringify(queryObj);
            query = query ? '?' + query : '';
            return {
                api: [
                    {
                        name: 'discuss',
                        path: '/api/v1/discuss/' + id + query
                    }
                ]
            };
        }
    },
    render () {
        var parts = this.props.path.split('/');
        var id = Number(parts[1]);
        var slug = parts[2];
        var type = this.props.data.discuss.props.type;
        var discussions = this.props.data.discuss.discussion;
        var nodata;
        if (discussions.length === 0) {
            nodata = <div className='small-12 columns'>
                <div className='callout warning'>
                    There are no discussions here. You can start one !
                </div>
            </div>;
        }
        return (
            <span>
                <Helmet
                    title={'Discussion - ' + this.props.data.discuss.props.title}
                    titleTemplate={'%s - ' + config.name}
                    meta={[
                        {'name': 'description', 'content': ''},
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
                <div className='row page-body white'>
                    <div>
                        <h1>{'Discussion - ' + this.props.data.discuss.props.title}</h1>
                        <PageBar
                            id={id}
                            slug={slug}
                            type={type}
                            />
                        <div className='row'>
                            <div className='small-12 large-9 columns'>
                                <hr/>
                                <div className='row'>
                                    {discussions.map((x) => {
                                        return <Comment
                                                id={x.id}
                                                key={x.id}
                                                user={x.user}
                                                name={x.username}
                                                text={x.content}
                                                posted={x.created}
                                                />;
                                    })}
                                    {nodata}
                                    <div className='small-12 columns'>
                                        <PreviousNext path={this.props.path} page={this.props.query.page} count={discussions.length}/>
                                    </div>
                                    <DiscussReply id={id}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = DiscussPage;
