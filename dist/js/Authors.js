'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AddAuthors = require('./AddAuthors');

var _AddAuthors2 = _interopRequireDefault(_AddAuthors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Authors = function Authors(_ref) {
    var authors = _ref.authors,
        id = _ref.id,
        type = _ref.type;

    return _react2.default.createElement(
        'div',
        null,
        authors.length > 0 ? _react2.default.createElement(
            'span',
            null,
            'by ',
            authors.map(function (x, i) {
                return _react2.default.createElement(
                    'a',
                    {
                        href: '/people/' + x.id + '/' + x.props.slug,
                        key: x.props.title
                    },
                    x.props.title,
                    i === authors.length - 1 ? '' : ', '
                );
            })
        ) : null,
        _react2.default.createElement(_AddAuthors2.default, { id: id, authors: authors, type: type })
    );
};

exports.default = Authors;