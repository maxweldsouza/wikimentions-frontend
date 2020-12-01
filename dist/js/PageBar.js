'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAutobind = require('react-autobind');

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PageBar = function PageBar(_ref) {
    var id = _ref.id,
        slug = _ref.slug,
        type = _ref.type,
        noPage = _ref.noPage;

    var pagepath = void 0;
    if (type === 'video') {
        pagepath = '/videos/';
    } else if (type === 'book') {
        pagepath = '/books/';
    } else if (type === 'person') {
        pagepath = '/people/';
    } else {
        throw new Error('No page type specified');
    }
    return _react2.default.createElement(
        'div',
        { className: 'page-bar' },
        noPage ? null : _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement(
                'a',
                {
                    className: 'secondary',
                    href: pagepath + id + '/' + slug,
                    'aria-label': 'Back to page'
                },
                'Page'
            ),
            ' · '
        ),
        _react2.default.createElement(
            'a',
            {
                className: 'secondary',
                rel: 'nofollow',
                href: '/edit/' + id + '/' + slug,
                'aria-label': 'Edit this page'
            },
            'Edit'
        ),
        ' · ',
        _react2.default.createElement(
            'a',
            {
                className: 'secondary',
                rel: 'nofollow',
                href: '/discuss/' + id + '/' + slug,
                'aria-label': 'Discussion about this page'
            },
            'Discuss'
        ),
        ' · ',
        _react2.default.createElement(
            'a',
            {
                className: 'secondary',
                rel: 'nofollow',
                href: '/history/' + id + '/' + slug,
                'aria-label': 'Page edit history'
            },
            'History'
        ),
        type === 'person' ? _react2.default.createElement(
            'span',
            null,
            ' · ',
            _react2.default.createElement(
                'a',
                {
                    className: 'secondary',
                    rel: 'nofollow',
                    href: '/quotes/' + id + '/' + slug,
                    'aria-label': 'Quotes'
                },
                'Quotes'
            )
        ) : null
    );
};

exports.default = PageBar;