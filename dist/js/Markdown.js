'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _remarkable = require('remarkable');

var _remarkable2 = _interopRequireDefault(_remarkable);

var _nofollow = require('./nofollow');

var _nofollow2 = _interopRequireDefault(_nofollow);

var _reactAutobind = require('react-autobind');

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Markdown = function (_React$Component) {
    _inherits(Markdown, _React$Component);

    function Markdown() {
        _classCallCheck(this, Markdown);

        var _this = _possibleConstructorReturn(this, (Markdown.__proto__ || Object.getPrototypeOf(Markdown)).call(this));

        _this.state = { server: true };
        return _this;
    }

    _createClass(Markdown, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            new Promise(function (resolve) {
                require.ensure([], function (require) {
                    resolve(require('remarkable'));
                });
            }).then(function (Remarkable) {
                var md = new Remarkable({
                    linkify: true
                });
                _this2.md = md;
                _this2.setState({ server: false });
            }).catch(function (err) {
                return console.log('Failed to load remarkable', err);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.state.server) {
                return null;
            }
            /* This is a dangerous area for security. Make sure
             * you know what you are doing */
            var obj = {
                __html: (0, _nofollow2.default)(this.md.render(this.props.markdown))
            };
            return _react2.default.createElement('div', {
                className: this.props.className,
                dangerouslySetInnerHTML: obj
            }); // eslint-disable-line react/no-danger
        }
    }], [{
        key: 'defaultProps',
        get: function get() {
            return {
                className: 'markdown'
            };
        }
    }]);

    return Markdown;
}(_react2.default.Component);

exports.default = Markdown;