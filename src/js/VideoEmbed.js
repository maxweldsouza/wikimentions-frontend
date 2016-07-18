var React = require('react');
var queryString = require('query-string');
var parseUrl = require('url-parse');
var requests = require('superagent');
var config = require('./config');

var YoutubeEmbed = React.createClass({
    getDefaultProps () {
        return {
            width: 640,
            height: 390
        };
    },
    getInitialState () {
        return {
            embeddable: false
        };
    },
    componentDidMount () {
        var parsed = parseUrl(this.props.url);
        if (parsed.hostname === 'www.youtube.com' || parsed.hostname === 'youtube.com') {
            var queryObject = queryString.parse(parsed.query);
            requests.get('https://www.googleapis.com/youtube/v3/videos?part=status&fields=items/status&id=' + queryObject.v + '&key=' + config.keys.youtube).end((err, res) => {
                if (err) {
                    return;
                }
                try {
                    if (res.body.items[0].status.embeddable
                        && res.body.items[0].status.privacyStatus === 'public'
                        && res.body.items[0].status.uploadStatus === 'processed') {
                        this.setState({
                            embeddable: true
                        });
                    }
                } catch (e) {
                    return;
                }
            });
        }
    },
    render () {
        var embed;
        var parsed = parseUrl(this.props.url);
        if (parsed.hostname === 'www.youtube.com' || parsed.hostname === 'youtube.com') {
            var queryObject = queryString.parse(parsed.query);
            embed = <iframe
                id='ytplayer'
                type='text/html'
                width={this.props.width}
                height={this.props.height}
                src={'https://www.youtube.com/embed/' + queryObject.v + '?autoplay=1'} frameBorder={0}></iframe>;
        } else if (parsed.hostname === 'embed-ssl.ted.com') {
            embed = <iframe src={'https://' + parsed.hostname + parsed.pathname + parsed.query}
                width='640'
                height='360'
                frameBorder='0'
                scrolling='no'
                webkitAllowFullScreen
                mozAllowFullScreen
                allowFullScreen></iframe>;
        } else if (parsed.hostname === 'vimeo.com') {
            var id = parsed.pathname.split('/')[2];
            embed = <iframe
                src={'https://player.vimeo.com/video/' + id}
                width='500'
                height='281'
                frameBorder='0'
                webkitAllowFullScreen
                mozAllowFullScreen
                allowFullScreen></iframe>;
        } else if (parsed.hostname === 'www.cornell.edu') {
            var url = 'https://' + parsed.hostname + parsed.pathname + '/embed';
            embed = <iframe
                src={url}
                width='500'
                height='281'
                frameBorder='0'
                webkitAllowFullScreen
                mozAllowFullScreen
                allowFullScreen></iframe>;
        } else {
            return null;
        }
        if (!this.state.embeddable) {
            return null;
        }
        return (
            <div className='flex-video'>
                {embed}
            </div>
        );
    }
});

module.exports = YoutubeEmbed;
