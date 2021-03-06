import AdminOnly from './AdminOnly';
import config from './config';
import Helmet from 'react-helmet';
import Navbar from './Navbar';
import React from 'react';
import requests from 'superagent';
import Time from './Time';
import snackbar from './snackbar';
import autoBind from 'react-autobind';

class FeedbackPage extends React.Component {
    static resources() {
        return {
            api: []
        };
    }
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            feedback: [],
            page: 1
        };
    }
    componentDidMount() {
        this.fetchFeedback(1);
    }
    fetchFeedback(page) {
        requests
            .get(
                page === 1
                    ? '/api/v1/feedback'
                    : `/api/v1/feedback?page=${page}`
            )
            .send()
            .end((err, res) => {
                if (err && err.status) {
                    snackbar({ message: res.body.message });
                } else {
                    this.setState({
                        page,
                        feedback: res.body
                    });
                }
            });
    }
    prevPage() {
        this.fetchFeedback(this.state.page - 1);
    }
    nextPage() {
        this.fetchFeedback(this.state.page + 1);
    }
    render() {
        return (
            <span>
                <Helmet
                    title={'Feedback'}
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
                        <h1>Feedback Page: {this.state.page}</h1>
                        <hr />
                        <div className="row">
                            <AdminOnly>
                                <div className="small-12 columns">
                                    {this.state.feedback.map(x => {
                                        return (
                                            <div className="row" key={x.id}>
                                                <span
                                                    className="small-8 columns"
                                                >
                                                    <strong>Type:</strong>
                                                    {' '}
                                                    {x.rating === 1
                                                        ? <span
                                                              className="ion-checkmark"
                                                              style={{
                                                                  color: 'hsla(144, 60%, 60%, 1)'
                                                              }}
                                                          />
                                                        : <span
                                                              className="ion-close"
                                                              style={{
                                                                  color: 'hsla(0, 83%, 57%, 1)'
                                                              }}
                                                          />}
                                                </span>
                                                <span
                                                    className="small-4 columns text-right"
                                                >
                                                    <Time
                                                        timestamp={x.updated}
                                                        type="ago"
                                                    />
                                                </span>
                                                <span
                                                    className="small-8 columns"
                                                >
                                                    Url:
                                                    {' '}
                                                    <a href={x.url}>{x.url}</a>
                                                </span>
                                                <span
                                                    className="small-4 columns"
                                                >
                                                    User:
                                                    {' '}
                                                    {x.user
                                                        ? <a
                                                              href={
                                                                  `/users/${x.user.id}/${x.user.name}`
                                                              }
                                                          >
                                                              {x.user.name}
                                                          </a>
                                                        : null}
                                                </span>
                                                <span
                                                    className="small-12 columns"
                                                >
                                                    Feedback:
                                                    {' '}
                                                    <strong>{x.content}</strong>
                                                </span>
                                                <span
                                                    className="small-4 columns"
                                                >
                                                    Email: {x.email}
                                                </span>
                                                <span
                                                    className="small-4 columns"
                                                >
                                                    <div>ID: {x.id}</div>
                                                </span>
                                                <span
                                                    className="small-4 columns"
                                                >
                                                    Platform: {x.platform}
                                                </span>
                                                <span
                                                    className="small-12 columns"
                                                >
                                                    Useragent: {x.useragent}
                                                    <hr />
                                                </span>
                                            </div>
                                        );
                                    })}
                                    <div className="row">
                                        <div className="small-6 columns">
                                            {this.state.page > 1
                                                ? <a
                                                      className="secondary"
                                                      onClick={this.prevPage}
                                                  >
                                                      Previous
                                                  </a>
                                                : null}
                                        </div>
                                        <div
                                            className="small-6 columns text-right"
                                        >
                                            <a
                                                className="secondary"
                                                onClick={this.nextPage}
                                            >
                                                Next
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </AdminOnly>
                        </div>
                    </div>
                </div>
            </span>
        );
    }
}

export default FeedbackPage;
