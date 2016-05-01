var React = require('react');

var Share= React.createClass({
    getInitialState () {
        return {
            open: false
        };
    },
    render () {
        return (
            <button className='button'>
                Share <span className='ion-share'/>
            </button>
        );
    }
});

module.exports = Share;
