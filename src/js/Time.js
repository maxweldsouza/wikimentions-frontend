var React = require('react');
var moment = require('moment');
var isNode = require('./isNode');

/* Having a time ago or a local timestamp prevents us from caching pages
This component renders the timestamp no the client side insetad */
var Time = React.createClass({
    getInitialState: function () {
        return {
            server: true
        };
    },
    componentWillMount: function () {
        if (isNode.isBrowser()) {
            this.setState({
                server: false
            });
        }
    },
    render () {
        var result;
        if (this.state.server) {
            result = moment.utc(this.props.timestamp).format('DD.MM.YY H:m [GMT]');
        } else {
            if (this.props.type === 'ago') {
                result = moment.utc(this.props.timestamp).local().fromNow();
            } else if (this.props.type === 'timestamp') {
                result = moment.utc(this.props.timestamp).local().format(this.props.format);
            }
        }
        return (
            <span>{result}</span>
        );
    }
});

module.exports = Time;
