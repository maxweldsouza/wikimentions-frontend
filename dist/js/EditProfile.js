'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SubmitButton = require('./SubmitButton');

var _SubmitButton2 = _interopRequireDefault(_SubmitButton);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _MarkdownInput = require('./MarkdownInput');

var _MarkdownInput2 = _interopRequireDefault(_MarkdownInput);

var _browserCookies = require('browser-cookies');

var _browserCookies2 = _interopRequireDefault(_browserCookies);

var _snackbar = require('./snackbar');

var _snackbar2 = _interopRequireDefault(_snackbar);

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _reactAutobind = require('react-autobind');

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditProfile = function (_React$Component) {
    _inherits(EditProfile, _React$Component);

    function EditProfile(props) {
        _classCallCheck(this, EditProfile);

        var _this = _possibleConstructorReturn(this, (EditProfile.__proto__ || Object.getPrototypeOf(EditProfile)).call(this, props));

        (0, _reactAutobind2.default)(_this);
        _this.state = {
            submitting: false,
            email: '',
            about: '',
            preview: false,
            formMessage: ''
        };
        return _this;
    }

    _createClass(EditProfile, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            _superagent2.default.get('/api/v1/user/' + this.props.id).end(function (err, res) {
                _this2.setState({
                    email: res.body.email,
                    about: res.body.about
                });
            });
        }
    }, {
        key: 'onChangeText',
        value: function onChangeText(e) {
            var temp = {};
            temp[e.target.name] = e.target.value;
            if (e.target.name === 'about') {
                temp.preview = true;
            }
            this.setState(temp);
        }
    }, {
        key: 'onClear',
        value: function onClear(name) {
            var temp = {};
            temp[name] = '';
            this.setState(temp);
        }
    }, {
        key: 'updateProfile',
        value: function updateProfile(e) {
            var _this3 = this;

            e.preventDefault();
            this.setState({
                submitting: true
            });
            _superagent2.default.post('/api/v1/user/' + this.props.id).type('form').send({
                email: this.state.email,
                about: this.state.about,
                _xsrf: _browserCookies2.default.get('_xsrf')
            }).end(function (err, res) {
                _this3.setState({
                    submitting: false
                });
                if (err && err.status) {
                    _this3.setState({
                        formMessage: res.body.message
                    });
                } else {
                    _this3.setState({
                        formMessage: ''
                    });
                    (0, _snackbar2.default)({ message: 'Profile updated' });
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                {
                    className: 'tabs-panel is-active',
                    role: 'tabpanel',
                    'aria-hidden': 'false'
                },
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'large-8 columns' },
                        _react2.default.createElement(
                            'form',
                            {
                                onSubmit: this.updateProfile,
                                className: 'columns box'
                            },
                            _react2.default.createElement(
                                'h2',
                                null,
                                'Profile'
                            ),
                            this.state.formMessage ? _react2.default.createElement(
                                'div',
                                { className: 'callout alert' },
                                this.state.formMessage
                            ) : null,
                            'Email',
                            _react2.default.createElement(_Input2.default, {
                                type: 'text',
                                name: 'email',
                                onChange: this.onChangeText,
                                value: this.state.email,
                                onClear: this.onClear,
                                valid: true,
                                message: ''
                            }),
                            _react2.default.createElement(_MarkdownInput2.default, {
                                name: 'about',
                                placeholder: 'Write something about yourself (Markdown is supported)',
                                label: 'About',
                                rows: '5',
                                content: this.state.about,
                                onChange: this.onChangeText,
                                sideBySide: false,
                                maxLength: 255
                            }),
                            _react2.default.createElement(_SubmitButton2.default, {
                                title: 'Save',
                                className: 'button primary float-right',
                                submitting: this.state.submitting
                            })
                        )
                    )
                )
            );
        }
    }]);

    return EditProfile;
}(_react2.default.Component);

exports.default = EditProfile;