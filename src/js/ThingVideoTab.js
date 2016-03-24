var React = require('react');
var Video = require('./Video');

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
                            id={x.id}
                            slug={x.slug}
                            title={x.title}
                            />;
                })}
                <div className='small-12 columns'>
                    <a href={'/videos/' + id} className='button'>Add</a>
                </div>
            </div>
        );
    }
});

module.exports = ThingVideoTab;
