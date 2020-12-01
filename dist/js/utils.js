'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _urlParse = require('url-parse');

var _urlParse2 = _interopRequireDefault(_urlParse);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ellipsis = function ellipsis(s, max) {
    if (_underscore2.default.isString(s) && s.length > max) {
        return s.substring(0, max - 3) + '...';
    }
    return s;
};

var youtubeThumb = function youtubeThumb(url, size) {
    var parsed = (0, _urlParse2.default)(url);
    var img = void 0;
    var sizes = {
        max: 'maxresdefault.jpg',
        large: 'mqdefault.jpg'
    };
    if (!size) {
        size = 'large';
    }
    img = sizes[size];
    if (parsed.hostname === 'www.youtube.com' || parsed.hostname === 'youtube.com') {
        var queryObject = _queryString2.default.parse(parsed.query);
        return 'https://i.ytimg.com/vi/' + queryObject.v + '/' + img;
    }
};

var isYoutubeUrl = function isYoutubeUrl(url) {
    var parsed = (0, _urlParse2.default)(url);
    return parsed.hostname === 'www.youtube.com' || parsed.hostname === 'youtube.com';
};

exports.default = {
    ellipsis: ellipsis,
    youtubeThumb: youtubeThumb,
    isYoutubeUrl: isYoutubeUrl
};