import React from 'react';
import Helmet from 'react-helmet';
import Navbar from './Navbar';
import cookies from 'browser-cookies';
import Xsrf from './Xsrf';
import requests from 'superagent';
import Snackbar from './Snackbar';
import Login from './Login';
import config from './config';

class LoginPage extends React.Component {
    static resources (appstate) {
        return {
            api: []
        };
    }
    render () {
        return (
            <span>
                <Helmet
                    title={'Login'}
                    titleTemplate={`%s - ${config.name}`}
                    meta={[
                        {'name': 'description', 'content': ''}
                    ]}
                    link={[
                        {'rel': 'canonical', 'href': ''}
                    ]}
                    />
                <Navbar
                    loggedin={this.props.loggedin}
                    username={this.props.username}
                    userid={this.props.userid}
                    toggleSidebar={this.props.toggleSidebar}/>
                <div className='row page-body align-center white'>
                    <div className='small-12 large-6 columns'>
                        <Login redirect='/'/>
                    </div>
                </div>
            </span>
        );
    }
}


export default LoginPage;
