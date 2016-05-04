var React = require('react');
var config = require('./config');

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
                    <a
                        href={'http://www.facebook.com/sharer/sharer.php?u=' + config.url + this.props.path + '&title=' + this.props.title}
                        className='button'
                        style={{'background': '#3b5998'}}>
                        <span className='ion-social-facebook'/>  Share
                    </a>
                    <a
                        href={'http://twitter.com/intent/tweet?status=' + this.props.title + '+' + config.url + this.props.path}
                        className='button'
                        style={{'background': '#55aace'}}>
                        <span className='ion-social-twitter'/>  Tweet
                    </a>
                </div>
            </span>
        );
    }
});

module.exports = Share;
