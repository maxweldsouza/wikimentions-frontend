var React = require('react');
var cookies = require('browser-cookies');
var isNode = require('./isNode');

var Xsrf = React.createClass({
    getInitialState () {
        return {
            xsrf: ''
        };
    },
    componentWillMount () {
        if (isNode.isBrowser()) {
            var cookie = cookies.get('_xsrf');
            this.setState({
                xsrf: cookie
            });
        }
    },
    render () {
        return (
            <input type='hidden' name='_xsrf' value={this.state.xsrf}/>
        );
    }
});

module.exports = Xsrf;
