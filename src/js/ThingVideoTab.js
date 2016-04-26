var React = require('react');
var Video = require('./Video');
var AddVideo = require('./AddVideo');

var ThingVideoTab = React.createClass({
    render () {
        var videos = this.props.videos;
        var id = this.props.id;
        var emptyvideos = <div className="small-12 columns">
            <p>No videos have been added for this author. You can help us by adding some.</p>
        </div>;
        return (
            <div className='row'>
                {videos.length === 0 ? emptyvideos : null}
                {videos.map((x) => {
                    return <Video
                            key={x.id}
                            id={x.id}
                            slug={x.slug}
                            title={x.title}
                            images={x.images}
                            />;
                })}
                <AddVideo id={this.props.id} />
            </div>
        );
    }
});

module.exports = ThingVideoTab;
