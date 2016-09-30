var React = require('react');
var queryString = require('query-string');
var parseUrl = require('url-parse');
var requests = require('superagent');
var config = require('./config');

var YoutubeEmbed = React.createClass({
    getDefaultProps () {
        return {
            width: 640,
            height: 390,
            autoplay: true
        };
    },
    render () {
        var embed;
        var parsed = parseUrl(this.props.url);
        if (parsed.hostname === 'www.youtube.com' || parsed.hostname === 'youtube.com') {
            var queryObject = queryString.parse(parsed.query);
            var autoplay = this.props.autoplay ? '?autoplay=1' : '';
            embed = <iframe
                id='ytplayer'
                type='text/html'
                width={this.props.width}
                height={this.props.height}
                src={'https://www.youtube.com/embed/' + queryObject.v + autoplay} frameBorder={0}></iframe>;
        } else {
            return null;
        }
        if (!this.props.embeddable) {
            return null;
        }
        return (
            <div className='flex-video widescreen'>
                {embed}
            </div>
        );
    }
});

module.exports = YoutubeEmbed;
