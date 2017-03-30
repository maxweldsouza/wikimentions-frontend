import React from 'react';
import Helmet from 'react-helmet';
import Navbar from './Navbar';
import Comment from './Comment';
import DiscussReply from './DiscussReply';
import PageBar from './PageBar';
import config from './config';
import Pagination from './Pagination';
import queryString from 'query-string';

class DiscussPage extends React.Component {
    static resources(appstate) {
        const [type, id, slug] = appstate.path.split('/');
        const queryObj = {};
        if (appstate.query.page) {
            queryObj.page = appstate.query.page;
        }
        queryObj.slug = slug;
        let query = queryString.stringify(queryObj);
        query = query ? `?${query}` : '';
        return {
            api: [
                {
                    name: 'discuss',
                    path: `/api/v1/discuss/${id}${query}`
                }
            ]
        };
    }
    render() {
        const parts = this.props.path.split('/');
        const id = Number(parts[1]);
        const slug = parts[2];
        const type = this.props.data.discuss.props.type;
        const discussions = this.props.data.discuss.discussion;
        let nodata;
        let pagination = (
            <Pagination
                path={this.props.path}
                page={this.props.query.page}
                count={discussions.length}
            />
        );
        if (discussions.length === 0) {
            if (this.props.query.page) {
                nodata = (
                    <div className="small-12 columns">
                        <div className="blankslate">
                            <span className="icon ion-android-chat" />
                            <h3>No more posts</h3>
                            You have reached the end of discussions.
                        </div>
                    </div>
                );
            } else {
                nodata = (
                    <div className="small-12 columns">
                        <div className="blankslate">
                            <span className="icon ion-android-chat" />
                            <h3>Discussion Empty</h3>
                            There are no posts for this page.
                        </div>
                    </div>
                );
                pagination = null;
            }
        }
        return (
            <span>
                <Helmet
                    title={
                        `Discussion - ${this.props.data.discuss.props.title}`
                    }
                    titleTemplate={`%s - ${config.name}`}
                    meta={[
                        { name: 'description', content: '' },
                        { name: 'robots', content: 'noindex' }
                    ]}
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
                            {
                                `Discussion - ${this.props.data.discuss.props.title}`
                            }
                        </h1>
                        <PageBar id={id} slug={slug} type={type} />
                        <hr />
                        <div className="row">
                            {discussions.map(x => {
                                return (
                                    <Comment
                                        id={x.id}
                                        key={x.id}
                                        user={x.user}
                                        name={x.username}
                                        text={x.content}
                                        posted={x.created}
                                    />
                                );
                            })}
                            {nodata}
                            <div className="small-12 columns">
                                {pagination}
                            </div>
                            <DiscussReply
                                id={id}
                                loggedin={this.props.loggedin}
                            />
                        </div>
                    </div>
                </div>
            </span>
        );
    }
}

export default DiscussPage;
