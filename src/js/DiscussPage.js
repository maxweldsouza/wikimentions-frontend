var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Comment = require('./Comment');
var _ = require('lodash');
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
            nodata = <div className='card'>
                    <div className='small-12 columns'>
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
                        <h1>{'Discussion - ' + this.props.data.discuss.props.title}</h1>
                        <PageBar
                            id={id}
                            slug={slug}
                            type={type}
                            />
                        <div className='small-12 columns'>
                            <div className='card-container'>
                                {discussions.map((x) => {
                                    return <VelocityTransitionGroup
                                        enter={{animation: {opacity: '1', easing: 'easeIn', duration: 400, display: 'flex'}}}
                                        leave={{animation: {opacity: '0', easing: 'easeOut', duration: 400, display: 'flex'}}}>
                                    <Comment
                                        id={x.id}
                                        key={x.id}
                                        user={x.user}
                                        name={x.username}
                                        text={x.content}
                                        posted={x.created}
                                        />
                                    </VelocityTransitionGroup>;
                                })}
                                {nodata}
                                <PreviousNext path={this.props.path} page={this.props.query.page}/>
                                <DiscussReply id={id}/>
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = DiscussPage;
