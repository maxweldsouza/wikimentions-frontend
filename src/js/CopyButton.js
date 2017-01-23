import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

class CopyButton extends React.Component {
    getDefaultProps () {
        return {
            hintDirection: 'bottom',
            className: ''
        };
    }
    getInitialState () {
        return {
            copied: false
        };
    }
    onCopy () {
        this.setState({
            copied: true
        });
    }
    reset () {
        this.setState({
            copied: false
        });
    }
    render () {
        let ariaLabel;
        let cls;
        if (this.state.copied) {
            ariaLabel = 'Copied';
            cls = `${this.props.className} hint--${this.props.hintDirection} hint--rounded hint--no-animate hint--success`;
        } else {
            ariaLabel = this.props.ariaLabel;
            cls = `${this.props.className} hint--${this.props.hintDirection} hint--rounded hint--no-animate`;
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
}

export default CopyButton;
