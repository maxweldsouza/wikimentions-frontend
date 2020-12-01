'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Markdown = require('./Markdown');

var _Markdown2 = _interopRequireDefault(_Markdown);

var _Time = require('./Time');

var _Time2 = _interopRequireDefault(_Time);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Comment = function Comment(_ref) {
    var user = _ref.user,
        name = _ref.name,
        posted = _ref.posted,
        text = _ref.text;

    return _react2.default.createElement(
        'div',
        { className: 'small-12 columns' },
        _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
                'div',
                { className: 'small-6 columns' },
                _react2.default.createElement(
                    'strong',
                    null,
                    _react2.default.createElement(
                        'a',
                        { rel: 'nofollow', href: '/users/' + user + '/' + name },
                        name
                    )
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'small-6 columns text-right discuss-updated' },
                _react2.default.createElement(_Time2.default, {
                    timestamp: posted,
                    type: 'ago',
                    hintDirection: 'bottom-left'
                })
            ),
            _react2.default.createElement(
                'div',
                { className: 'small-12 columns' },
                _react2.default.createElement(_Markdown2.default, { markdown: text })
            )
        ),
        _react2.default.createElement('hr', null)
    );
};

exports.default = Comment;