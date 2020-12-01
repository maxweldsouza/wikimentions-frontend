'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Markdown = require('./Markdown');

var _Markdown2 = _interopRequireDefault(_Markdown);

var _Share = require('./Share');

var _Share2 = _interopRequireDefault(_Share);

var _Time = require('./Time');

var _Time2 = _interopRequireDefault(_Time);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BlogPost = function BlogPost(_ref) {
    var title = _ref.title,
        slug = _ref.slug,
        authorId = _ref.authorId,
        author = _ref.author,
        created = _ref.created,
        content = _ref.content,
        prev = _ref.prev,
        next = _ref.next;

    var path = '/blog/' + slug;
    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            'a',
            { href: path },
            _react2.default.createElement(
                'h1',
                null,
                title
            )
        ),
        _react2.default.createElement(
            'a',
            { rel: 'nofollow', href: '/users/' + authorId + '/' + author },
            author
        ),
        ' ',
        'on',
        ' ',
        _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement(_Time2.default, {
                timestamp: created,
                type: 'timestamp',
                format: 'MMMM Do YYYY'
            })
        ),
        _react2.default.createElement('hr', null),
        _react2.default.createElement(_Markdown2.default, { markdown: content }),
        _react2.default.createElement('hr', null),
        _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
                'div',
                { className: 'small-6 columns' },
                prev ? _react2.default.createElement(
                    'a',
                    { href: '/blog/' + prev, className: '' },
                    'Previous Post'
                ) : null
            ),
            _react2.default.createElement(
                'div',
                { className: 'small-6 columns text-right' },
                next ? _react2.default.createElement(
                    'a',
                    { href: '/blog/' + next, className: '' },
                    'Next Post'
                ) : null,
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'small-12 columns' },
                        _react2.default.createElement(_Share2.default, { title: title, path: path })
                    )
                )
            )
        )
    );
};

exports.default = BlogPost;