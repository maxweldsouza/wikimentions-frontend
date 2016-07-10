var React = require('react');
var queryString = require('query-string');
var parseUrl = require('url-parse');
var requests = require('superagent');
var config = require('./config');
var Placeholder = require('./Placeholder');

var VideoApiThumb = React.createClass({
    getInitialState: function() {
        return {
            thumb: '',
            width: 0,
            height: 0
        };
    },
    componentDidMount () {
        var parsed = parseUrl(this.props.url);
        var videoId;
        if (parsed.hostname === 'www.youtube.com' || parsed.hostname === 'youtube.com') {
            var queryObject = queryString.parse(parsed.query);
            videoId = queryObject.v;
            requests.get('https://www.googleapis.com/youtube/v3/videos?part=snippet&fields=items/snippet/thumbnails/default&id=' + videoId + '&key=' + config.keys.youtube).end((err, res) => {
                if (err && err.status) {

                } else {
                    this.setState({
                        thumb: res.body.items[0].snippet.thumbnails.default.url,
                        width: res.body.items[0].snippet.thumbnails.default.width,
                        height: res.body.items[0].snippet.thumbnails.default.height
                    });
                }
            });
        }
    },
    render () {
        if (this.state.thumb) {
            return (
                <img src={this.state.thumb} width={this.state.width} height={this.state.height} />
            );
        }
        return <Placeholder type='video'/>;
    }
});

module.exports = VideoApiThumb;
