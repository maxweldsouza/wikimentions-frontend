var React = require('react');
var LoginModal = require('./LoginModal');
var SignupModal = require('./SignupModal');

var IpWarning = React.createClass({
    render () {
        var loggedin;
        if (this.props.loggedin) {
            return null;
        } else {
            return (
                <div className='callout warning'>
                    Your IP address will be recorded and publicly visible. Alternatively you can <LoginModal/> / <SignupModal/>.
                </div>
            );
        }
    }
});

module.exports = IpWarning;
