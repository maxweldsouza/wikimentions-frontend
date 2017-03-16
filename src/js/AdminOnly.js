import cookies from 'browser-cookies';
import isNode from './isNode';
import config from './config';

const AdminOnly = ({ children }) => {
    let admin;
    if (isNode.isBrowser()) {
        admin = cookies.get(config.admin);
    }
    if (admin) {
        return children;
    }
    return null;
};

export default AdminOnly;
