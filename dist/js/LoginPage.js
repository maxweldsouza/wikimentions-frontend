'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _Navbar = require('./Navbar');

var _Navbar2 = _interopRequireDefault(_Navbar);

var _Login = require('./Login');

var _Login2 = _interopRequireDefault(_Login);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoginPage = function (_React$Component) {
    _inherits(LoginPage, _React$Component);

    function LoginPage() {
        _classCallCheck(this, LoginPage);

        return _possibleConstructorReturn(this, (LoginPage.__proto__ || Object.getPrototypeOf(LoginPage)).apply(this, arguments));
    }

    _createClass(LoginPage, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(_reactHelmet2.default, {
                    title: 'Login',
                    titleTemplate: '%s - ' + _config2.default.name,
                    meta: [{ name: 'description', content: '' }],
                    link: [{ rel: 'canonical', href: '' }]
                }),
                _react2.default.createElement(_Navbar2.default, {
                    loggedin: this.props.loggedin,
                    username: this.props.username,
                    userid: this.props.userid,
                    toggleSidebar: this.props.toggleSidebar
                }),
                _react2.default.createElement(
                    'div',
                    { className: 'row page-body align-center white' },
                    _react2.default.createElement(
                        'div',
                        { className: 'small-12 large-6 columns' },
                        _react2.default.createElement(_Login2.default, { redirect: '/' })
                    )
                )
            );
        }
    }], [{
        key: 'resources',
        value: function resources() {
            return {
                api: []
            };
        }
    }]);

    return LoginPage;
}(_react2.default.Component);

exports.default = LoginPage;