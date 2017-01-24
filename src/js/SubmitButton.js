import React from 'react';

class SubmitButton extends React.Component {
    static get defaultProps () {
        return {
            className: 'button'
        };
    }
    render () {
        const animation = {
            animationName: 'spinner-animation',
            animationDuration: '350ms',
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear'
        };
        if (this.props.submitting) {
            return <button
                type='submit'
                className={`${this.props.className} loading`}>{this.props.title}
            </button>;
        }
        if (this.props.confirm === false) {
            return <button type='submit' className={`${this.props.className} disabled`} onClick={this.props.onSubmit}>{this.props.title}</button>;
        }
        return <button type='submit' className={this.props.className} onClick={this.props.onSubmit}>{this.props.title}</button>;
    }
}

export default SubmitButton;
