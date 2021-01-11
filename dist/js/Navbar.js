'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _LoginModal = require('./LoginModal');

var _LoginModal2 = _interopRequireDefault(_LoginModal);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _SignupModal = require('./SignupModal');

var _SignupModal2 = _interopRequireDefault(_SignupModal);

var _Spinner = require('./Spinner');

var _Spinner2 = _interopRequireDefault(_Spinner);

var _velocityReact = require('velocity-react');

var _Xsrf = require('./Xsrf');

var _Xsrf2 = _interopRequireDefault(_Xsrf);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _reactAutobind = require('react-autobind');

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Navbar = function (_React$Component) {
    _inherits(Navbar, _React$Component);

    function Navbar(props) {
        _classCallCheck(this, Navbar);

        var _this = _possibleConstructorReturn(this, (Navbar.__proto__ || Object.getPrototypeOf(Navbar)).call(this, props));

        (0, _reactAutobind2.default)(_this);
        _this.state = {
            searchBarOpen: false,
            searchText: ''
        };
        return _this;
    }

    _createClass(Navbar, [{
        key: 'onChangeText',
        value: function onChangeText(e) {
            var temp = {};
            temp[e.target.name] = e.target.value;
            this.setState(temp);
        }
    }, {
        key: 'onOpenSearchBar',
        value: function onOpenSearchBar() {
            this.setState({
                searchBarOpen: true
            });
        }
    }, {
        key: 'onCloseSearchBar',
        value: function onCloseSearchBar() {
            this.setState({ searchBarOpen: false });
        }
    }, {
        key: 'search',
        value: function search() {
            var path = '/search?q=' + this.state.searchText;
            history.pushState(null, null, path);
            Mentions.route(path);
        }
    }, {
        key: 'onSearchTextChanged',
        value: function onSearchTextChanged(x) {
            this.setState({
                searchText: x
            });
        }
    }, {
        key: 'handleKeys',
        value: function handleKeys(event) {
            if (event.key === 'Enter') {
                this.search();
            }
        }
    }, {
        key: 'onSelectSearchResult',
        value: function onSelectSearchResult(x) {
            var pagepath = void 0;
            if (x.props.type === 'video') {
                pagepath = '/videos/';
            } else if (x.props.type === 'book') {
                pagepath = '/books/';
            } else if (x.props.type === 'person') {
                pagepath = '/people/';
            } else {
                throw new Error('No page type specified');
            }
            pagepath += x.id + '/' + x.props.slug;
            history.pushState(null, null, pagepath);
            Mentions.route(pagepath);
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
            var rhs = void 0;
            var userid = this.props.userid;
            var username = this.props.username;
            var loggedin = this.props.loggedin;

            var SearchBar = _react2.default.createElement(
                'div',
                {
                    className: 'input-group',
                    style: {
                        marginBottom: 0,
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0
                    }
                },
                _react2.default.createElement(_Select2.default, {
                    name: 'searchText',
                    className: 'input-group-field',
                    onSelectValue: this.onSelectSearchResult,
                    onSearchTextChanged: this.onSearchTextChanged,
                    placeholder: 'Search',
                    width: 400,
                    autoFocus: true,
                    moreResults: true
                }),
                _react2.default.createElement(
                    'button',
                    {
                        className: 'button primary',
                        style: {
                            borderRadius: '999em'
                        },
                        onClick: this.search,
                        'aria-label': 'Search'
                    },
                    _react2.default.createElement('span', { className: 'ion-android-search' })
                )
            );

            var navicon = _react2.default.createElement('span', {
                className: 'ion-navicon-round navicon hide-for-xxlarge',
                onClick: this.props.toggleSidebar,
                'aria-label': 'Toggle Sidebar'
            });

            var searchIcon = void 0;
            if (this.state.searchBarOpen) {
                searchIcon = _react2.default.createElement(
                    'button',
                    {
                        className: 'button alert no-margin-bottom',
                        'aria-label': 'Close search bar',
                        onClick: this.onCloseSearchBar
                    },
                    _react2.default.createElement('span', { className: 'ion-android-close navbar-icon' })
                );
            } else {
                searchIcon = _react2.default.createElement(
                    'button',
                    {
                        className: 'button primary small',
                        'aria-label': 'Open search bar',
                        onClick: this.onOpenSearchBar
                    },
                    _react2.default.createElement('span', { className: 'ion-android-search navbar-icon' })
                );
            }
            if (loggedin) {
                rhs = _react2.default.createElement(
                    'ul',
                    { className: 'menu align-right' },
                    _react2.default.createElement(
                        'li',
                        { className: 'show-for-xlarge' },
                        SearchBar
                    ),
                    _react2.default.createElement(
                        'li',
                        { className: 'show-for-medium' },
                        _react2.default.createElement(
                            'a',
                            {
                                className: 'navbar-link hint--bottom hint--rounded hint--no-animate',
                                rel: 'nofollow',
                                href: '/users/' + userid + '/' + username,
                                'aria-label': 'Profile'
                            },
                            _react2.default.createElement('span', { className: 'ion-android-person icon' }),
                            _react2.default.createElement(
                                'span',
                                { className: 'show-for-xxlarge' },
                                username
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'li',
                        { className: 'show-for-medium' },
                        _react2.default.createElement(
                            'a',
                            {
                                className: 'navbar-link hint--bottom hint--rounded hint--no-animate',
                                onClick: Mentions.logout,
                                'aria-label': 'Logout'
                            },
                            _react2.default.createElement('span', { className: 'ion-log-out icon' }),
                            _react2.default.createElement(
                                'span',
                                { className: 'show-for-xxlarge' },
                                'Logout'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'li',
                        { className: 'hide-for-xlarge' },
                        searchIcon
                    )
                );
            } else {
                rhs = _react2.default.createElement(
                    'ul',
                    { className: 'menu align-right' },
                    _react2.default.createElement(
                        'li',
                        { className: 'show-for-xlarge' },
                        SearchBar
                    ),
                    _react2.default.createElement(
                        'li',
                        { className: 'show-for-medium' },
                        _react2.default.createElement(
                            'a',
                            {
                                className: 'navbar-link hint--bottom hint--rounded hint--no-animate',
                                href: '/login',
                                'aria-label': 'Login'
                            },
                            _react2.default.createElement('span', { className: 'ion-log-in icon' }),
                            _react2.default.createElement(
                                'span',
                                { className: 'show-for-xxlarge' },
                                'Login'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'li',
                        { className: 'show-for-medium' },
                        _react2.default.createElement(
                            'a',
                            {
                                className: 'navbar-link hint--bottom hint--rounded hint--no-animate',
                                href: '/signup',
                                'aria-label': 'Sign Up'
                            },
                            _react2.default.createElement('span', { className: 'ion-android-person-add icon' }),
                            _react2.default.createElement(
                                'span',
                                { className: 'show-for-xxlarge' },
                                'Sign Up'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'li',
                        { className: 'hide-for-xlarge' },
                        searchIcon
                    )
                );
            }
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'nav',
                    { className: 'top-bar', role: 'navigation' },
                    _react2.default.createElement(
                        'div',
                        { className: 'top-bar-title align-center' },
                        navicon,
                        _react2.default.createElement(
                            'span',
                            { className: 'site-title' },
                            _react2.default.createElement(
                                'a',
                                { href: '/' },
                                _config2.default.name
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'top-bar-left' },
                        _react2.default.createElement(
                            'ul',
                            { className: 'menu' },
                            _react2.default.createElement(
                                'li',
                                { className: 'show-for-large' },
                                _react2.default.createElement(
                                    'a',
                                    {
                                        className: 'navbar-link hint--bottom hint--rounded hint--no-animate',
                                        href: '/create',
                                        'aria-label': 'Create Page'
                                    },
                                    _react2.default.createElement('span', { className: 'ion-compose icon' }),
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        'Create Page'
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                { className: 'show-for-xxlarge' },
                                _react2.default.createElement(
                                    'a',
                                    {
                                        className: 'navbar-link hint--bottom hint--rounded hint--no-animate',
                                        onClick: this.random,
                                        'aria-label': 'Random Page'
                                    },
                                    _react2.default.createElement('span', { className: 'ion-shuffle icon' }),
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        'Random Page'
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(_Spinner2.default, null)
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'top-bar-right' },
                        rhs
                    )
                ),
                _react2.default.createElement(
                    _velocityReact.VelocityTransitionGroup,
                    {
                        enter: { animation: 'transition.fadeIn' },
                        leave: { animation: 'transition.fadeOut' }
                    },
                    this.state.searchBarOpen ? _react2.default.createElement(
                        'div',
                        { className: 'navbar-search hide-for-xlarge' },
                        _react2.default.createElement(
                            'div',
                            { className: 'row' },
                            _react2.default.createElement(
                                'div',
                                { className: 'input-group' },
                                _react2.default.createElement(_Select2.default, {
                                    name: 'searchText',
                                    className: 'input-group-field search-bar',
                                    onSelectValue: this.onSelectSearchResult,
                                    onSearchTextChanged: this.onSearchTextChanged,
                                    placeholder: 'Search',
                                    autoFocus: true,
                                    moreResults: true
                                }),
                                _react2.default.createElement(
                                    'button',
                                    {
                                        className: 'button primary no-margin-bottom',
                                        style: {
                                            borderTopLeftRadius: 0,
                                            borderBottomLeftRadius: 0
                                        },
                                        onClick: this.search,
                                        'aria-label': 'Search'
                                    },
                                    _react2.default.createElement('span', {
                                        className: 'ion-android-search',
                                        style: { fontSize: 17 }
                                    })
                                )
                            )
                        )
                    ) : null
                )
            );
        }
    }]);

    return Navbar;
}(_react2.default.Component);

exports.default = Navbar;