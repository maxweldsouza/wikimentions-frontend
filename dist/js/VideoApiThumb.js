'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _urlParse = require('url-parse');

var _urlParse2 = _interopRequireDefault(_urlParse);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _reactAutobind = require('react-autobind');

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var humanizeDuration = function humanizeDuration(moment, ptduration) {
    var ms = moment.duration(ptduration).asMilliseconds();
    if (ms >= 3600000) {
        return moment.utc(ms).format('h:mm:ss');
    }
    return moment.utc(ms).format('m:ss');
};

var VideoApiThumb = function (_React$Component) {
    _inherits(VideoApiThumb, _React$Component);

    function VideoApiThumb(props) {
        _classCallCheck(this, VideoApiThumb);

        var _this = _possibleConstructorReturn(this, (VideoApiThumb.__proto__ || Object.getPrototypeOf(VideoApiThumb)).call(this, props));

        (0, _reactAutobind2.default)(_this);
        _this.state = {
            thumb: '',
            width: 120,
            height: 90,
            duration: ''
        };
        return _this;
    }

    _createClass(VideoApiThumb, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var parsed = (0, _urlParse2.default)(this.props.url);
            var videoId = void 0;
            if (this.state.thumb) {
                return;
            }
            if (_utils2.default.isYoutubeUrl(this.props.url)) {
                var queryObject = _queryString2.default.parse(parsed.query);
                videoId = queryObject.v;
                _superagent2.default.get('https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&fields=items(contentDetails/duration,snippet/thumbnails/default)&id=' + videoId + '&key=' + _config2.default.keys.youtube).end(function (err, res) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    new Promise(function (resolve) {
                        require.ensure([], function (require) {
                            resolve(require('moment'));
                        });
                    }).then(function (moment) {
                        try {
                            _this2.setState({
                                thumb: res.body.items[0].snippet.thumbnails.default.url,
                                width: res.body.items[0].snippet.thumbnails.default.width,
                                height: res.body.items[0].snippet.thumbnails.default.height,
                                duration: humanizeDuration(moment, res.body.items[0].contentDetails.duration)
                            });
                        } catch (e) {
                            console.log(e);
                        }
                    });
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.state.thumb) {
                return _react2.default.createElement(
                    'span',
                    { className: 'video-duration-container' },
                    _react2.default.createElement('img', {
                        src: this.state.thumb,
                        width: this.state.width,
                        height: this.state.height,
                        style: this.props.style,
                        alt: this.props.alt
                    }),
                    this.state.duration ? _react2.default.createElement(
                        'span',
                        { className: 'video-duration' },
                        this.state.duration
                    ) : null
                );
            }
            return this.props.children;
        }
    }]);

    return VideoApiThumb;
}(_react2.default.Component);

exports.default = VideoApiThumb;