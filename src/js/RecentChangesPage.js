var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var _ = require('lodash');
var config = require('./config');
var PreviousNext = require('./PreviousNext');
var HistoryItem = require('./HistoryItem');

var RecentChangesPage = React.createClass({
    statics: {
        resources (appstate) {
            var page = appstate.query.page;
            var query = page ? '?page=' + page : '';
            return {
                api: [
                    {
                        name: 'history',
                        path: '/api/v1/recent-changes' + query
                    }
                ]
            };
        }
    },
    render () {
        return (
            <span>
                <Helmet
                    title={'Recent Changes'}
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
                            <h1>Recent Changes</h1>
                            <div className='small-12 columns'>
                                <div className="card-container">
                                    {this.props.data.history.map((x) => {
                                        return <HistoryItem
                                            user={x.user}
                                            username={x.username}
                                            entry={x.entry}
                                            entrytype={x.entrytype}
                                            timestamp={x.timestamp}
                                            deleted={x.deleted}
                                            />;
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

module.exports = RecentChangesPage;
