var React = require('react');
var queryString = require('query-string');

var parseUrl = function (url) {
    var parser = document.createElement('a');
    parser.href = url;
    return {
        protocol: parser.protocol,
        host: parser.host,
        hostname: parser.hostname,
        port: parser.port,
        pathname: parser.pathname,
        hash: parser.hash,
        search: parser.search,
        origin: parser.origin
    };
}

var YoutubeEmbed = React.createClass({
    getDefaultProps () {
        return {
            width: 640,
            height: 390
        }
    },
    render () {
        var embed;
        var parsed = parseUrl(this.props.url);
        if (parsed.hostname === 'www.youtube.com' || parsed.hostname === 'youtube.com') {
            var queryObject = queryString.parse(parsed.search);
            embed = <iframe
                id='ytplayer'
                type='text/html'
                width={this.props.width}
                height={this.props.height}
                src={'http://www.youtube.com/embed/' + queryObject.v + '?autoplay=1'} frameBorder={0}></iframe>;
        } else if (parsed.hostname === 'embed-ssl.ted.com') {
            embed = <iframe src={this.props.url}
                width="640"
                height="360"
                frameBorder="0"
                scrolling="no"
                webkitallowfullscreen
                mozallowfullscreen
                allowFullScreen></iframe>;
        } else if (parsed.hostname === 'vimeo.com') {
            var id = parsed.pathname.split('/')[2];
            embed = <iframe
                src={"https://player.vimeo.com/video/" + id}
                width="500"
                height="281"
                frameborder="0"
                webkitallowfullscreen
                mozallowfullscreen
                allowfullscreen></iframe>
        } else {
            embed = <a href={thing.url}>
                <img className="" src="/assets/videolarge.png" alt=""/>
            </a>;
        }
        return (
            <div className='flex-video'>
                {embed}
            </div>
        );
    }
});

module.exports = YoutubeEmbed;
