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

var Person = function Person(_ref) {
    var id = _ref.id,
        slug = _ref.slug,
        title = _ref.title,
        description = _ref.description,
        type = _ref.type,
        image = _ref.image,
        book_count = _ref.book_count,
        video_count = _ref.video_count,
        mentioned_count = _ref.mentioned_count,
        mentioned_by_count = _ref.mentioned_by_count;

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
                        _Link2.default,
                        { id: id, slug: slug, type: 'person' },
                        _react2.default.createElement(_Thumbnail2.default, {
                            alt: title,
                            type: type,
                            image: image,
                            shadow: true,
                            displayWidth: 75
                        })
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
                            type: 'person'
                        },
                        title
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        description
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
                                    tab: 'videos'
                                },
                                'Videos ',
                                _react2.default.createElement(
                                    'span',
                                    { className: 'badge' },
                                    video_count
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
                                    tab: 'books'
                                },
                                'Books ',
                                _react2.default.createElement(
                                    'span',
                                    { className: 'badge' },
                                    book_count
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

exports.default = Person;