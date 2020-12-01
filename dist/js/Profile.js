'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _browserCookies = require('browser-cookies');

var _browserCookies2 = _interopRequireDefault(_browserCookies);

var _ChangePassword = require('./ChangePassword');

var _ChangePassword2 = _interopRequireDefault(_ChangePassword);

var _DeleteAccount = require('./DeleteAccount');

var _DeleteAccount2 = _interopRequireDefault(_DeleteAccount);

var _EditProfile = require('./EditProfile');

var _EditProfile2 = _interopRequireDefault(_EditProfile);

var _Markdown = require('./Markdown');

var _Markdown2 = _interopRequireDefault(_Markdown);

var _reactAutobind = require('react-autobind');

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Profile = function (_React$Component) {
    _inherits(Profile, _React$Component);

    function Profile(props) {
        _classCallCheck(this, Profile);

        var _this = _possibleConstructorReturn(this, (Profile.__proto__ || Object.getPrototypeOf(Profile)).call(this, props));

        (0, _reactAutobind2.default)(_this);
        _this.state = {
            tab: 'Profile'
        };
        return _this;
    }

    _createClass(Profile, [{
        key: 'changeTab',
        value: function changeTab(tab) {
            this.setState({
                tab: tab
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var tabs = ['Profile', 'Change Password', 'Delete Account'];
            return _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                    'div',
                    { className: 'small-12 large-3 columns' },
                    _react2.default.createElement(
                        'ul',
                        { className: 'tabs vertical' },
                        tabs.map(function (x) {
                            return _react2.default.createElement(
                                'li',
                                {
                                    key: x,
                                    role: 'presentation',
                                    className: _this2.state.tab === x ? 'tabs-title is-active' : 'tabs-title',
                                    onClick: _this2.changeTab.bind(null, x)
                                },
                                _react2.default.createElement(
                                    'a',
                                    {
                                        'aria-selected': _this2.state.tab === x,
                                        tabIndex: 0,
                                        role: 'tab'
                                    },
                                    x
                                )
                            );
                        })
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'large-9 columns' },
                    _react2.default.createElement(
                        'div',
                        { className: 'tabs-content vertical' },
                        this.state.tab === 'Profile' ? _react2.default.createElement(_EditProfile2.default, { id: this.props.id }) : null,
                        this.state.tab === 'Change Password' ? _react2.default.createElement(_ChangePassword2.default, null) : null,
                        this.state.tab === 'Delete Account' ? _react2.default.createElement(_DeleteAccount2.default, { id: this.props.id }) : null
                    )
                )
            );
        }
    }]);

    return Profile;
}(_react2.default.Component);

exports.default = Profile;