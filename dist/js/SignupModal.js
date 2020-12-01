'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Modal = require('./Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _Signup = require('./Signup');

var _Signup2 = _interopRequireDefault(_Signup);

var _reactAutobind = require('react-autobind');

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SignupModal = function (_React$Component) {
    _inherits(SignupModal, _React$Component);

    function SignupModal(props) {
        _classCallCheck(this, SignupModal);

        var _this = _possibleConstructorReturn(this, (SignupModal.__proto__ || Object.getPrototypeOf(SignupModal)).call(this, props));

        (0, _reactAutobind2.default)(_this);
        _this.state = {
            modalIsOpen: false
        };
        return _this;
    }

    _createClass(SignupModal, [{
        key: 'onOpenModal',
        value: function onOpenModal(e) {
            this.setState({
                modalIsOpen: true
            });
            e.preventDefault();
        }
    }, {
        key: 'closeModal',
        value: function closeModal() {
            this.setState({ modalIsOpen: false });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                    'a',
                    { onClick: this.onOpenModal },
                    'Sign Up'
                ),
                _react2.default.createElement(
                    _Modal2.default,
                    {
                        isOpen: this.state.modalIsOpen,
                        onClose: this.closeModal,
                        className: 'modal-content modal-small',
                        overlayClassName: 'modal-overlay'
                    },
                    _react2.default.createElement(
                        'div',
                        { className: 'small-12 columns' },
                        _react2.default.createElement(
                            'h1',
                            null,
                            'Sign Up'
                        ),
                        _react2.default.createElement(_Signup2.default, null)
                    )
                )
            );
        }
    }]);

    return SignupModal;
}(_react2.default.Component);

exports.default = SignupModal;