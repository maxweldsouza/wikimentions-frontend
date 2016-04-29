var React = require('react');
var Image = require('./Image');
var parseUrl = require('url-parse');

var Video = React.createClass({
    render () {
        var imagedata, image;
        if (this.props.images.length > 0) {
            imagedata = this.props.images[0];
            image = <Image id={this.props.id} md5={imagedata.md5} width={imagedata.width} height={imagedata.height}/>;
        } else {
            image = <img src='/assets/video.png'/>;
        }
        var parsed = parseUrl(this.props.url);
        return (
            <div className='card'>
                <div className=''>
                    <div className='shrink columns'>
                        {image}
                    </div>
                    <div className='columns'>
                        <a className='card-title' href={'/videos/' + this.props.id + '/' + this.props.slug}>{this.props.title}</a>
                        <div className='video-url'>{'[' + parsed.hostname + ']'}</div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Video;
