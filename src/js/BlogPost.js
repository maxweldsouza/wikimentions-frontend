import React from 'react';
import Markdown from './Markdown';
import Share from './Share';
import Time from './Time';

const BlogPost = ({ title, slug, authorId, author, created, content, prev, next }) => {
    const path = `/blog/${slug}`;
    return <div>
        <a href={path}>
            <h1>{title}</h1>
        </a>
        <a
            rel='nofollow'
            href={`/users/${authorId}/${author}`}>
                {author}
        </a> on <span><Time timestamp={created} type='timestamp' format='MMMM Do YYYY'/></span>
        <hr/>
        <Markdown markdown={content}/>
        <hr/>
        <div className='row'>
            <div className='small-6 columns'>
                {prev ? <a href={`/blog/${prev}`} className=''>Previous Post</a> : null}
            </div>
            <div className='small-6 columns text-right'>
                {next ? <a href={`/blog/${next}`} className=''>Next Post</a> : null}
                <div className='row'>
                    <div className='small-12 columns'>
                        <Share title={title} path={path}/>
                    </div>
                </div>
            </div>
        </div>
    </div>;
};

export default BlogPost;
