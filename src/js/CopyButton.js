var React = require('react');
import CopyToClipboard from 'react-copy-to-clipboard';

var CopyButton = React.createClass({
    getInitialState () {
        return {
            copied: false
        };
    },
    getDefaultProps () {
        return {
            hintDirection: 'bottom',
            className: ''
        };
    },
    onCopy () {
        this.setState({
            copied: true
        });
    },
    reset () {
        this.setState({
            copied: false
        });
    },
    render () {
        var ariaLabel, cls;
        if (this.state.copied) {
            ariaLabel = 'Copied';
            cls = this.props.className + ' hint--' + this.props.hintDirection + ' hint--rounded hint--no-animate hint--success';
        } else {
            ariaLabel = this.props.ariaLabel;
            cls = this.props.className + ' hint--' + this.props.hintDirection + ' hint--rounded hint--no-animate';
        }
        return (
            <CopyToClipboard text={this.props.text} onCopy={this.onCopy}>
                <button
                    onMouseLeave={this.reset}
                    className={cls}
                    aria-label={ariaLabel}>
                    <span className='ion-clipboard' />{this.props.title}</button>
            </CopyToClipboard>
        );
    }
});

module.exports = CopyButton;
