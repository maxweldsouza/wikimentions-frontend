var React = require('react');

var TextWidget = React.createClass({
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
});

module.exports = TextWidget;
