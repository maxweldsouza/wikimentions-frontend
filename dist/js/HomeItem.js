'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Link = require('./Link');

var _Link2 = _interopRequireDefault(_Link);

var _Thumbnail = require('./Thumbnail');

var _Thumbnail2 = _interopRequireDefault(_Thumbnail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HomeItem = function HomeItem(_ref) {
    var id = _ref.id,
        slug = _ref.slug,
        type = _ref.type,
        title = _ref.title,
        image = _ref.image,
        url = _ref.url,
        description = _ref.description,
        video_count = _ref.video_count,
        book_count = _ref.book_count,
        mentioned_count = _ref.mentioned_count,
        mentioned_by_count = _ref.mentioned_by_count;

    return _react2.default.createElement(
        'div',
        { className: 'card box' },
        _react2.default.createElement(
            'div',
            { className: 'shrink columns' },
            _react2.default.createElement(
                _Link2.default,
                { id: id, slug: slug, type: type },
                _react2.default.createElement(_Thumbnail2.default, {
                    alt: title,
                    type: type,
                    image: image,
                    url: url,
                    displayWidth: 75
                })
            )
        ),
        _react2.default.createElement(
            'div',
            { className: 'columns' },
            _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                    'span',
                    { className: 'small-12 columns card-title' },
                    _react2.default.createElement(
                        _Link2.default,
                        { id: id, slug: slug, type: type },
                        title
                    )
                ),
                _react2.default.createElement(
                    'span',
                    { className: 'small-12 columns' },
                    description
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'small-12 columns' },
                    type === 'person' ? _react2.default.createElement(
                        _Link2.default,
                        {
                            id: id,
                            slug: slug,
                            title: title,
                            type: type,
                            className: 'secondary card-count',
                            tab: 'videos'
                        },
                        'Videos ',
                        _react2.default.createElement(
                            'span',
                            { className: 'badge' },
                            video_count
                        ),
                        '  '
                    ) : null,
                    type === 'person' ? _react2.default.createElement(
                        _Link2.default,
                        {
                            id: id,
                            slug: slug,
                            title: title,
                            type: type,
                            className: 'secondary card-count',
                            tab: 'books'
                        },
                        'Books ',
                        _react2.default.createElement(
                            'span',
                            { className: 'badge' },
                            book_count
                        ),
                        '  '
                    ) : null,
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
    );
};

exports.default = HomeItem;