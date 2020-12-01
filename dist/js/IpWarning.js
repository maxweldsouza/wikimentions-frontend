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

var IpWarning = function IpWarning(_ref) {
    var loggedin = _ref.loggedin;

    if (!loggedin) {
        return _react2.default.createElement(
            'div',
            { className: 'callout warning' },
            'Your IP address will be recorded and publicly visible. Alternatively you can',
            ' ',
            _react2.default.createElement(_LoginModal2.default, null),
            ' ',
            '/',
            ' ',
            _react2.default.createElement(_SignupModal2.default, null),
            '.'
        );
    }
    return null;
};

exports.default = IpWarning;