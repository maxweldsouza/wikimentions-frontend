var React = require('react');

var Share= React.createClass({
    getInitialState () {
        return {
            open: false
        };
    },
    render () {
        return (
            <span>
                <button className='button'>
                    Share <span className='ion-social-facebook'/>
                </button>
                <button className='button'>
                    Tweet <span className='ion-social-twitter'/>
                </button>
            </span>
        );
    }
});

module.exports = Share;
