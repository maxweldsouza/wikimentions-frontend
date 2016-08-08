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
            var title = time.local().format('LLL');
            if (this.state.server) {
                result = time.format('DD.MM.YY H:m [GMT]');
            } else {
                if (this.props.type === 'ago') {
                    result = time.local().calendar(null, {
                        sameDay: 'LT',
                        nextDay: '[Tomorrow]',
                        nextWeek: 'dddd',
                        lastDay: '[Yesterday] LT',
                        lastWeek: 'MMM DD[,] YYYY',
                        sameElse: 'MMM DD[,] YYYY'
                    });
                } else if (this.props.type === 'timestamp') {
                    result = time.local().format(this.props.format);
                }
            }
            return (
                <time className='hint--bottom hint--rounded hint--no-animate' aria-label={title} dateTime={this.props.timestamp}>{result}</time>
            );
        }
        return null;
    }
});

module.exports = Time;
