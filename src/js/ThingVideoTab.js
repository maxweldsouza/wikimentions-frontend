var React = require('react');
var Video = require('./Video');
var AddVideo = require('./AddVideo');
var Pagination = require('./Pagination');

var ThingVideoTab = React.createClass({
    render () {
        var videos = this.props.videos;
        var id = this.props.id;
        var emptyvideos = <div className='card'>
            <div className="small-12 columns">
            No videos have been added for this author. You can help us by adding some.
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
                            image={x.image}
                            url={x.props.url}
                            />;
                })}
                {videos.length === 0 ? emptyvideos : null}
                <Pagination count={this.props.count} path={this.props.path} page={this.props.page}/>
                <div className='card box'>
                    <div className='small-12 columns'>
                        <AddVideo id={this.props.id} />
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ThingVideoTab;
