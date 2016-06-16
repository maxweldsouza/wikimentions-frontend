var React = require('react');

var Input = React.createClass({
    render () {
        var cls = this.props.valid ? this.props.className : this.props.className + ' is-invalid-input';
        return (
            <span>
                <input {...this.props} className={cls}/>
                {this.props.valid ? null : <span className='form-error is-visible'>
                    {this.props.message}
                </span>}
            </span>
        );
    }
});

module.exports = Input;
