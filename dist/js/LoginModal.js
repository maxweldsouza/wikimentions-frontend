'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Modal = require('./Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _Login = require('./Login');

var _Login2 = _interopRequireDefault(_Login);

var _reactAutobind = require('react-autobind');

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoginModal = function (_React$Component) {
    _inherits(LoginModal, _React$Component);

    function LoginModal(props) {
        _classCallCheck(this, LoginModal);

        var _this = _possibleConstructorReturn(this, (LoginModal.__proto__ || Object.getPrototypeOf(LoginModal)).call(this, props));

        (0, _reactAutobind2.default)(_this);
        _this.state = {
            showing: false
        };
        return _this;
    }

    _createClass(LoginModal, [{
        key: 'onOpen',
        value: function onOpen() {
            this.setState({
                showing: true
            });
        }
    }, {
        key: 'onClose',
        value: function onClose() {
            this.setState({ showing: false });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                    'a',
                    { onClick: this.onOpen },
                    'Login'
                ),
                _react2.default.createElement(
                    _Modal2.default,
                    {
                        isOpen: this.state.showing,
                        onClose: this.onClose,
                        className: 'modal-content modal-small',
                        overlayClassName: 'modal-overlay'
                    },
                    _react2.default.createElement(
                        'div',
                        { className: 'small-12 columns' },
                        _react2.default.createElement(_Login2.default, { onLogin: this.onClose })
                    )
                )
            );
        }
    }]);

    return LoginModal;
}(_react2.default.Component);

exports.default = LoginModal;