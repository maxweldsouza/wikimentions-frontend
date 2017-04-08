import React from 'react';
import Feedback from './Feedback';
import Footer from './Footer';
import requests from 'superagent';
import Sidebar from './Sidebar';
import store from 'store';
import autoBind from 'react-autobind';

class MainComponent extends React.Component {
    static get defaultProps() {
        return {
            loggedin: false,
            username: '',
            userid: ''
        };
    }
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            sidebar: false
        };
    }
    componentDidMount() {
        const country = store.get('country');
        if (!country) {
            requests.get('/api/v1/country').end((err, res) => {
                if (err) {
                    return;
                }
                if (res.body.country) {
                    store.set('country', res.body.country);
                }
            });
        }
        console.log('Hi there !');
    }
    componentWillReceiveProps() {
        this.setState({
            sidebar: false
        });
    }
    onCloseSidebar() {
        this.setState({
            sidebar: false
        });
    }
    onToggleSidebar() {
        this.setState({
            sidebar: !this.state.sidebar
        });
    }
    render() {
        const Component = this.props.component;
        let session;
        let username;
        let userid;
        let loggedin;
        loggedin = Boolean(session);
        return (
            <div className="main-component">
                <div className="main-content">
                    <Sidebar
                        showing={this.state.sidebar}
                        onToggleSidebar={this.onCloseSidebar}
                        loggedin={this.props.loggedin}
                        username={this.props.username}
                        userid={this.props.userid}
                    />
                    <Component
                        data={this.props.data}
                        path={this.props.path}
                        query={this.props.query}
                        loggedin={this.props.loggedin}
                        username={this.props.username}
                        userid={this.props.userid}
                        toggleSidebar={this.onToggleSidebar}
                    />
                </div>
                <div className="footer-feedback">
                    <div className="row align-right">
                        <div className="small-12 large-6 columns">
                            <Feedback />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

MainComponent.propTypes = {
    query: React.PropTypes.object,
    path(props, propName, componentName) {
        if (props[propName][0] === '/') {
            return new Error(
                'Invalid prop `' +
                    propName +
                    '` supplied to' +
                    ' `' +
                    componentName +
                    '`. Validation failed.'
            );
        }
    }
};

export default MainComponent;
