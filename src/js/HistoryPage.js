var React = require('react');
var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Mention = require('./Mention');
var _ = require('underscore');
var Pagination = require('./Pagination');
var moment = require('moment');

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
        var history = this.props.data.history;
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
                        <div className='row'>
                            <div className="small-12 columns">
                                {history.history.map((x) => {
                                    var added = x.deleted ? 'deleted' : 'added';
                                    var item;
                                    if (x.entry && x.entry.type === 'video_author') {
                                        item = <span>
                                            <a href={'/pages/' + x.entry.source + '/'  + x.entry.source_slug}>{x.entry.source_title}</a> as author to video <a href={'/videos/' + x.entry.destination + '/'  + x.entry.destination_slug}>{x.entry.destination_title}</a>
                                        </span>;
                                    }
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
