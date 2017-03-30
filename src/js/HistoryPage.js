import React from 'react';
import Helmet from 'react-helmet';
import Navbar from './Navbar';
import Pagination from './Pagination';
import HistoryItem from './HistoryItem';
import PageBar from './PageBar';
import config from './config';

class HistoryPage extends React.Component {
    static resources(appstate) {
        const [type, id, slug] = appstate.path.split('/');
        const page = appstate.query.page;
        const query = page ? `?page=${page}` : '';
        return {
            api: [
                {
                    name: 'history',
                    path: `/api/v1/history/${id}${query}`
                },
                {
                    name: 'thing',
                    path: `/api/v1/thing/${id}`
                }
            ]
        };
    }
    render() {
        const id = Number(this.props.path.split('/')[1]);
        const slug = this.props.data.history.props.slug;
        const type = this.props.data.history.props.type;
        const history = this.props.data.history.history;
        let nodata;
        if (history.length === 0) {
            nodata = (
                <div className="small-12 columns">
                    <div className="blankslate">
                        <h3>No history</h3>
                        There is no recorded history for this page.
                    </div>
                </div>
            );
        }
        return (
            <span>
                <Helmet
                    title={`History - ${this.props.data.thing.props.title}`}
                    titleTemplate={`%s - ${config.name}`}
                    meta={[{ name: 'robots', content: 'noindex' }]}
                    link={[
                        { rel: 'canonical', href: config.url + this.props.path }
                    ]}
                />
                <Navbar
                    loggedin={this.props.loggedin}
                    username={this.props.username}
                    userid={this.props.userid}
                    toggleSidebar={this.props.toggleSidebar}
                />
                <div className="row page-body white">
                    <div className="small-12 large-8 columns">
                        <h1>
                            {`History - ${this.props.data.thing.props.title}`}
                        </h1>
                        <PageBar id={id} slug={slug} type={type} />
                        <hr />
                        <div className="row">
                            {nodata}
                            {history.map(x => {
                                return (
                                    <HistoryItem
                                        user={x.user}
                                        username={x.username}
                                        ip={x.ip}
                                        entry={x.entry}
                                        entrytype={x.entrytype}
                                        timestamp={x.timestamp}
                                        deleted={x.deleted}
                                    />
                                );
                            })}
                        </div>
                        <Pagination
                            path={this.props.path}
                            page={this.props.query.page}
                            count={history.length}
                        />
                    </div>
                </div>
            </span>
        );
    }
}

export default HistoryPage;
