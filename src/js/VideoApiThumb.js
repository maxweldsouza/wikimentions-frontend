var React = require('react');
var queryString = require('query-string');
var parseUrl = require('url-parse');
var requests = require('superagent');
var config = require('./config');

var VideoApiThumb = React.createClass({
    getInitialState () {
        return {
            thumb: '',
            width: 120,
            height: 90
        };
    },
    componentDidMount () {
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
        if (this.state.thumb) {
            return <img src={this.state.thumb} width={this.state.width} height={this.state.height} style={this.props.style} alt={this.props.alt}/>;
        }
        return this.props.children;
    }
});

module.exports = VideoApiThumb;
