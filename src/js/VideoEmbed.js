var React = require('react');
var queryString = require('query-string');
var parseUrl = require('url-parse');

var YoutubeEmbed = React.createClass({
    getDefaultProps () {
        return {
            width: 640,
            height: 390
        };
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
                src={'http://www.youtube.com/embed/' + queryObject.v + '?autoplay=1'} frameBorder={0}></iframe>;
        } else if (parsed.hostname === 'embed-ssl.ted.com') {
            embed = <iframe src={this.props.url}
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
            var url = this.props.url + '/embed';
            embed = <iframe
                src={url}
                width='500'
                height='281'
                frameBorder='0'
                webkitAllowFullScreen
                mozAllowFullScreen
                allowFullScreen></iframe>;
        } else {
            embed = <a href={this.props.url}>
                <img className='' src='/assets/videolarge.png' alt=''/>
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
