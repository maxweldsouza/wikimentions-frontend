'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Video = require('./Video');

var _Video2 = _interopRequireDefault(_Video);

var _AddVideo = require('./AddVideo');

var _AddVideo2 = _interopRequireDefault(_AddVideo);

var _Pagination = require('./Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ThingVideoTab = function ThingVideoTab(_ref) {
    var videos = _ref.videos,
        id = _ref.id,
        _ref$page = _ref.page,
        page = _ref$page === undefined ? '1' : _ref$page,
        count = _ref.count,
        loggedin = _ref.loggedin,
        path = _ref.path;

    var emptyvideos = _react2.default.createElement(
        'div',
        { className: 'card box' },
        _react2.default.createElement(
            'div',
            { className: 'blankslate' },
            _react2.default.createElement(
                'h3',
                null,
                'No Videos'
            ),
            'No videos have been added for this author. You can help us by adding some.'
        )
    );
    var nomore = _react2.default.createElement(
        'div',
        { className: 'card box' },
        _react2.default.createElement(
            'div',
            { className: 'blankslate' },
            _react2.default.createElement(
                'h3',
                null,
                'End of Videos'
            ),
            'There are no more videos to show.'
        )
    );
    return _react2.default.createElement(
        'div',
        { className: 'card-container' },
        videos.map(function (x) {
            return _react2.default.createElement(_Video2.default, {
                key: x.id,
                id: x.id,
                type: x.props.type,
                slug: x.props.slug,
                title: x.props.title,
                mentioned_count: x.mentioned_count,
                mentioned_by_count: x.mentioned_by_count,
                image: x.image,
                url: x.props.url
            });
        }),
        page === '1' && videos.length === 0 ? emptyvideos : null,
        page !== '1' && videos.length === 0 ? nomore : null,
        _react2.default.createElement(_Pagination2.default, { total: count, path: path, page: page }),
        _react2.default.createElement(
            'div',
            { className: 'card box' },
            _react2.default.createElement(
                'div',
                { className: 'small-12 columns' },
                _react2.default.createElement(_AddVideo2.default, { id: id, loggedin: loggedin })
            )
        )
    );
};

exports.default = ThingVideoTab;