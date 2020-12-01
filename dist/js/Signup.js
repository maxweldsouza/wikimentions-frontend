'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _browserCookies = require('browser-cookies');

var _browserCookies2 = _interopRequireDefault(_browserCookies);

var _Xsrf = require('./Xsrf');

var _Xsrf2 = _interopRequireDefault(_Xsrf);

var _SubmitButton = require('./SubmitButton');

var _SubmitButton2 = _interopRequireDefault(_SubmitButton);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _snackbar = require('./snackbar');

var _snackbar2 = _interopRequireDefault(_snackbar);

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _store = require('store');

var _store2 = _interopRequireDefault(_store);

var _reactAutobind = require('react-autobind');

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Signup = function (_React$Component) {
    _inherits(Signup, _React$Component);

    function Signup(props) {
        _classCallCheck(this, Signup);

        var _this = _possibleConstructorReturn(this, (Signup.__proto__ || Object.getPrototypeOf(Signup)).call(this, props));

        (0, _reactAutobind2.default)(_this);
        _this.state = {
            submitting: false,
            username: '',
            usernameValid: true,
            usernameMessage: '',
            email: '',
            password: '',
            passwordValid: true,
            passwordMessage: '',
            retypePassword: '',
            retypePasswordValid: true,
            retypePasswordMessage: '',
            showPassword: false,
            formError: false
        };
        return _this;
    }

    _createClass(Signup, [{
        key: 'onOpenModal',
        value: function onOpenModal() {
            this.setState({
                modalIsOpen: true
            });
        }
    }, {
        key: 'closeModal',
        value: function closeModal() {
            this.setState({ modalIsOpen: false });
        }
    }, {
        key: 'onChangeText',
        value: function onChangeText(e) {
            var temp = {};
            temp[e.target.name] = e.target.value;
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
        key: 'signup',
        value: function signup(e) {
            var _this2 = this;

            e.preventDefault();
            if (this.validateForm()) {
                this.setState({
                    submitting: true
                });
                _superagent2.default.post('/api/v1/signup').type('form').send({
                    username: this.state.username,
                    password: this.state.password,
                    email: this.state.email,
                    _xsrf: _browserCookies2.default.get('_xsrf')
                }).end(function (err, res) {
                    _this2.setState({
                        submitting: false
                    });
                    if (err && err.status) {
                        (0, _snackbar2.default)({
                            message: err.message ? err.message : 'Something went wrong'
                        });
                    } else {
                        _this2.closeModal();
                        (0, _snackbar2.default)({ message: 'Signed up' });
                        _store2.default.set('username', res.body.username);
                        _store2.default.set('level', res.body.level);
                        _store2.default.set('id', res.body.id);

                        var path = window.location.pathname + window.location.search;
                        if (path === '/signup') {
                            path = '/';
                        }
                        history.pushState(null, null, path);
                        Mentions.route(path);
                    }
                });
            }
        }
    }, {
        key: 'showPassword',
        value: function showPassword() {
            this.setState({
                showPassword: true
            });
        }
    }, {
        key: 'hidePassword',
        value: function hidePassword() {
            this.setState({
                showPassword: false
            });
        }
    }, {
        key: 'validateForm',
        value: function validateForm() {
            var valid = true;
            if (/^[a-zA-Z-_'.0-9]{3,32}$/.test(this.state.username)) {
                this.setState({
                    usernameValid: true,
                    usernameMessage: ''
                });
            } else {
                this.setState({
                    usernameValid: false,
                    usernameMessage: "Username must be between 3 and 32 characters, and can only contain letters, numbers and these special characters -_'."
                });
            }
            if (this.state.password.length < 8) {
                this.setState({
                    passwordValid: false,
                    passwordMessage: 'Password must be between 8 and 160 characters'
                });
                valid = false;
            } else if (this.state.password.length > 160) {
                this.setState({
                    passwordValid: false,
                    passwordMessage: 'Password must be between 8 and 160 characters'
                });
                valid = false;
            } else {
                this.setState({
                    passwordValid: true,
                    passwordMessage: ''
                });
            }

            if (this.state.password !== this.state.retypePassword) {
                this.setState({
                    retypePasswordValid: false,
                    retypePasswordMessage: 'Passwords do not match'
                });
                valid = false;
            } else {
                this.setState({
                    retypePasswordValid: true,
                    retypePasswordMessage: ''
                });
            }
            this.setState({
                formError: !valid
            });
            return valid;
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'form',
                { onSubmit: this.signup },
                this.state.formError ? _react2.default.createElement(
                    'div',
                    { className: 'callout alert' },
                    'Form has errors'
                ) : null,
                'Username',
                _react2.default.createElement(_Input2.default, {
                    type: 'text',
                    name: 'username',
                    onChange: this.onChangeText,
                    onClear: this.onClear,
                    value: this.state.username,
                    valid: this.state.usernameValid,
                    message: this.state.usernameMessage
                }),
                'E-mail (optional)',
                _react2.default.createElement(_Input2.default, {
                    type: 'text',
                    name: 'email',
                    onChange: this.onChangeText,
                    onClear: this.onClear,
                    value: this.state.email,
                    valid: true,
                    message: ''
                }),
                'Password',
                this.state.password.length > 0 && !this.state.showPassword ? _react2.default.createElement(
                    'a',
                    {
                        onClick: this.showPassword,
                        className: 'secondary float-right'
                    },
                    'Show Password'
                ) : null,
                this.state.password.length > 0 && this.state.showPassword ? _react2.default.createElement(
                    'a',
                    {
                        onClick: this.hidePassword,
                        className: 'secondary float-right'
                    },
                    'Hide Password'
                ) : null,
                this.state.showPassword ? _react2.default.createElement(_Input2.default, {
                    type: 'text',
                    name: 'password',
                    valid: this.state.passwordValid,
                    message: this.state.passwordMessage,
                    onChange: this.onChangeText,
                    onClear: this.onClear,
                    value: this.state.password
                }) : _react2.default.createElement(_Input2.default, {
                    type: 'password',
                    name: 'password',
                    valid: this.state.passwordValid,
                    message: this.state.passwordMessage,
                    onChange: this.onChangeText,
                    onClear: this.onClear,
                    value: this.state.password
                }),
                'Retype Password',
                _react2.default.createElement(_Input2.default, {
                    type: 'password',
                    name: 'retypePassword',
                    onChange: this.onChangeText,
                    onClear: this.onClear,
                    valid: this.state.retypePasswordValid,
                    message: this.state.retypePasswordMessage,
                    value: this.state.retypePassword
                }),
                _react2.default.createElement(_SubmitButton2.default, {
                    title: 'Signup',
                    className: 'expanded button primary',
                    submitting: this.state.submitting
                }),
                _react2.default.createElement(
                    'div',
                    { className: 'float-right' },
                    'Already have an account? ',
                    _react2.default.createElement(
                        'a',
                        { href: '/login' },
                        'Login'
                    )
                )
            );
        }
    }]);

    return Signup;
}(_react2.default.Component);

exports.default = Signup;