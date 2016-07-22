var React = require('react');
var cookies = require('browser-cookies');
var isNode = require('./isNode');
var config = require('./config');

var AdminOnly = React.createClass({
    render () {
        var session, admin;
        if (isNode.isBrowser()) {
            session = cookies.get('mentions');
            admin = cookies.get(config.admin);
        }
        var loggedin = session ? true : false;
        if (admin) {
            return (
                <div>
                    {this.props.children}
                </div>
            );
        }
        return null;
    }
});

module.exports = AdminOnly;
