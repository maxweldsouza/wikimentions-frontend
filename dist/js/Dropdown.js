'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dropdown = function Dropdown(_ref) {
    var isOpen = _ref.isOpen,
        onClose = _ref.onClose,
        className = _ref.className,
        children = _ref.children;

    return _react2.default.createElement(
        'span',
        {
            style: { display: isOpen ? 'inline' : 'none' },
            'aria-haspopup': true,
            'aria-expanded': isOpen
        },
        isOpen ? _react2.default.createElement('div', { className: 'dropdown-overlay', onClick: onClose }) : null,
        isOpen ? _react2.default.createElement(
            'div',
            { className: className },
            children
        ) : null
    );
};

exports.default = Dropdown;