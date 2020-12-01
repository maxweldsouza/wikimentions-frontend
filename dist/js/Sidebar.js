'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _snackbar = require('./snackbar');

var _snackbar2 = _interopRequireDefault(_snackbar);

var _browserCookies = require('browser-cookies');

var _browserCookies2 = _interopRequireDefault(_browserCookies);

var _velocityReact = require('velocity-react');

var _reactAutobind = require('react-autobind');

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sidebar = function (_React$Component) {
    _inherits(Sidebar, _React$Component);

    function Sidebar() {
        _classCallCheck(this, Sidebar);

        return _possibleConstructorReturn(this, (Sidebar.__proto__ || Object.getPrototypeOf(Sidebar)).apply(this, arguments));
    }

    _createClass(Sidebar, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            return this.props.showing !== nextProps.showing || this.props.username !== nextProps.username || this.props.loggedin !== nextProps.loggedin || this.props.userid !== nextProps.userid;
        }
    }, {
        key: 'onClickItem',
        value: function onClickItem(url) {
            this.props.onToggleSidebar();
            history.pushState(null, null, url);
            Comparnion.route(url);
        }
    }, {
        key: 'random',
        value: function random() {
            _superagent2.default.get('/api/v1/random').send().end(function (err, res) {
                if (!err) {
                    history.pushState(null, null, res.body.path);
                    Mentions.route(res.body.path);
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var sidebar = this.props.showing ? '' : 'hidden';
            var loggedin = this.props.loggedin;
            return _react2.default.createElement(
                'div',
                {
                    'aria-hidden': !this.props.showing,
                    role: 'complementary',
                    'aria-label': 'Sidebar'
                },
                _react2.default.createElement(
                    _velocityReact.VelocityTransitionGroup,
                    {
                        enter: {
                            animation: {
                                translateX: '0px',
                                easing: 'easeIn',
                                duration: 100
                            }
                        },
                        leave: {
                            animation: {
                                translateX: '-250px',
                                easing: 'easeOut',
                                duration: 100
                            }
                        }
                    },
                    this.props.showing ? _react2.default.createElement(
                        'div',
                        { className: 'sidebar' },
                        _react2.default.createElement(
                            'div',
                            { className: 'sidebar-header' },
                            _react2.default.createElement(
                                'a',
                                { className: 'sidebar-logo', href: '/' },
                                _config2.default.name
                            )
                        ),
                        _react2.default.createElement(
                            'a',
                            {
                                className: 'sidebar-item sidebar-button',
                                href: '/'
                            },
                            _react2.default.createElement('span', {
                                className: 'ion-android-home menu-item-icon'
                            }),
                            'Home'
                        ),
                        _react2.default.createElement(
                            'a',
                            {
                                className: 'sidebar-item sidebar-button',
                                href: '/create'
                            },
                            _react2.default.createElement('span', {
                                className: 'ion-android-create menu-item-icon'
                            }),
                            'Create Page'
                        ),
                        _react2.default.createElement(
                            'a',
                            {
                                className: 'sidebar-item sidebar-button',
                                href: '/lists/create'
                            },
                            _react2.default.createElement('span', {
                                className: 'ion-android-list menu-item-icon'
                            }),
                            'Create List'
                        ),
                        _react2.default.createElement(
                            'a',
                            {
                                className: 'sidebar-item sidebar-button',
                                onClick: this.random
                            },
                            _react2.default.createElement('span', {
                                className: 'ion-shuffle menu-item-icon'
                            }),
                            'Random Page'
                        ),
                        _react2.default.createElement(
                            'a',
                            {
                                className: 'sidebar-item sidebar-button',
                                href: '/recent-changes',
                                rel: 'nofollow'
                            },
                            _react2.default.createElement('span', { className: 'ion-flash menu-item-icon' }),
                            'Recent Changes'
                        ),
                        _react2.default.createElement(
                            'a',
                            {
                                className: 'sidebar-item sidebar-button',
                                href: '/recent-discussions',
                                rel: 'nofollow'
                            },
                            _react2.default.createElement('span', {
                                className: 'ion-chatbubbles menu-item-icon'
                            }),
                            'Recent Discussions'
                        ),
                        _react2.default.createElement(
                            'a',
                            {
                                className: 'sidebar-item sidebar-button',
                                href: '/blog'
                            },
                            _react2.default.createElement('span', {
                                className: 'ion-document menu-item-icon'
                            }),
                            'Blog'
                        ),
                        loggedin ? _react2.default.createElement(
                            'a',
                            {
                                className: 'sidebar-item sidebar-button',
                                onClick: Mentions.logout
                            },
                            _react2.default.createElement('span', {
                                className: 'ion-log-out menu-item-icon'
                            }),
                            'Log Out'
                        ) : _react2.default.createElement(
                            'a',
                            {
                                className: 'sidebar-item sidebar-button',
                                href: '/login'
                            },
                            _react2.default.createElement('span', {
                                className: 'ion-log-in menu-item-icon'
                            }),
                            'Log In'
                        ),
                        loggedin ? _react2.default.createElement('span', null) : _react2.default.createElement(
                            'a',
                            {
                                className: 'sidebar-item sidebar-button',
                                href: '/signup'
                            },
                            _react2.default.createElement('span', {
                                className: 'ion-person-add menu-item-icon'
                            }),
                            'Sign Up'
                        ),
                        loggedin ? _react2.default.createElement(
                            'span',
                            {
                                className: 'sidebar-button sidebar-loggedin'
                            },
                            'Logged in as',
                            ' ',
                            _react2.default.createElement(
                                'a',
                                {
                                    className: '',
                                    href: '/users/' + this.props.userid + '/' + this.props.username
                                },
                                this.props.username
                            )
                        ) : null
                    ) : null
                ),
                _react2.default.createElement(
                    _velocityReact.VelocityTransitionGroup,
                    {
                        enter: { animation: 'fadeIn' },
                        leave: { animation: 'transition.fadeOut' }
                    },
                    this.props.showing ? _react2.default.createElement('div', {
                        className: 'sidebar-overlay',
                        onClick: this.props.onToggleSidebar
                    }) : null
                )
            );
        }
    }]);

    return Sidebar;
}(_react2.default.Component);

exports.default = Sidebar;