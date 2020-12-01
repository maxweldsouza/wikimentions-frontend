'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _urlParse = require('url-parse');

var _urlParse2 = _interopRequireDefault(_urlParse);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var YoutubeEmbed = function YoutubeEmbed(_ref) {
    var url = _ref.url,
        embeddable = _ref.embeddable,
        _ref$width = _ref.width,
        width = _ref$width === undefined ? 640 : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === undefined ? 390 : _ref$height,
        _ref$autoplay = _ref.autoplay,
        autoplay = _ref$autoplay === undefined ? true : _ref$autoplay;

    var embed = void 0;
    var parsed = (0, _urlParse2.default)(url);
    if (_utils2.default.isYoutubeUrl(url)) {
        var queryObject = _queryString2.default.parse(parsed.query);
        var query = autoplay ? '?autoplay=1' : '';
        embed = _react2.default.createElement('iframe', {
            id: 'ytplayer',
            type: 'text/html',
            width: width,
            height: height,
            src: 'https://www.youtube.com/embed/' + queryObject.v + query,
            frameBorder: 0
        });
    } else {
        return null;
    }
    if (!embeddable) {
        return null;
    }
    return _react2.default.createElement(
        'div',
        { className: 'flex-video widescreen' },
        embed
    );
};

exports.default = YoutubeEmbed;