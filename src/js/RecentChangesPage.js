import React from 'react';
import Helmet from 'react-helmet';
import Navbar from './Navbar';
import _ from 'underscore';
import config from './config';
import Pagination from './Pagination';
import HistoryItem from './HistoryItem';
import autoBind from 'react-autobind';

class RecentChangesPage extends React.Component {
    static resources (appstate) {
        const page = appstate.query.page;
        const query = page ? `?page=${page}` : '';
        return {
            api: [
                {
                    name: 'history',
                    path: `/api/v1/recent-changes${query}`
                }
            ]
        };
    }
    render () {
        return (
            <span>
                <Helmet
                    title={'Recent Changes'}
                    titleTemplate={`%s - ${config.name}`}
                    meta={[
                        { 'name': 'robots', 'content': 'noindex' }
                    ]}
                    link={[
                        { 'rel': 'canonical', 'href': config.url + this.props.path }
                    ]}
                    />
                <Navbar
                    loggedin={this.props.loggedin}
                    username={this.props.username}
                    userid={this.props.userid}
                    toggleSidebar={this.props.toggleSidebar}/>
                <div className='row page-body white'>
                        <div className='small-12 large-8 columns'>
                            <h1>Recent Changes</h1>
                            <hr/>
                            <div className='row'>
                                {this.props.data.history.map((x, i) => {
                                    return <HistoryItem
                                        key={i}
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
                            <Pagination path={this.props.path} page={this.props.query.page} count={this.props.data.history.length}/>
                        </div>
                    </div>
            </span>
        );
    }
}

export default RecentChangesPage;
