import React from 'react';
import cookies from 'browser-cookies';
import isNode from './isNode';
import config from './config';
import autoBind from 'react-autobind';

class AdminOnly extends React.Component {
    render () {
        let session;
        let admin;
        if (isNode.isBrowser()) {
            session = cookies.get('mentions');
            admin = cookies.get(config.admin);
        }
        const loggedin = session ? true : false;
        if (admin) {
            return this.props.children;
        }
        return null;
    }
}

export default AdminOnly;
