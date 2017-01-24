import React from 'react';
import Video from './Video';
import AddVideo from './AddVideo';
import Pagination from './Pagination';

class ThingVideoTab extends React.Component {
    static get defaultProps () {
        return {
            page: '1'
        };
    }
    render () {
        const videos = this.props.videos;
        const id = this.props.id;
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
        return (
            <div className='card-container'>
                {videos.map((x) => {
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
                {this.props.page === '1' && videos.length === 0 ? emptyvideos : null}
                {this.props.page !== '1' && videos.length === 0 ? nomore : null}
                <Pagination total={this.props.count} path={this.props.path} page={this.props.page}/>
                <div className='card box'>
                    <div className='small-12 columns'>
                        <AddVideo id={this.props.id} loggedin={this.props.loggedin}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ThingVideoTab;
