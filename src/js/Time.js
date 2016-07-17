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
        if (this.props.timestamp) {
            var time = moment.utc(this.props.timestamp);
            var result;
            var title = time.format('LLL');
            if (this.state.server) {
                result = time.format('DD.MM.YY H:m [GMT]');
            } else {
                if (this.props.type === 'ago') {
                    result = time.local().fromNow();
                } else if (this.props.type === 'timestamp') {
                    result = time.local().format(this.props.format);
                }
            }
            return (
                <a className='secondary' title={title}>{result}</a>
            );
        }
        return null;
    }
});

module.exports = Time;
