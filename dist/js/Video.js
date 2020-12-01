'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _urlParse = require('url-parse');

var _urlParse2 = _interopRequireDefault(_urlParse);

var _Link = require('./Link');

var _Link2 = _interopRequireDefault(_Link);

var _Thumbnail = require('./Thumbnail');

var _Thumbnail2 = _interopRequireDefault(_Thumbnail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Video = function Video(_ref) {
    var url = _ref.url,
        id = _ref.id,
        slug = _ref.slug,
        title = _ref.title,
        type = _ref.type,
        mentioned_count = _ref.mentioned_count,
        mentioned_by_count = _ref.mentioned_by_count;

    var parsed = (0, _urlParse2.default)(url);
    return _react2.default.createElement(
        'div',
        { className: 'card box' },
        _react2.default.createElement(
            'div',
            { className: 'small-12 columns' },
            _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                    'div',
                    { className: 'shrink columns' },
                    _react2.default.createElement(
                        'div',
                        { style: { maxWidth: 150 } },
                        _react2.default.createElement(
                            _Link2.default,
                            { id: id, slug: slug, type: 'video' },
                            _react2.default.createElement(_Thumbnail2.default, {
                                alt: title,
                                type: type,
                                url: url,
                                displayHeight: 90,
                                displayWidth: 120
                            })
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'columns' },
                    _react2.default.createElement(
                        _Link2.default,
                        {
                            id: id,
                            className: 'card-title',
                            slug: slug,
                            type: 'video'
                        },
                        title
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        '[' + parsed.hostname + ']'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement(
                            'div',
                            { className: 'columns' },
                            _react2.default.createElement(
                                _Link2.default,
                                {
                                    id: id,
                                    slug: slug,
                                    title: title,
                                    type: type,
                                    className: 'secondary card-count',
                                    tab: 'mentioned'
                                },
                                'Mentions ',
                                _react2.default.createElement(
                                    'span',
                                    { className: 'badge' },
                                    mentioned_count
                                ),
                                '  '
                            ),
                            _react2.default.createElement(
                                _Link2.default,
                                {
                                    id: id,
                                    slug: slug,
                                    title: title,
                                    type: type,
                                    className: 'secondary card-count',
                                    tab: 'mentionedby'
                                },
                                'Mentioned By ',
                                _react2.default.createElement(
                                    'span',
                                    { className: 'badge' },
                                    mentioned_by_count
                                )
                            )
                        )
                    )
                )
            )
        )
    );
};

exports.default = Video;