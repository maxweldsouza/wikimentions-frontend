import React from 'react';
import Markdown from './Markdown';
import Time from './Time';

const Comment = ({ user, name, posted, text }) => {
    return <div className='small-12 columns'>
        <div className='row'>
            <div className='small-6 columns'>
                <strong>
                    <a
                        rel='nofollow' href={`/users/${user}/${name}`}>
                        {name}
                    </a>
                </strong>
            </div>
            <div className='small-6 columns text-right discuss-updated'>
                <Time
                    timestamp={posted}
                    type='ago'
                    hintDirection='bottom-left'/>
            </div>
            <div className='small-12 columns'>
                <Markdown markdown={text} />
            </div>
        </div>
        <hr/>
    </div>;
};

export default Comment;
