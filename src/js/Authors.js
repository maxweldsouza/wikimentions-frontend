import React from 'react';
import AddAuthors from './AddAuthors';
import autoBind from 'react-autobind';

class Authors extends React.Component {
    render () {
        const authors = this.props.authors;
        const authorCount = authors.length;
        return (
            <div>
                {authorCount > 0 ? <span>
                    {'by '}
                    {authors.map((x, i) => {
                        return <a href={`/people/${x.id}/${x.props.slug}`} key={x.props.title}>
                            {x.props.title}{i === authorCount - 1 ? '' : ', '}
                        </a>;
                    })}
                </span> : null}
                <AddAuthors id={this.props.id} authors={authors} type={this.props.type} />
            </div>
        );
    }
}

export default Authors;
