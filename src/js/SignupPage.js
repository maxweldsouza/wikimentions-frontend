import React from 'react';
import Helmet from 'react-helmet';
import Navbar from './Navbar';
import cookies from 'browser-cookies';
import Xsrf from './Xsrf';
import Signup from './Signup';
import config from './config';
import autoBind from 'react-autobind';

class SignupPage extends React.Component {
    static resources (appstate) {
        return {
            api: [
                {
                    name: 'signup',
                    path: '/api/v1/signup'
                }
            ]
        };
    }
    render () {
        return (
            <span>
                <Helmet
                    title={'Signup'}
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
                        <h1>Sign Up</h1>
                        <Signup />
                    </div>
                </div>
            </span>
        );
    }
}

export default SignupPage;
