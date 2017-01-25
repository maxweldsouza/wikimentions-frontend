import React from 'react';
import autoBind from 'react-autobind';

class TextWidget extends React.Component {
    render () {
        return (
            <div className='small-6 columns'>
                <div className='callout text-center'>
                    <div className='text-widget-label'>
                        {this.props.label}
                    </div>
                    <div className='text-widget-value'>
                        {this.props.value}
                    </div>
                </div>
            </div>
        );
    }
}

export default TextWidget;
