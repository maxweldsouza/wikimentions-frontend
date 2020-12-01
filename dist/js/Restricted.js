'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _LoginModal = require('./LoginModal');

var _LoginModal2 = _interopRequireDefault(_LoginModal);

var _SignupModal = require('./SignupModal');

var _SignupModal2 = _interopRequireDefault(_SignupModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Restricted = function Restricted(_ref) {
    var _ref$message = _ref.message,
        message = _ref$message === undefined ? _react2.default.createElement(
        'span',
        null,
        'You need to ',
        _react2.default.createElement(_LoginModal2.default, null),
        ' / ',
        _react2.default.createElement(_SignupModal2.default, null)
    ) : _ref$message,
        _ref$min_level = _ref.min_level,
        min_level = _ref$min_level === undefined ? 0 : _ref$min_level,
        _ref$level = _ref.level,
        level = _ref$level === undefined ? 1 : _ref$level,
        loggedin = _ref.loggedin,
        children = _ref.children;

    var allowed = void 0;
    if (min_level === 0) {
        allowed = true;
    } else if (min_level === 1) {
        allowed = loggedin;
    } else {
        allowed = level >= min_level;
    }
    if (allowed) {
        return _react2.default.createElement(
            'div',
            null,
            children
        );
    }
    return _react2.default.createElement(
        'div',
        null,
        message
    );
};

exports.default = Restricted;