var React = require('react');
var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Mention = require('./Mention');
var _ = require('underscore');
var Pagination = require('./Pagination');
var HistoryItem = require('./HistoryItem');

var HistoryPage = React.createClass({
    statics: {
        resources (appstate) {
            var id = appstate.url.split('/')[1];
            return {
                api: [
                    {
                        name: 'history',
                        path: '/api/v1/history/' + id
                    }
                ]
            };
        }
    },
    render () {
        var id = Number(this.props.path.split('/')[1]);
        var history = this.props.data.history.history;
        var nodata;
        if (history.length === 0) {
            nodata = <div className='callout primary'>
                    Nothing to show here.
                    </div>;
        }
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
                        <h1 className='page-title'>History</h1>
                        <div className="history-card">
                            <div>
                                {nodata}
                                {history.map((x) => {
                                    return <HistoryItem
                                        user={x.user}
                                        username={x.username}
                                        entry={x.entry}
                                        entrytype={x.entrytype}
                                        timestamp={x.timestamp}
                                        />;
                                    return <div>
                                        <a href={'/users/' + x.user + '/' + x.username}>{x.username}</a> {added} {item}  {moment(x.timestamp).fromNow()}
                                    </div>;
                                })}
                            </div>
                        </div>
                    </div>
                    <div className='small-12 columns'>
                        <Pagination
                            pages={5}
                            current={1}
                            />
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = HistoryPage;
