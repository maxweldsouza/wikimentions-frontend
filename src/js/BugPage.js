import AdminOnly from './AdminOnly';
import config from './config';
import Helmet from 'react-helmet';
import Navbar from './Navbar';
import React from 'react';
import requests from 'superagent';
import snackbar from './snackbar';
import Time from './Time';
import autoBind from 'react-autobind';

class BugPage extends React.Component {
    static resources () {
        return {
            api: []
        };
    }
    constructor (props) {
        super(props);
        autoBind(this);
        this.state = {
            bugs: [],
            page: 1
        };
    }
    componentDidMount () {
        this.fetchData(1);
    }
    fetchData (page) {
        const url = page === 1 ? '/api/v1/bugs' : `/api/v1/bugs?page=${page}`;
        requests
        .get(url)
        .send()
        .end((err, res) => {
            if (err && err.status) {
                snackbar({ message: res.body.message });
            } else {
                this.setState({
                    page,
                    bugs: res.body
                });
            }
        });
    }
    prevPage () {
        this.fetchData(this.state.page - 1);
    }
    nextPage () {
        this.fetchData(this.state.page + 1);
    }
    render () {
        return (
            <span>
                <Helmet
                    title={'Bug Reports'}
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
                        <h1>Bugs Page: {this.state.page}</h1>
                            <AdminOnly>
                                <div className='row'>
                                <div className='small-12 columns'>
                                    <hr/>
                                    {this.state.bugs.map(x => {
                                        return <div className='row' key={x.id}>
                                            <span className='small-8 columns'>
                                                Url: <a href={x.url}>{x.url}</a>
                                            </span>
                                            <span className='small-4 columns text-right'><Time timestamp={x.updated} type='ago'/></span>
                                            <span className='small-4 columns'>
                                                User: {x.user ? <a href={`/users/${x.user.id}/${x.user.name}`}>{x.user.name}</a> : null}
                                            </span>
                                            <span className='small-4 columns'>
                                                <div>ID: {x.id}</div>
                                            </span>
                                            <span className='small-4 columns'>
                                                Platform: {x.platform}
                                            </span>
                                            <span className='small-12 columns'>
                                                Useragent: {x.useragent}
                                            </span>
                                            <span className='small-12 columns'>
                                                <div className='callout'>
                                                    {x.message}
                                                </div>
                                                <hr/>
                                            </span>
                                        </div>;
                                    })}
                                    <div className='row'>
                                        <div className='small-6 columns'>
                                            {this.state.page > 1 ? <a className='secondary' onClick={this.prevPage}>Previous</a> : null}
                                        </div>
                                        <div className='small-6 columns text-right'>
                                            <a className='secondary' onClick={this.nextPage}>Next</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </AdminOnly>
                    </div>
                </div>
            </span>
        );
    }
}

export default BugPage;
