'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Modal = require('./Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _Markdown = require('./Markdown');

var _Markdown2 = _interopRequireDefault(_Markdown);

var _reactAutobind = require('react-autobind');

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MarkdownHelp = function (_React$Component) {
    _inherits(MarkdownHelp, _React$Component);

    function MarkdownHelp(props) {
        _classCallCheck(this, MarkdownHelp);

        var _this = _possibleConstructorReturn(this, (MarkdownHelp.__proto__ || Object.getPrototypeOf(MarkdownHelp)).call(this, props));

        (0, _reactAutobind2.default)(_this);
        _this.state = {
            modalIsOpen: false
        };
        return _this;
    }

    _createClass(MarkdownHelp, [{
        key: 'onOpenModal',
        value: function onOpenModal() {
            this.setState({
                modalIsOpen: true
            });
        }
    }, {
        key: 'onCloseModal',
        value: function onCloseModal() {
            this.setState({
                modalIsOpen: false
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var mdHelp = [['> Blockquote', '> quote'], ['**Bold**', '**text**'], ['`Code`', '`code`'], ['*Italic*', '*text*'], ['[Link]()', '[Title](http://)'], ['~~Strikethrough~~', '~~text~~']];
            return _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                    'a',
                    {
                        onClick: this.onOpenModal,
                        className: 'secondary hint--right hint--rounded hint--no-animate',
                        'aria-label': 'Markdown help'
                    },
                    _react2.default.createElement('span', { className: 'ion-help-circled' })
                ),
                _react2.default.createElement(
                    _Modal2.default,
                    {
                        isOpen: this.state.modalIsOpen,
                        onClose: this.onCloseModal,
                        className: 'modal-content modal-small',
                        overlayClassName: 'modal-overlay'
                    },
                    _react2.default.createElement(
                        'h1',
                        null,
                        'Markdown Help'
                    ),
                    _react2.default.createElement(
                        'table',
                        null,
                        _react2.default.createElement(
                            'thead',
                            null,
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    'Style'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    'Markdown'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'tbody',
                            null,
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    _react2.default.createElement(
                                        'strong',
                                        null,
                                        'Bold'
                                    )
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    '**text**'
                                )
                            ),
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    _react2.default.createElement(
                                        'code',
                                        null,
                                        'Code'
                                    )
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    '`code`'
                                )
                            ),
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    _react2.default.createElement(
                                        'i',
                                        null,
                                        'Italic'
                                    )
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    '*text*'
                                )
                            ),
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    _react2.default.createElement(
                                        'a',
                                        null,
                                        'Link'
                                    )
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    '[Title](http://)'
                                )
                            ),
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    _react2.default.createElement(
                                        'blockquote',
                                        null,
                                        'Blockquote'
                                    )
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    '> quote'
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'button',
                        {
                            className: 'button float-right',
                            onClick: this.onCloseModal
                        },
                        'Close'
                    )
                )
            );
        }
    }]);

    return MarkdownHelp;
}(_react2.default.Component);

exports.default = MarkdownHelp;