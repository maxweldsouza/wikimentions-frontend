var React = require('react');
var Image = require('./Image');

var Video = React.createClass({
    render () {
        var imagedata, image;
        if (this.props.images.length > 0) {
            imagedata = this.props.length.images[0];
            image = <Image id={this.props.id} md5={imagedata.md5} width={imagedata.width} height={imagedata.height}/>;
        } else {
            image = <img src='/assets/video.png'/>
        }
        return (
            <div className='small-12 columns'>
                <div className='row video-block'>
                    <div className='shrink columns'>
                        {image}
                    </div>
                    <div className='columns'>
                        <a className='video-title' href={'/videos/' + this.props.id + '/' + this.props.slug}>{this.props.title}</a>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Video;
