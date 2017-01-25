import React from 'react';
import config from './config';
import store from 'store';
import _ from 'underscore';
import autoBind from 'react-autobind';

class Affiliate extends React.Component {
    render () {
        const country = store.get('country');
        let searchTerm;
        if (this.props.isbn) {
            searchTerm = this.props.isbn;
        } else if (this.props.authors.length < 3) {
            searchTerm = `${this.props.title} ${_.map(this.props.authors, x => x.props.title).join(' ')}`;
        } else {
            searchTerm = this.props.title;
        }
        return (
            <span>
                {country === 'US' ? <span>
                    <a
                    className='button small alert'
                    target='_blank' href={`http://www.amazon.com/gp/search?keywords=${searchTerm}&index=books&linkCode=qs&tag=${config.affiliate['amazon.com']}`}>Buy on Amazon.com <span className='ion-android-open'/></a>
                </span> : null}
                {country === 'IN' ? <span>
                    <a
                    className='button small alert'
                    target='_blank' href={`http://www.amazon.in/gp/search?keywords=${searchTerm}&index=books&linkCode=qs&tag=${config.affiliate['amazon.in']}`}>Buy on Amazon.in <span className='ion-android-open'/></a>
                </span> : null}
            </span>
        );
    }
}

export default Affiliate;
