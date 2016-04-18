var React = require('react');

var SubmitButton = React.createClass({
    render () {
        return (
            <span>
                {this.props.submitting ? <button type='button' className='success button disabled' onClick={this.props.onSubmit}>{this.props.title}</button> : <button type='button' className='success button' onClick={this.props.onSubmit}>{this.props.title}</button>}
            </span>
        );
    }
});

module.exports = SubmitButton;
