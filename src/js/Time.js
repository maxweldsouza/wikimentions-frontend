import React from 'react';
import { utc } from 'moment';
import isNode from './isNode';
import autoBind from 'react-autobind';

/* Having a time ago or a local timestamp prevents us from caching pages
This component renders the timestamp no the client side instead */
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
    componentWillMount () {
        if (isNode.isBrowser()) {
            this.setState({
                server: false
            });
        }
    }
    render () {
        if (this.props.timestamp) {
            const time = utc(this.props.timestamp);
            let result;
            const title = time.local().format('LLL');
            if (this.state.server) {
                result = time.format('DD.MM.YY H:m [GMT]');
            } else if (this.props.type === 'ago') {
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
            return (
                <time className={`hint--${this.props.hintDirection} hint--rounded hint--no-animate`} aria-label={title} dateTime={this.props.timestamp}>{result}</time>
            );
        }
        return null;
    }
}

export default Time;
