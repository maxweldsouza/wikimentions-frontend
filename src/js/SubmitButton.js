var React = require('react');

var SubmitButton = React.createClass({
    getDefaultProps () {
        return {
            className: 'button'
        };
    },
    render () {
        var animation = {
            animationName: 'spinner-animation',
            animationDuration: '350ms',
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear'
        };
        if (this.props.submitting) {
            return <button
                type='button'
                className={this.props.className + ' loading'}>{this.props.title}
            </button>;
        }
        if (this.props.confirm === false) {
            return <button type='button' className={this.props.className + ' disabled'} onClick={this.props.onSubmit}>{this.props.title}</button>;
        }
        return <button type='button' className={this.props.className} onClick={this.props.onSubmit}>{this.props.title}</button>;
    }
});

module.exports = SubmitButton;
