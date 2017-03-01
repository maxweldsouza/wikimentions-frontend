import React from 'react';
import cookies from 'browser-cookies';
import isNode from './isNode';
import config from './config';

class AdminOnly extends React.Component {
    render () {
        let admin;
        if (isNode.isBrowser()) {
            admin = cookies.get(config.admin);
        }
        if (admin) {
            return this.props.children;
        }
        return null;
    }
}

export default AdminOnly;
