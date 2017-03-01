import React from 'react';
import autoBind from 'react-autobind';

/* Having a time ago or a local timestamp prevents us from caching pages
This component renders the timestamp no the client side instead */

const toTitle = (moment, time) => {
    return time.local().format('LLL');
};

const toTime = (moment, time, format, type) => {
    if (type === 'ago') {
        return time.local().calendar(null, {
            sameDay: 'LT',
            nextDay: '[Tomorrow]',
            nextWeek: 'dddd',
            lastDay: '[Yesterday] LT',
            lastWeek: 'MMM DD[,] YYYY',
            sameElse: 'MMM DD[,] YYYY'
        });
    }
    return time.local().format(format);
};


class Time extends React.Component {
    static get defaultProps () {
        return {
            hintDirection: 'bottom'
        };
    }
    constructor (props) {
        super(props);
        autoBind(this);
        this.state = {
            server: true
        };
    }
    componentDidMount () {
        require.ensure(['moment'], require => {
            const moment = require('moment');
            const time = moment.utc(this.props.timestamp);
            this.setState({
                time: toTime(moment, time, this.props.format, this.props.type),
                title: toTitle(moment, time),
                server: false
            });
        });
    }
    render () {
        if (this.state.server) {
            return null;
        }
        return (
            <time className={`hint--${this.props.hintDirection} hint--rounded hint--no-animate`} aria-label={this.state.title} dateTime={this.props.timestamp}>{this.state.time}</time>
        );
    }
}

export default Time;
