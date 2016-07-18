var React = require('react');
var queryString = require('query-string');
var parseUrl = require('url-parse');
var requests = require('superagent');
var config = require('./config');
var Placeholder = require('./Placeholder');
var Lazy = require('react-lazy-load');

var VideoApiThumb = React.createClass({
    getInitialState () {
        return {
            thumb: '',
            width: 0,
            height: 0
        };
    },
    loadThumbFromApi () {
        var parsed = parseUrl(this.props.url);
        var videoId;
        if (this.state.thumb) {
            return;
        }
        if (parsed.hostname === 'www.youtube.com' || parsed.hostname === 'youtube.com') {
            var queryObject = queryString.parse(parsed.query);
            videoId = queryObject.v;
            requests.get('https://www.googleapis.com/youtube/v3/videos?part=snippet&fields=items/snippet/thumbnails/default&id=' + videoId + '&key=' + config.keys.youtube).end((err, res) => {
                if (err) {
                    return;
                }
                try {
                    this.setState({
                        thumb: res.body.items[0].snippet.thumbnails.default.url,
                        width: res.body.items[0].snippet.thumbnails.default.width,
                        height: res.body.items[0].snippet.thumbnails.default.height
                    });
                } catch (e) {
                    return;
                }
            });
        }
    },
    render () {
        return <Lazy onContentVisible={this.loadThumbFromApi} height={90}>
            {this.state.thumb ? <img src={this.state.thumb} width={this.state.width} height={this.state.height} /> : <Placeholder type='video'/>}
        </Lazy>;
    }
});

module.exports = VideoApiThumb;
