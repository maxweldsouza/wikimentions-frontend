import React from 'react';
import Link from './Link';
import Thumbnail from './Thumbnail';

const Book = (
    {
        id,
        slug,
        title,
        type,
        image,
        description,
        mentioned_count,
        mentioned_by_count
    }
) => {
    return (
        <div className="card box">
            <div className="small-12 columns">
                <div className="row">
                    <div className="shrink columns">
                        <Link id={id} slug={slug} type="book">
                            <Thumbnail
                                alt={title}
                                type={type}
                                image={image}
                                shadow={true}
                                displayWidth={75}
                            />
                        </Link>
                    </div>
                    <div className="columns">
                        <Link
                            id={id}
                            className="card-title"
                            slug={slug}
                            type="book"
                        >
                            {title}
                        </Link>
                        <div>{description}</div>
                        <div className="row">
                            <div className="columns">
                                <Link
                                    id={id}
                                    slug={slug}
                                    title={title}
                                    type={type}
                                    className="secondary card-count"
                                    tab="mentioned"
                                >
                                    {'Mentions '}
                                    <span className="badge">
                                        {mentioned_count}
                                    </span>
                                    {'  '}
                                </Link>
                                <Link
                                    id={id}
                                    slug={slug}
                                    title={title}
                                    type={type}
                                    className="secondary card-count"
                                    tab="mentionedby"
                                >
                                    {'Mentioned By '}
                                    <span className="badge">
                                        {mentioned_by_count}
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Book;
