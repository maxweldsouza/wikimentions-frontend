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
                <div className='button-group small'>
                    <button className='button' style={{'background': '#3b5998'}}>
                        <span className='ion-social-facebook'/>  Share
                    </button>
                    <button className='button' style={{'background': '#55aace'}}>
                        <span className='ion-social-twitter'/>  Tweet
                    </button>
                </div>
            </span>
        );
    }
});

module.exports = Share;
