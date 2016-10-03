var _ = require('underscore');
var parseUrl = require('url-parse');
var queryString = require('query-string');

var ellipsis = function (s, max) {
    if (_.isString(s) && s.length > max) {
        return s.substring(0, max - 3) + '...';
    }
    return s;
};

var youtubeThumb = function (url, size) {
    var parsed = parseUrl(url);
    var img;
    var sizes = {
        max: 'maxresdefault.jpg',
        large: 'mqdefault.jpg'
    };
    if (!size) {
        size = 'large';
    }
    img = sizes[size];
    if (parsed.hostname === 'www.youtube.com' || parsed.hostname === 'youtube.com') {
        var queryObject = queryString.parse(parsed.query);
        return 'https://i.ytimg.com/vi/' + queryObject.v + '/' + img;
    }
};

var isYoutubeUrl = function (url) {
    var parsed = parseUrl(url);
    return parsed.hostname === 'www.youtube.com' || parsed.hostname === 'youtube.com';
};

module.exports = {
    ellipsis: ellipsis,
    youtubeThumb: youtubeThumb,
    isYoutubeUrl: isYoutubeUrl
};
