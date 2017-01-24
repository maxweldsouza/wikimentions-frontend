import React from 'react';
import Helmet from 'react-helmet';
import Navbar from './Navbar';
import _ from 'underscore';
import config from './config';

class ContributePage extends React.Component {
    static resources (appstate) {
        return {
            api: [
            ]
        };
    }
    constructor (props) {
        super(props);
        this.state = {
            tab: 'edits'
        };
    }
    changeTab (tab) {
        this.setState({
            tab
        });
    }
    render () {
        return (
            <span>
                <Helmet
                    title={'Contribute'}
                    titleTemplate={`%s - ${config.name}`}
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
                        <div className='row'>
                            <div className='small-12 columns'>
                                <h1>Contribute</h1>
                                <div>
                                    <a href='/site-stats'>Site Statistics</a>
                                </div>
                                <hr/>
                                Objects
                                <div>
                                    <a href='/maintenance/book_without_author/50/0'>Books Without Author</a>
                                </div>
                                <div>
                                    <a href='/maintenance/missing_isbn/50/0'>Missing ISBNs</a>
                                </div>
                                <div>
                                    <a href='/maintenance/person_without_description/50/0'>Person Without Description</a>
                                </div>
                                <hr/>
                                <div>
                                    <a href='/site-stats'>People without books or videos</a>
                                </div>
                                <div>
                                    <a href='/site-stats'>Videos without Mentions</a>
                                </div>
                                <div>
                                    <a href='/site-stats'>Books without Mentions</a>
                                </div>
                                <hr/>
                                <div>
                                    <a href='/recent-discussions'>Recent Discussions</a>
                                </div>
                                <div>
                                    <a href='/recent-changes'>Recent Changes</a>
                                </div>
                                <h2>Reported</h2>
                                <div>
                                    <a href='/site-stats'>Incorrect Info</a>
                                </div>
                                <div>
                                    <a href='/site-stats'>Missing Books</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        );
    }
}

export default ContributePage;
