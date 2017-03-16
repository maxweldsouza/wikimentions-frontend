import React from 'react';
import AddAuthors from './AddAuthors';

const Authors = ({ authors, id, type }) => {
    return <div>
        {authors.length > 0 ? <span>
            {'by '}
            {authors.map((x, i) => {
                return <a href={`/people/${x.id}/${x.props.slug}`} key={x.props.title}>
                    {x.props.title}{i === authors.length - 1 ? '' : ', '}
                </a>;
            })}
        </span> : null}
        <AddAuthors id={id} authors={authors} type={type} />
    </div>;
};

export default Authors;
