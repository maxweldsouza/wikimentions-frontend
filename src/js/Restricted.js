import React from 'react';
import cookies from 'browser-cookies';
import isNode from './isNode';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import store from 'store';
import autoBind from 'react-autobind';

class Restricted extends React.Component {
    static get defaultProps () {
        return {
            min_level: 0,
            level: 1
        };
    }
    render () {
        const message = this.props.message ? this.props.message : <span>You need to <LoginModal/> / <SignupModal/></span>;
        let session;
        let allowed;
        if (this.props.min_level === 0) {
            allowed = true;
        } else if (this.props.min_level === 1) {
            allowed = this.props.loggedin;
        } else {
            allowed = this.props.level >= this.props.min_level;
        }
        if (allowed) {
            return (
                <div>
                    {this.props.children}
                </div>
            );
        }
        return (
            <div>
                {message}
            </div>
        );
    }
}

export default Restricted;
