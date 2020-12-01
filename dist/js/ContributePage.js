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

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _reactAutobind = require('react-autobind');

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContributePage = function (_React$Component) {
    _inherits(ContributePage, _React$Component);

    _createClass(ContributePage, null, [{
        key: 'resources',
        value: function resources() {
            return {
                api: []
            };
        }
    }]);

    function ContributePage(props) {
        _classCallCheck(this, ContributePage);

        var _this = _possibleConstructorReturn(this, (ContributePage.__proto__ || Object.getPrototypeOf(ContributePage)).call(this, props));

        (0, _reactAutobind2.default)(_this);
        _this.state = {
            tab: 'edits'
        };
        return _this;
    }

    _createClass(ContributePage, [{
        key: 'changeTab',
        value: function changeTab(tab) {
            this.setState({
                tab: tab
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(_reactHelmet2.default, {
                    title: 'Contribute',
                    titleTemplate: '%s - ' + _config2.default.name,
                    meta: [{ name: 'robots', content: 'noindex' }],
                    link: [{ rel: 'canonical', href: _config2.default.url + this.props.path }]
                }),
                _react2.default.createElement(_Navbar2.default, {
                    loggedin: this.props.loggedin,
                    username: this.props.username,
                    userid: this.props.userid,
                    toggleSidebar: this.props.toggleSidebar
                }),
                _react2.default.createElement(
                    'div',
                    { className: 'row page-body white' },
                    _react2.default.createElement(
                        'div',
                        { className: 'small-12 large-8 columns' },
                        _react2.default.createElement(
                            'div',
                            { className: 'row' },
                            _react2.default.createElement(
                                'div',
                                { className: 'small-12 columns' },
                                _react2.default.createElement(
                                    'h1',
                                    null,
                                    'Contribute'
                                ),
                                _react2.default.createElement(
                                    'div',
                                    null,
                                    _react2.default.createElement(
                                        'a',
                                        { href: '/site-stats' },
                                        'Site Statistics'
                                    )
                                ),
                                _react2.default.createElement('hr', null),
                                'Objects',
                                _react2.default.createElement(
                                    'div',
                                    null,
                                    _react2.default.createElement(
                                        'a',
                                        {
                                            href: '/maintenance/book_without_author/50/0'
                                        },
                                        'Books Without Author'
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    null,
                                    _react2.default.createElement(
                                        'a',
                                        { href: '/maintenance/missing_isbn/50/0' },
                                        'Missing ISBNs'
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    null,
                                    _react2.default.createElement(
                                        'a',
                                        {
                                            href: '/maintenance/person_without_description/50/0'
                                        },
                                        'Person Without Description'
                                    )
                                ),
                                _react2.default.createElement('hr', null),
                                _react2.default.createElement(
                                    'div',
                                    null,
                                    _react2.default.createElement(
                                        'a',
                                        { href: '/site-stats' },
                                        'People without books or videos'
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    null,
                                    _react2.default.createElement(
                                        'a',
                                        { href: '/site-stats' },
                                        'Videos without Mentions'
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    null,
                                    _react2.default.createElement(
                                        'a',
                                        { href: '/site-stats' },
                                        'Books without Mentions'
                                    )
                                ),
                                _react2.default.createElement('hr', null),
                                _react2.default.createElement(
                                    'div',
                                    null,
                                    _react2.default.createElement(
                                        'a',
                                        { href: '/recent-discussions' },
                                        'Recent Discussions'
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    null,
                                    _react2.default.createElement(
                                        'a',
                                        { href: '/recent-changes' },
                                        'Recent Changes'
                                    )
                                ),
                                _react2.default.createElement(
                                    'h2',
                                    null,
                                    'Reported'
                                ),
                                _react2.default.createElement(
                                    'div',
                                    null,
                                    _react2.default.createElement(
                                        'a',
                                        { href: '/site-stats' },
                                        'Incorrect Info'
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    null,
                                    _react2.default.createElement(
                                        'a',
                                        { href: '/site-stats' },
                                        'Missing Books'
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return ContributePage;
}(_react2.default.Component);

exports.default = ContributePage;