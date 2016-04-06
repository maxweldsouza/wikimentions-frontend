var React = require('react');

var YoutubeEmbed = React.createClass({
    getDefaultProps () {
        return {
            width: 640,
            height: 390
        }
    },
    render () {
        return (
            <div className='flex-video'>
                <iframe id='ytplayer' type='text/html' width={this.props.width} height={this.props.height} src={'http://www.youtube.com/embed/' + this.props.videoId + '?autoplay=1'} frameBorder={0}>
                </iframe>
            </div>
        );
    }
});

module.exports = YoutubeEmbed;
