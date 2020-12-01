'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCopyToClipboard = require('react-copy-to-clipboard');

var _reactCopyToClipboard2 = _interopRequireDefault(_reactCopyToClipboard);

var _reactAutobind = require('react-autobind');

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CopyButton = function (_React$Component) {
    _inherits(CopyButton, _React$Component);

    _createClass(CopyButton, null, [{
        key: 'defaultProps',
        get: function get() {
            return {
                hintDirection: 'bottom',
                className: ''
            };
        }
    }]);

    function CopyButton(props) {
        _classCallCheck(this, CopyButton);

        var _this = _possibleConstructorReturn(this, (CopyButton.__proto__ || Object.getPrototypeOf(CopyButton)).call(this, props));

        (0, _reactAutobind2.default)(_this);
        _this.state = {
            copied: false
        };
        return _this;
    }

    _createClass(CopyButton, [{
        key: 'onCopy',
        value: function onCopy() {
            this.setState({
                copied: true
            });
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.setState({
                copied: false
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var ariaLabel = void 0;
            var cls = void 0;
            if (this.state.copied) {
                ariaLabel = 'Copied';
                cls = this.props.className + ' hint--' + this.props.hintDirection + ' hint--rounded hint--no-animate hint--success';
            } else {
                ariaLabel = this.props.ariaLabel;
                cls = this.props.className + ' hint--' + this.props.hintDirection + ' hint--rounded hint--no-animate';
            }
            return _react2.default.createElement(
                _reactCopyToClipboard2.default,
                { text: this.props.text, onCopy: this.onCopy },
                _react2.default.createElement(
                    'button',
                    {
                        onMouseLeave: this.reset,
                        className: cls,
                        'aria-label': ariaLabel
                    },
                    _react2.default.createElement('span', { className: 'ion-clipboard' }),
                    this.props.title
                )
            );
        }
    }]);

    return CopyButton;
}(_react2.default.Component);

exports.default = CopyButton;