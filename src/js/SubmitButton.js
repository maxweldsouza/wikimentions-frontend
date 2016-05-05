var React = require('react');

var SubmitButton = React.createClass({
    render () {
        if (this.props.submitting) {
            return <button type='button' className='button disabled' onClick={this.props.onSubmit}>{this.props.title}</button>;
        }
        return <button type='button' className='button' onClick={this.props.onSubmit}>{this.props.title}</button>;
    }
});

module.exports = SubmitButton;
