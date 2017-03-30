import React from 'react';
import Link from './Link';
import Thumbnail from './Thumbnail';

const HomeItem = (
    {
        id,
        slug,
        type,
        title,
        image,
        url,
        description,
        video_count,
        book_count,
        mentioned_count,
        mentioned_by_count
    }
) => {
    return (
        <div className="card box">
            <div className="shrink columns">
                <Link id={id} slug={slug} type={type}>
                    <Thumbnail
                        alt={title}
                        type={type}
                        image={image}
                        url={url}
                        displayWidth={75}
                    />
                </Link>
            </div>
            <div className="columns">
                <div className="row">
                    <span className="small-12 columns card-title">
                        <Link id={id} slug={slug} type={type}>{title}</Link>
                    </span>
                    <span className="small-12 columns">
                        {description}
                    </span>
                    <div className="small-12 columns">
                        {type === 'person'
                            ? <Link
                                  id={id}
                                  slug={slug}
                                  title={title}
                                  type={type}
                                  className="secondary card-count"
                                  tab="videos"
                              >
                                  {'Videos '}
                                  <span className="badge">
                                      {video_count}
                                  </span>{'  '}
                              </Link>
                            : null}
                        {type === 'person'
                            ? <Link
                                  id={id}
                                  slug={slug}
                                  title={title}
                                  type={type}
                                  className="secondary card-count"
                                  tab="books"
                              >
                                  {'Books '}
                                  <span className="badge">
                                      {book_count}
                                  </span>{'  '}
                              </Link>
                            : null}
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
                            </span>{'  '}
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
    );
};

export default HomeItem;
