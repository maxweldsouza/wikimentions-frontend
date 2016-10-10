var React = require('react');
var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Mention = require('./Mention');
var _ = require('underscore');
var Pagination = require('./Pagination');
var HistoryItem = require('./HistoryItem');
var PageBar = require('./PageBar');
var config = require('./config');

var HistoryPage = React.createClass({
    statics: {
        resources (appstate) {
            var [type, id, slug] = appstate.path.split('/');
            var page = appstate.query.page;
            var query = page ? '?page=' + page : '';
            return {
                api: [
                    {
                        name: 'history',
                        path: '/api/v1/history/' + id + query
                    },
                    {
                        name: 'thing',
                        path: '/api/v1/thing/' + id
                    }
                ]
            };
        }
    },
    render () {
        var id = Number(this.props.path.split('/')[1]);
        var slug = this.props.data.history.props.slug;
        var type = this.props.data.history.props.type;
        var history = this.props.data.history.history;
        var nodata;
        if (history.length === 0) {
            nodata = <div className='small-12 columns'>
                <div className='blankslate'>
                    <h3>No history</h3>
                    There is no recorded history for this page.
                </div>
            </div>;
        }
        return (
            <span>
                <Helmet
                    title={'History - ' + this.props.data.thing.props.title}
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
                <div className='row page-body white'>
                    <div className='small-12 large-8 columns'>
                        <h1>{'History - ' + this.props.data.thing.props.title}</h1>
                        <PageBar
                            id={id}
                            slug={slug}
                            type={type}
                            />
                        <hr/>
                        <div className='row'>
                            {nodata}
                            {history.map((x) => {
                                return <HistoryItem
                                    user={x.user}
                                    username={x.username}
                                    ip={x.ip}
                                    entry={x.entry}
                                    entrytype={x.entrytype}
                                    timestamp={x.timestamp}
                                    deleted={x.deleted}
                                    />;
                            })}
                        </div>
                        <Pagination path={this.props.path} page={this.props.query.page} count={history.length}/>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = HistoryPage;
