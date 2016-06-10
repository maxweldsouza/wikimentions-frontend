var React = require('react');
var Image = require('./Image');
var parseUrl = require('url-parse');
var Link = require('./Link');
var Placeholder = require('./Placeholder');

var Video = React.createClass({
    render () {
        var imagedata, image;
        if (this.props.images.length > 0) {
            imagedata = this.props.images[0];
            image = <Image id={this.props.id} md5={imagedata.md5} width={imagedata.width} height={imagedata.height}/>;
        } else {
            image = <Placeholder type='video'/>;
        }
        var parsed = parseUrl(this.props.url);
        return (
            <div className='card'>
                <div className='small-12 columns'>
                    <div className='row'>
                        <div className='shrink columns'>
                            <div style={{maxWidth: 150}}>
                                <Link id={this.props.id}
                                    slug={this.props.slug}
                                    type='video'>{image}</Link>
                            </div>
                        </div>
                        <div className='columns'>
                            <Link
                                id={this.props.id}
                                className='card-title'
                                slug={this.props.slug}
                                type='video'>{this.props.title}</Link>
                            <div>{'[' + parsed.hostname + ']'}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Video;
