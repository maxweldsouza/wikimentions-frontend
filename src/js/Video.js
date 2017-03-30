import React from 'react';
import parseUrl from 'url-parse';
import Link from './Link';
import Thumbnail from './Thumbnail';

const Video = (
    { url, id, slug, title, type, mentioned_count, mentioned_by_count }
) => {
    const parsed = parseUrl(url);
    return (
        <div className="card box">
            <div className="small-12 columns">
                <div className="row">
                    <div className="shrink columns">
                        <div style={{ maxWidth: 150 }}>
                            <Link id={id} slug={slug} type="video">
                                <Thumbnail
                                    alt={title}
                                    type={type}
                                    url={url}
                                    displayHeight={90}
                                    displayWidth={120}
                                />
                            </Link>
                        </div>
                    </div>
                    <div className="columns">
                        <Link
                            id={id}
                            className="card-title"
                            slug={slug}
                            type="video"
                        >
                            {title}
                        </Link>
                        <div>{`[${parsed.hostname}]`}</div>
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

export default Video;
