'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _browserCookies = require('browser-cookies');

var _browserCookies2 = _interopRequireDefault(_browserCookies);

var _SubmitButton = require('./SubmitButton');

var _SubmitButton2 = _interopRequireDefault(_SubmitButton);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _snackbar = require('./snackbar');

var _snackbar2 = _interopRequireDefault(_snackbar);

var _store = require('store');

var _store2 = _interopRequireDefault(_store);

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _reactAutobind = require('react-autobind');

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = function (_React$Component) {
    _inherits(Login, _React$Component);

    function Login(props) {
        _classCallCheck(this, Login);

        var _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));

        (0, _reactAutobind2.default)(_this);
        _this.state = {
            submitting: false,
            formError: false,
            username: '',
            password: ''
        };
        return _this;
    }

    _createClass(Login, [{
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
        key: 'login',
        value: function login(e) {
            var _this2 = this;

            e.preventDefault();
            this.setState({
                submitting: true
            });
            _superagent2.default.post('/api/v1/login').type('form').send({
                username: this.state.username,
                password: this.state.password,
                _xsrf: _browserCookies2.default.get('_xsrf')
            }).end(function (err, res) {
                _this2.setState({
                    submitting: false
                });
                if (err && err.status) {
                    _this2.setState({
                        formError: true
                    });
                } else {
                    if (_this2.props.onLogin) {
                        _this2.props.onLogin();
                    }
                    _this2.setState({
                        formError: false
                    });
                    (0, _snackbar2.default)({ message: 'Logged in' });
                    _store2.default.set('username', res.body.username);
                    _store2.default.set('level', res.body.level);
                    _store2.default.set('id', res.body.id);

                    var path = window.location.pathname + window.location.search;
                    if (path === '/login') {
                        path = '/';
                    }
                    history.pushState(null, null, path);
                    Mentions.route(path);
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'form',
                { onSubmit: this.login },
                _react2.default.createElement(
                    'h1',
                    null,
                    'Login'
                ),
                this.state.formError ? _react2.default.createElement(
                    'div',
                    { className: 'callout alert' },
                    'Login failed'
                ) : null,
                'Username',
                _react2.default.createElement(_Input2.default, {
                    type: 'text',
                    name: 'username',
                    onChange: this.onChangeText,
                    onClear: this.onClear,
                    value: this.state.username,
                    valid: true,
                    message: ''
                }),
                'Password',
                _react2.default.createElement(_Input2.default, {
                    type: 'password',
                    name: 'password',
                    onChange: this.onChangeText,
                    onClear: this.onClear,
                    value: this.state.password,
                    valid: true,
                    message: ''
                }),
                _react2.default.createElement(_SubmitButton2.default, {
                    title: 'Login',
                    className: 'expanded button primary',
                    submitting: this.state.submitting
                }),
                _react2.default.createElement(
                    'div',
                    { className: 'float-right' },
                    'Don\'t have an account? ',
                    _react2.default.createElement(
                        'a',
                        { href: '/signup' },
                        'Signup'
                    )
                )
            );
        }
    }]);

    return Login;
}(_react2.default.Component);

exports.default = Login;