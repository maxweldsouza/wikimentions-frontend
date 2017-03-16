import React from 'react';
import Video from './Video';
import AddVideo from './AddVideo';
import Pagination from './Pagination';

const ThingVideoTab = ({ videos, id, page = '1', count, loggedin, path }) => {
    const emptyvideos = <div className='card box'>
        <div className='blankslate'>
            <h3>No Videos</h3>
            No videos have been added for this author. You can help us by adding some.
        </div>
    </div>;
    const nomore = <div className='card box'>
        <div className='blankslate'>
            <h3>End of Videos</h3>
            There are no more videos to show.
        </div>
    </div>;
    return <div className='card-container'>
        {videos.map(x => {
            return <Video
                    key={x.id}
                    id={x.id}
                    type={x.props.type}
                    slug={x.props.slug}
                    title={x.props.title}
                    mentioned_count={x.mentioned_count}
                    mentioned_by_count={x.mentioned_by_count}
                    image={x.image}
                    url={x.props.url}
                    />;
        })}
        {page === '1' && videos.length === 0 ? emptyvideos : null}
        {page !== '1' && videos.length === 0 ? nomore : null}
        <Pagination total={count} path={path} page={page}/>
        <div className='card box'>
            <div className='small-12 columns'>
                <AddVideo id={id} loggedin={loggedin}/>
            </div>
        </div>
    </div>;
};

export default ThingVideoTab;
