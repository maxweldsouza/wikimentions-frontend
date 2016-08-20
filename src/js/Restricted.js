var React = require('react');
var cookies = require('browser-cookies');
var isNode = require('./isNode');
var LoginModal = require('./LoginModal');
var SignupModal = require('./SignupModal');
var store = require('store');

var Restricted = React.createClass({
    getDefaultProps () {
        return {
            min_level: 0,
            level: 1
        };
    },
    render () {
        var message = this.props.message ? this.props.message : <span>You need to <LoginModal/> / <SignupModal/></span>;
        var session;
        var allowed;
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
});

module.exports = Restricted;
