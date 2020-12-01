'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SubmitButton = function SubmitButton(_ref) {
    var submitting = _ref.submitting,
        _ref$className = _ref.className,
        className = _ref$className === undefined ? 'button' : _ref$className,
        title = _ref.title,
        onSubmit = _ref.onSubmit,
        confirm = _ref.confirm;

    if (submitting) {
        return _react2.default.createElement(
            'button',
            { type: 'submit', className: className + ' loading' },
            title
        );
    }
    if (confirm === false) {
        return _react2.default.createElement(
            'button',
            {
                type: 'submit',
                className: className + ' disabled',
                onClick: onSubmit
            },
            title
        );
    }
    return _react2.default.createElement(
        'button',
        { type: 'submit', className: className, onClick: onSubmit },
        title
    );
};

exports.default = SubmitButton;