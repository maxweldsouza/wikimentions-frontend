var React = require('react');
var config = require('./config');
var store = require('store');

var Affiliate = React.createClass({
    render () {
        var country = store.get('country');
        return (
            <div>
                {country === 'US' ? <div>
                    <a target='_blank' href={'http://www.amazon.com/gp/search?keywords=' + this.props.isbn + '&index=books&linkCode=qs&tag=' + config['affiliate']['amazon.com']}>amazon.com <span className='ion-android-open'/></a>
                </div> : null}
                {country === 'IN' ? <div>
                    <a target='_blank' href={'http://www.amazon.in/gp/search?keywords=' + this.props.isbn + '&index=books&linkCode=qs&tag=' + config['affiliate']['amazon.com']}>amazon.in <span className='ion-android-open'/></a>
                </div> : null}
            </div>
        );
    }
});

module.exports = Affiliate;
