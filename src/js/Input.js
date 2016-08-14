var React = require('react');
var _ = require('underscore');

var Input = React.createClass({
    getDefaultProps () {
        return {
            onClear: function () {},
            value: '',
            valid: true,
            message: ''
        };
    },
    onClear () {
        this.props.onClear(this.props.name);
    },
    render () {
        var cls = this.props.valid ? this.props.className : this.props.className + ' is-invalid-input';
        var props = _.omit(this.props, 'message', 'valid', 'textarea');
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
            <span style={{position: 'relative', display: 'block'}} >
                <input {...props} className={cls}/>
                {this.props.value.length > 0 ? <span onClick={this.onClear} className='ion-backspace select-clear'/> : null}
                {this.props.valid ? null : <span className='form-error is-visible'>
                    {this.props.message}
                </span>}
            </span>
        );
    }
});

module.exports = Input;
