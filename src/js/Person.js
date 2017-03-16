import React from 'react';
import Link from './Link';
import Thumbnail from './Thumbnail';

const Person = ({ id, slug, title, description, type, image, book_count, video_count, mentioned_count, mentioned_by_count }) => {
    return (
        <div className='card box'>
            <div className='small-12 columns'>
                <div className='row'>
                    <div className='shrink columns'>
                        <Link id={id}
                            slug={slug}
                            type='person'>
                            <Thumbnail
                                alt={title}
                                type={type}
                                image={image}
                                shadow={true}
                                displayWidth={75} />
                        </Link>
                    </div>
                    <div className='columns'>
                        <Link
                            id={id}
                            className='card-title'
                            slug={slug}
                            type='person'>{title}</Link>
                        <div>{description}</div>
                        <div className='row'>
                            <div className='columns'>
                                <Link
                                    id={id}
                                    slug={slug}
                                    title={title}
                                    type={type}
                                    className='secondary card-count'
                                    tab='videos'>{'Videos '}<span className="badge">{video_count}</span>{'  '}
                                </Link>
                                <Link
                                    id={id}
                                    slug={slug}
                                    title={title}
                                    type={type}
                                    className='secondary card-count'
                                    tab='books'>{'Books '}<span className="badge">{book_count}</span>{'  '}
                                </Link>
                                <Link
                                    id={id}
                                    slug={slug}
                                    title={title}
                                    type={type}
                                    className='secondary card-count'
                                    tab='mentioned'>{'Mentions '}<span className="badge">{mentioned_count}</span>{'  '}
                                </Link>
                                <Link
                                    id={id}
                                    slug={slug}
                                    title={title}
                                    type={type}
                                    className='secondary card-count'
                                    tab='mentionedby'>{'Mentioned By '}<span className="badge">{mentioned_by_count}</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Person;
