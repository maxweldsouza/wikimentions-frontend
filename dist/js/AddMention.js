'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _browserCookies = require('browser-cookies');

var _browserCookies2 = _interopRequireDefault(_browserCookies);

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _IpWarning = require('./IpWarning');

var _IpWarning2 = _interopRequireDefault(_IpWarning);

var _LoginModal = require('./LoginModal');

var _LoginModal2 = _interopRequireDefault(_LoginModal);

var _urlParse = require('url-parse');

var _urlParse2 = _interopRequireDefault(_urlParse);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _Restricted = require('./Restricted');

var _Restricted2 = _interopRequireDefault(_Restricted);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _SignupModal = require('./SignupModal');

var _SignupModal2 = _interopRequireDefault(_SignupModal);

var _snackbar = require('./snackbar');

var _snackbar2 = _interopRequireDefault(_snackbar);

var _SubmitButton = require('./SubmitButton');

var _SubmitButton2 = _interopRequireDefault(_SubmitButton);

var _reactAutobind = require('react-autobind');

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddMention = function (_React$Component) {
    _inherits(AddMention, _React$Component);

    function AddMention(props) {
        _classCallCheck(this, AddMention);

        var _this = _possibleConstructorReturn(this, (AddMention.__proto__ || Object.getPrototypeOf(AddMention)).call(this, props));

        (0, _reactAutobind2.default)(_this);
        _this.state = {
            mentioned_by: _this.props.mentioned_by,
            mentionedByValid: true,
            mentionedByMessage: '',
            mentioned_in: _this.props.mentioned_in,
            mentionedInValid: true,
            mentionedInMessage: '',
            mentioned: _this.props.mentioned,
            mentionedValid: true,
            mentionedMessage: '',
            description: '',
            reference: '',
            formMessage: '',
            submitting: false
        };
        return _this;
    }

    _createClass(AddMention, [{
        key: 'onChangeText',
        value: function onChangeText(e) {
            var temp = {};
            temp[e.target.name] = e.target.value;
            this.setState(temp);
        }
    }, {
        key: 'validateForm',
        value: function validateForm() {
            var valid = true;
            if (!this.state.mentioned_by) {
                this.setState({
                    mentionedByValid: false,
                    mentionedByMessage: 'Mentioned By is empty'
                });
                valid = false;
            } else {
                this.setState({
                    mentionedByValid: true,
                    mentionedByMessage: ''
                });
            }
            if (!this.state.mentioned_in && this.props.type !== 'person') {
                this.setState({
                    mentionedInValid: false,
                    mentionedInMessage: 'Mentioned In is empty'
                });
                valid = false;
            } else {
                this.setState({
                    mentionedInValid: true,
                    mentionedInMessage: ''
                });
            }
            if (!this.state.mentioned) {
                this.setState({
                    mentionedValid: false,
                    mentionedMessage: 'Mentioned is empty'
                });
                valid = false;
            } else {
                this.setState({
                    mentionedValid: true,
                    mentionedMessage: ''
                });
            }
            return valid;
        }
    }, {
        key: 'onSubmit',
        value: function onSubmit(e) {
            var _this2 = this;

            e.preventDefault();
            if (this.validateForm()) {
                this.setState({
                    submitting: true
                });
                _superagent2.default.post('/api/v1/mentions').type('form').send({
                    description: this.state.description,
                    reference: this.state.reference,
                    mentioned_by: this.state.mentioned_by,
                    mentioned_in: this.state.mentioned_in,
                    mentioned: this.state.mentioned,
                    _xsrf: _browserCookies2.default.get('_xsrf')
                }).end(function (err, res) {
                    _this2.setState({
                        submitting: false
                    });
                    if (err && err.status) {
                        _this2.setState({
                            formMessage: res.body.message
                        });
                    } else {
                        _this2.setState({
                            formMessage: ''
                        });
                        (0, _snackbar2.default)({ message: 'Mention added' });
                        history.pushState(null, null, window.location.pathname + window.location.search);
                        Mentions.route(window.location.pathname + window.location.search);
                    }
                });
            }
        }
    }, {
        key: 'onChangeMentionedBy',
        value: function onChangeMentionedBy(x) {
            this.setState({
                mentioned_by: x.id
            });
        }
    }, {
        key: 'onChangeMentionedIn',
        value: function onChangeMentionedIn(x) {
            this.setState({
                mentioned_in: x.id
            });
        }
    }, {
        key: 'onChangeMentioned',
        value: function onChangeMentioned(x) {
            this.setState({
                mentioned: x.id
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var id = this.props.id;
            var loggedOutMessage = _react2.default.createElement(
                'span',
                null,
                'You need to ',
                _react2.default.createElement(_LoginModal2.default, null),
                ' / ',
                _react2.default.createElement(_SignupModal2.default, null),
                ' to add a Mention.'
            );
            var parsed = void 0;
            if (this.state.reference) {
                parsed = (0, _urlParse2.default)(this.state.reference);
            }
            return _react2.default.createElement(
                'div',
                { className: 'small-12 columns' },
                _react2.default.createElement(
                    _Restricted2.default,
                    { message: loggedOutMessage },
                    _react2.default.createElement(
                        'h2',
                        null,
                        'Add mention'
                    ),
                    _react2.default.createElement(_IpWarning2.default, { loggedin: this.props.loggedin }),
                    this.state.formMessage ? _react2.default.createElement(
                        'div',
                        { className: 'callout alert' },
                        this.state.formMessage
                    ) : null,
                    _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement(
                            'div',
                            { className: 'small-12 large-4 large-order-2 columns' },
                            _react2.default.createElement(
                                'div',
                                { className: 'callout warning' },
                                'People, books and videos must have existing pages on WikiMentions.',
                                ' ',
                                _react2.default.createElement(
                                    'a',
                                    { href: '/create', target: '_blank' },
                                    'Create'
                                ),
                                ' ',
                                'a page if it doesn\'t already exist.'
                            )
                        ),
                        _react2.default.createElement(
                            'form',
                            {
                                onSubmit: this.onSubmit,
                                className: 'small-12 large-8 large-order-1 columns'
                            },
                            this.props.mentioned_by ? null : _react2.default.createElement(
                                'span',
                                null,
                                'Mentioned By (Person)',
                                _react2.default.createElement(_Select2.default, {
                                    name: 'mentioned_by',
                                    valid: this.state.mentionedByValid,
                                    message: this.state.mentionedByMessage,
                                    onSelectValue: this.onChangeMentionedBy,
                                    types: ['person']
                                })
                            ),
                            this.props.mentioned ? null : _react2.default.createElement(
                                'span',
                                null,
                                'Mentioned (Person or Book or Video)',
                                _react2.default.createElement(_Select2.default, {
                                    valid: this.state.mentionedValid,
                                    message: this.state.mentionedMessage,
                                    name: 'mentioned',
                                    onSelectValue: this.onChangeMentioned
                                })
                            ),
                            this.props.mentioned_in ? null : _react2.default.createElement(
                                'span',
                                null,
                                'Mentioned In (Book or Video)',
                                _react2.default.createElement(_Select2.default, {
                                    valid: this.state.mentionedInValid,
                                    message: this.state.mentionedInMessage,
                                    placeholder: this.props.type === 'person' ? 'Optional' : '',
                                    name: 'mentioned_in',
                                    onSelectValue: this.onChangeMentionedIn,
                                    types: ['book', 'video']
                                })
                            ),
                            this.props.type === 'person' ? _react2.default.createElement(
                                'span',
                                null,
                                'Reference (If mention isn\'t in a book or video)',
                                this.state.reference && parsed.hostname === 'www.youtube.com' ? _react2.default.createElement(
                                    'div',
                                    { className: 'callout warning' },
                                    'Videos belong on separate pages. Create a page for this video if it doesn\'t already exist and add it to "Mentioned In"'
                                ) : null,
                                _react2.default.createElement(_Input2.default, {
                                    type: 'text',
                                    name: 'reference',
                                    placeholder: 'http://',
                                    value: this.state.reference,
                                    onChange: this.onChangeText,
                                    onClear: this.onClear,
                                    valid: true,
                                    message: true
                                })
                            ) : null,
                            _react2.default.createElement(
                                'div',
                                { className: 'button-group float-right' },
                                _react2.default.createElement(_SubmitButton2.default, {
                                    type: 'button',
                                    className: 'button primary',
                                    submitting: this.state.submitting,
                                    title: 'Add'
                                })
                            )
                        )
                    )
                )
            );
        }
    }]);

    return AddMention;
}(_react2.default.Component);

exports.default = AddMention;