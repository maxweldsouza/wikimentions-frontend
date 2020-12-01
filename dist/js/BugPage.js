'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AdminOnly = require('./AdminOnly');

var _AdminOnly2 = _interopRequireDefault(_AdminOnly);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _Navbar = require('./Navbar');

var _Navbar2 = _interopRequireDefault(_Navbar);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _snackbar = require('./snackbar');

var _snackbar2 = _interopRequireDefault(_snackbar);

var _Time = require('./Time');

var _Time2 = _interopRequireDefault(_Time);

var _reactAutobind = require('react-autobind');

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BugPage = function (_React$Component) {
    _inherits(BugPage, _React$Component);

    _createClass(BugPage, null, [{
        key: 'resources',
        value: function resources() {
            return {
                api: []
            };
        }
    }]);

    function BugPage(props) {
        _classCallCheck(this, BugPage);

        var _this = _possibleConstructorReturn(this, (BugPage.__proto__ || Object.getPrototypeOf(BugPage)).call(this, props));

        (0, _reactAutobind2.default)(_this);
        _this.state = {
            bugs: [],
            page: 1
        };
        return _this;
    }

    _createClass(BugPage, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.fetchData(1);
        }
    }, {
        key: 'fetchData',
        value: function fetchData(page) {
            var _this2 = this;

            var url = page === 1 ? '/api/v1/bugs' : '/api/v1/bugs?page=' + page;
            _superagent2.default.get(url).send().end(function (err, res) {
                if (err && err.status) {
                    (0, _snackbar2.default)({ message: res.body.message });
                } else {
                    _this2.setState({
                        page: page,
                        bugs: res.body
                    });
                }
            });
        }
    }, {
        key: 'prevPage',
        value: function prevPage() {
            this.fetchData(this.state.page - 1);
        }
    }, {
        key: 'nextPage',
        value: function nextPage() {
            this.fetchData(this.state.page + 1);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(_reactHelmet2.default, {
                    title: 'Bug Reports',
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
                            'h1',
                            null,
                            'Bugs Page: ',
                            this.state.page
                        ),
                        _react2.default.createElement(
                            _AdminOnly2.default,
                            null,
                            _react2.default.createElement(
                                'div',
                                { className: 'row' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'small-12 columns' },
                                    _react2.default.createElement('hr', null),
                                    this.state.bugs.map(function (x) {
                                        return _react2.default.createElement(
                                            'div',
                                            { className: 'row', key: x.id },
                                            _react2.default.createElement(
                                                'span',
                                                {
                                                    className: 'small-8 columns'
                                                },
                                                'Url:',
                                                ' ',
                                                _react2.default.createElement(
                                                    'a',
                                                    { href: x.url },
                                                    x.url
                                                )
                                            ),
                                            _react2.default.createElement(
                                                'span',
                                                {
                                                    className: 'small-4 columns text-right'
                                                },
                                                _react2.default.createElement(_Time2.default, {
                                                    timestamp: x.updated,
                                                    type: 'ago'
                                                })
                                            ),
                                            _react2.default.createElement(
                                                'span',
                                                {
                                                    className: 'small-4 columns'
                                                },
                                                'User:',
                                                ' ',
                                                x.user ? _react2.default.createElement(
                                                    'a',
                                                    {
                                                        href: '/users/' + x.user.id + '/' + x.user.name
                                                    },
                                                    x.user.name
                                                ) : null
                                            ),
                                            _react2.default.createElement(
                                                'span',
                                                {
                                                    className: 'small-4 columns'
                                                },
                                                _react2.default.createElement(
                                                    'div',
                                                    null,
                                                    'ID: ',
                                                    x.id
                                                )
                                            ),
                                            _react2.default.createElement(
                                                'span',
                                                {
                                                    className: 'small-4 columns'
                                                },
                                                'Platform: ',
                                                x.platform
                                            ),
                                            _react2.default.createElement(
                                                'span',
                                                {
                                                    className: 'small-12 columns'
                                                },
                                                'Useragent: ',
                                                x.useragent
                                            ),
                                            _react2.default.createElement(
                                                'span',
                                                {
                                                    className: 'small-12 columns'
                                                },
                                                _react2.default.createElement(
                                                    'div',
                                                    { className: 'callout' },
                                                    x.message
                                                ),
                                                _react2.default.createElement('hr', null)
                                            )
                                        );
                                    }),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'row' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'small-6 columns' },
                                            this.state.page > 1 ? _react2.default.createElement(
                                                'a',
                                                {
                                                    className: 'secondary',
                                                    onClick: this.prevPage
                                                },
                                                'Previous'
                                            ) : null
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            {
                                                className: 'small-6 columns text-right'
                                            },
                                            _react2.default.createElement(
                                                'a',
                                                {
                                                    className: 'secondary',
                                                    onClick: this.nextPage
                                                },
                                                'Next'
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return BugPage;
}(_react2.default.Component);

exports.default = BugPage;