var React = require('react');
var cookies = require('browser-cookies');
var isNode = require('./isNode');

var Restricted = React.createClass({
    render () {
        var message = this.props.message ? this.props.message : 'You are not logged in.';
        var session;
        if (isNode.isBrowser()) {
            session = cookies.get('mentions');
        }
        var loggedin = session ? true : false;
        if (loggedin) {
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
});

module.exports = Restricted;
