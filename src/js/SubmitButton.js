var React = require('react');

var SubmitButton = React.createClass({
    getDefaultProps () {
        return {
            className: 'button'
        };
    },
    render () {
        var animation = {
            animationName: 'spin',
            animationDuration: '500ms',
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear'
        };
        if (this.props.submitting) {
            return <button type='button' className={this.props.className + ' disabled'} onClick={this.props.onSubmit}>{this.props.title}<span className='ion ion-load-c' style={animation}/></button>;
        }
        return <button type='button' className={this.props.className} onClick={this.props.onSubmit}>{this.props.title}</button>;
    }
});

module.exports = SubmitButton;
