var React = require('react');
var Image = require('./Image');

var Video = React.createClass({
    render () {
        return (
            <div className='small-12 columns'>
                <div className='row video-block'>
                    <div className='shrink columns'>
                        <Image id={this.props.id} md5={this.props.image.md5} width={this.props.image.width} height={this.props.image.height}/>
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
