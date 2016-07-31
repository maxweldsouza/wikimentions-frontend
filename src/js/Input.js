var React = require('react');
var _ = require('underscore');

var Input = React.createClass({
    render () {
        var cls = this.props.valid ? this.props.className : this.props.className + ' is-invalid-input';
        var props = _.omit(this.props, 'message', 'valid');
        if (this.props.textarea) {
            return (
                <span>
                    <textarea {...props} className={cls}/>
                    {this.props.valid ? null : <span className='form-error is-visible'>
                        {this.props.message}
                    </span>}
                </span>
            );
        }
        return (
            <span>
                <input {...props} className={cls}/>
                {this.props.valid ? null : <span className='form-error is-visible'>
                    {this.props.message}
                </span>}
            </span>
        );
    }
});

module.exports = Input;
