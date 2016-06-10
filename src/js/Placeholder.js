var React = require('react');

var Placeholder = React.createClass({
    render () {
        if (this.props.type === 'video') {
            return (
                <div className='placeholder placeholder-video'>
                    <span className='ion-play' />
                </div>
            );
        }
        return (
            <div className='placeholder'>
                <span className='ion-image' />
            </div>
        );
    }
});

module.exports = Placeholder;
