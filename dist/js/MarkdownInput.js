'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MarkdownHelp = require('./MarkdownHelp');

var _MarkdownHelp2 = _interopRequireDefault(_MarkdownHelp);

var _Markdown = require('./Markdown');

var _Markdown2 = _interopRequireDefault(_Markdown);

var _reactAutobind = require('react-autobind');

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MarkdownInput = function (_React$Component) {
    _inherits(MarkdownInput, _React$Component);

    function MarkdownInput(props) {
        _classCallCheck(this, MarkdownInput);

        var _this = _possibleConstructorReturn(this, (MarkdownInput.__proto__ || Object.getPrototypeOf(MarkdownInput)).call(this, props));

        (0, _reactAutobind2.default)(_this);
        _this.state = {
            preview: false,
            firstChange: true
        };
        return _this;
    }

    _createClass(MarkdownInput, [{
        key: 'showPreview',
        value: function showPreview() {
            this.setState({
                preview: true
            });
        }
    }, {
        key: 'hidePreview',
        value: function hidePreview() {
            this.setState({
                preview: false
            });
        }
    }, {
        key: 'onChangeText',
        value: function onChangeText(e) {
            if (this.state.firstChange) {
                this.setState({
                    preview: true,
                    firstChange: false
                });
            }
            this.props.onChange(e);
        }
    }, {
        key: 'render',
        value: function render() {
            var layout = this.props.sideBySide && this.state.preview ? 'small-12 large-6 columns' : 'small-12 columns';
            return _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                    'div',
                    { className: layout },
                    this.props.label,
                    ' ',
                    _react2.default.createElement(_MarkdownHelp2.default, null),
                    this.state.preview ? _react2.default.createElement(
                        'a',
                        {
                            className: 'secondary float-right',
                            onClick: this.hidePreview
                        },
                        'Hide Preview'
                    ) : null,
                    this.state.preview ? null : _react2.default.createElement(
                        'a',
                        {
                            className: 'secondary float-right',
                            onClick: this.showPreview
                        },
                        'Preview'
                    ),
                    _react2.default.createElement('textarea', {
                        type: 'text',
                        name: this.props.name,
                        placeholder: this.props.placeholder,
                        value: this.props.content,
                        onChange: this.onChangeText,
                        rows: this.props.rows,
                        maxLength: this.props.maxLength
                    })
                ),
                this.state.preview ? _react2.default.createElement(
                    'div',
                    { className: layout },
                    _react2.default.createElement(
                        'strong',
                        null,
                        'Preview'
                    ),
                    _react2.default.createElement(_Markdown2.default, {
                        className: 'callout',
                        markdown: this.props.content
                    })
                ) : null
            );
        }
    }]);

    return MarkdownInput;
}(_react2.default.Component);

exports.default = MarkdownInput;