var React = require('react');
var Image = require('./Image');
var parseUrl = require('url-parse');
var Link = require('./Link');
var Placeholder = require('./Placeholder');
var VideoApiThumb = require('./VideoApiThumb');
import Lazy from 'react-lazyload';

var Video = React.createClass({
    render () {
        var image = this.props.image;
        var videoApiThumb = <Lazy height={90}><VideoApiThumb url={this.props.url}>
            <Placeholder type='video' once/>
        </VideoApiThumb></Lazy>;
        if (image) {
            image = <Image className='img' id={this.props.id} md5={image.thumb_md5} width={image.thumb_width} height={image.thumb_height}/>;
        } else {
            image = videoApiThumb;
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
