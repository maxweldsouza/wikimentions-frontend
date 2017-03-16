import React from 'react';
import config from './config';
import store from 'store';
import _ from 'underscore';

const Affiliate = ({ isbn, authors, title }) => {
    const country = store.get('country');
    let searchTerm;
    if (isbn) {
        searchTerm = isbn;
    } else if (authors.length < 3) {
        searchTerm = `${title} ${_.map(authors, x => x.props.title).join(' ')}`;
    } else {
        searchTerm = title;
    }
    return (
        <span>
            {country === 'US' ? <span>
                <a
                className='button small alert'
                target='_blank' href={`http://www.amazon.com/gp/search?keywords=${searchTerm}&index=books&linkCode=qs&tag=${config.affiliate['amazon.com']}`} >
                Buy on Amazon.com <span className='ion-android-open'/>
                </a>
            </span> : null}
            {country === 'IN' ? <span>
                <a
                className='button small alert'
                target='_blank' href={`http://www.amazon.in/gp/search?keywords=${searchTerm}&index=books&linkCode=qs&tag=${config.affiliate['amazon.in']}`} >
                    Buy on Amazon.in <span className='ion-android-open'/>
                </a>
            </span> : null}
        </span>
    );
};

export default Affiliate;
