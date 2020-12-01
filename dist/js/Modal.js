'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _velocityReact = require('velocity-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Modal = function Modal(_ref) {
    var isOpen = _ref.isOpen,
        overlayClassName = _ref.overlayClassName,
        onClose = _ref.onClose,
        className = _ref.className,
        children = _ref.children;

    return _react2.default.createElement(
        'span',
        { style: { display: isOpen ? 'inline' : 'none' }, role: 'dialog' },
        _react2.default.createElement(
            _velocityReact.VelocityTransitionGroup,
            {
                enter: { animation: 'fadeIn' },
                leave: { animation: 'fadeOut' }
            },
            isOpen ? _react2.default.createElement('div', { className: overlayClassName, onClick: onClose }) : null
        ),
        _react2.default.createElement(
            _velocityReact.VelocityTransitionGroup,
            {
                enter: { animation: 'fadeIn' },
                leave: { animation: 'fadeOut' }
            },
            _react2.default.createElement(
                'div',
                { className: className, role: 'document' },
                _react2.default.createElement('div', {
                    className: 'ion-close modal-close',
                    onClick: onClose,
                    'aria-label': 'Close'
                }),
                children
            )
        )
    );
};

exports.default = Modal;