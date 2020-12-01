'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _browserCookies = require('browser-cookies');

var _browserCookies2 = _interopRequireDefault(_browserCookies);

var _LoginModal = require('./LoginModal');

var _LoginModal2 = _interopRequireDefault(_LoginModal);

var _MarkdownInput = require('./MarkdownInput');

var _MarkdownInput2 = _interopRequireDefault(_MarkdownInput);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _Restricted = require('./Restricted');

var _Restricted2 = _interopRequireDefault(_Restricted);

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

var DiscussReply = function (_React$Component) {
    _inherits(DiscussReply, _React$Component);

    function DiscussReply(props) {
        _classCallCheck(this, DiscussReply);

        var _this = _possibleConstructorReturn(this, (DiscussReply.__proto__ || Object.getPrototypeOf(DiscussReply)).call(this, props));

        (0, _reactAutobind2.default)(_this);
        _this.state = {
            content: '',
            submitting: false,
            preview: false,
            formMessage: ''
        };
        return _this;
    }

    _createClass(DiscussReply, [{
        key: 'onChangeText',
        value: function onChangeText(e) {
            var temp = {};
            temp[e.target.name] = e.target.value;
            this.setState(temp);
        }
    }, {
        key: 'onSubmit',
        value: function onSubmit(e) {
            var _this2 = this;

            e.preventDefault();
            if (!this.state.content) {
                this.setState({
                    formMessage: 'Post is empty'
                });
                return;
            }
            this.setState({
                submitting: true
            });
            _superagent2.default.post('/api/v1/discuss/' + this.props.id).type('form').send({
                content: this.state.content,
                _xsrf: _browserCookies2.default.get('_xsrf')
            }).end(function (err, res) {
                _this2.setState({
                    submitting: false,
                    content: ''
                });
                if (err && err.status) {
                    _this2.setState({
                        formMessage: res.body.message
                    });
                } else {
                    _this2.setState({
                        formMessage: ''
                    });
                    (0, _snackbar2.default)({ message: 'Posted' });
                    history.pushState(null, null, window.location.pathname + window.location.search);
                    Mentions.route(window.location.pathname + window.location.search);
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var loggedOutMessage = _react2.default.createElement(
                'span',
                null,
                'You need to ',
                _react2.default.createElement(_LoginModal2.default, null),
                ' / ',
                _react2.default.createElement(_SignupModal2.default, null),
                ' to post a message.'
            );
            return _react2.default.createElement(
                'form',
                { onSubmit: this.onSubmit, className: 'small-12 columns' },
                _react2.default.createElement(
                    _Restricted2.default,
                    {
                        message: loggedOutMessage,
                        min_level: 1,
                        loggedin: this.props.loggedin
                    },
                    this.state.formMessage ? _react2.default.createElement(
                        'div',
                        { className: 'callout alert' },
                        this.state.formMessage
                    ) : null,
                    _react2.default.createElement(_MarkdownInput2.default, {
                        name: 'content',
                        placeholder: 'Write your post  here (Markdown is supported)',
                        rows: '5',
                        label: 'Post',
                        content: this.state.content,
                        onChange: this.onChangeText,
                        sideBySide: true,
                        maxLength: 65535
                    }),
                    _react2.default.createElement(_SubmitButton2.default, {
                        title: 'Submit',
                        className: 'button primary float-right',
                        submitting: this.state.submitting
                    })
                )
            );
        }
    }]);

    return DiscussReply;
}(_react2.default.Component);

exports.default = DiscussReply;