import React from 'react';
import Helmet from 'react-helmet';
import Navbar from './Navbar';
import config from './config';
import Markdown from './Markdown';

class ContentPage extends React.Component {
    static resources (appstate) {
        const slug = appstate.url.split('/')[0];
        return {
            api: [{
                name: 'content',
                path: `/api/v1/content/${slug}`
            }]
        };
    }
    render () {
        return (
            <span>
                <Helmet
                    title={this.props.data.content.title}
                    titleTemplate={`%s - ${config.name}`}
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
                <div className='row page-body white'>
                    <div className='small-12 large-8 columns'>
                        <h1>{this.props.data.content.title}</h1>
                        <Markdown markdown={this.props.data.content.content}/>
                    </div>
                </div>
            </span>
        );
    }
}

export default ContentPage;
