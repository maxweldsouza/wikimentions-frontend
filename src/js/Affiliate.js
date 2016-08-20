var React = require('react');
var config = require('./config');
var store = require('store');
var _ = require('underscore');

var Affiliate = React.createClass({
    render () {
        var country = store.get('country');
        var searchTerm;
        if (this.props.isbn) {
            searchTerm = this.props.isbn;
        } else if (this.props.authors.length < 3) {
            searchTerm = this.props.title + ' ' + _.map(this.props.authors, function (x) {
                return x.props.title;
            }).join(' ');
        } else {
            searchTerm = this.props.title;
        }
        return (
            <div>
                {country === 'US' ? <div>
                    <a target='_blank' href={'http://www.amazon.com/gp/search?keywords=' + searchTerm + '&index=books&linkCode=qs&tag=' + config.affiliate['amazon.com']}>amazon.com <span className='ion-android-open'/></a>
                </div> : null}
                {country === 'IN' ? <div>
                    <a target='_blank' href={'http://www.amazon.in/gp/search?keywords=' + searchTerm + '&index=books&linkCode=qs&tag=' + config.affiliate['amazon.com']}>amazon.in <span className='ion-android-open'/></a>
                </div> : null}
            </div>
        );
    }
});

module.exports = Affiliate;
