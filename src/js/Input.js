import React from 'react';
import _ from 'underscore';

class Input extends React.Component {
    static get defaultProps () {
        return {
            onClear() {},
            value: '',
            valid: true,
            message: ''
        };
    }
    onClear () {
        this.props.onClear(this.props.name);
    }
    render () {
        const cls = this.props.valid ? this.props.className : `${this.props.className} is-invalid-input`;
        const props = _.omit(this.props, 'message', 'valid', 'textarea', 'onClear');
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
}

export default Input;
