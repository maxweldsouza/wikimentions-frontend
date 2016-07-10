var React = require('react');
var config = require('./config');

var Affiliate = React.createClass({
    render () {
        return (
            <div>
                <div>
                    <a target='_blank' href={'http://www.amazon.com/gp/search?keywords=' + this.props.isbn + '&index=books&linkCode=qs&tag=' + config['affiliate']['amazon.com']}>amazon.com <span className='ion-android-open'/></a>
                </div>
                <div>
                    <a target='_blank' href={'http://www.amazon.in/gp/search?keywords=' + this.props.isbn + '&index=books&linkCode=qs&tag=' + config['affiliate']['amazon.com']}>amazon.in <span className='ion-android-open'/></a>
                </div>
            </div>
        );
    }
});

module.exports = Affiliate;
