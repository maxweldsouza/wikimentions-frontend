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

var _Time = require('./Time');

var _Time2 = _interopRequireDefault(_Time);

var _snackbar = require('./snackbar');

var _snackbar2 = _interopRequireDefault(_snackbar);

var _reactAutobind = require('react-autobind');

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FeedbackPage = function (_React$Component) {
    _inherits(FeedbackPage, _React$Component);

    _createClass(FeedbackPage, null, [{
        key: 'resources',
        value: function resources() {
            return {
                api: []
            };
        }
    }]);

    function FeedbackPage(props) {
        _classCallCheck(this, FeedbackPage);

        var _this = _possibleConstructorReturn(this, (FeedbackPage.__proto__ || Object.getPrototypeOf(FeedbackPage)).call(this, props));

        (0, _reactAutobind2.default)(_this);
        _this.state = {
            feedback: [],
            page: 1
        };
        return _this;
    }

    _createClass(FeedbackPage, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.fetchFeedback(1);
        }
    }, {
        key: 'fetchFeedback',
        value: function fetchFeedback(page) {
            var _this2 = this;

            _superagent2.default.get(page === 1 ? '/api/v1/feedback' : '/api/v1/feedback?page=' + page).send().end(function (err, res) {
                if (err && err.status) {
                    (0, _snackbar2.default)({ message: res.body.message });
                } else {
                    _this2.setState({
                        page: page,
                        feedback: res.body
                    });
                }
            });
        }
    }, {
        key: 'prevPage',
        value: function prevPage() {
            this.fetchFeedback(this.state.page - 1);
        }
    }, {
        key: 'nextPage',
        value: function nextPage() {
            this.fetchFeedback(this.state.page + 1);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(_reactHelmet2.default, {
                    title: 'Feedback',
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
                            'Feedback Page: ',
                            this.state.page
                        ),
                        _react2.default.createElement('hr', null),
                        _react2.default.createElement(
                            'div',
                            { className: 'row' },
                            _react2.default.createElement(
                                _AdminOnly2.default,
                                null,
                                _react2.default.createElement(
                                    'div',
                                    { className: 'small-12 columns' },
                                    this.state.feedback.map(function (x) {
                                        return _react2.default.createElement(
                                            'div',
                                            { className: 'row', key: x.id },
                                            _react2.default.createElement(
                                                'span',
                                                {
                                                    className: 'small-8 columns'
                                                },
                                                _react2.default.createElement(
                                                    'strong',
                                                    null,
                                                    'Type:'
                                                ),
                                                ' ',
                                                x.rating === 1 ? _react2.default.createElement('span', {
                                                    className: 'ion-checkmark',
                                                    style: {
                                                        color: 'hsla(144, 60%, 60%, 1)'
                                                    }
                                                }) : _react2.default.createElement('span', {
                                                    className: 'ion-close',
                                                    style: {
                                                        color: 'hsla(0, 83%, 57%, 1)'
                                                    }
                                                })
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
                                                    className: 'small-12 columns'
                                                },
                                                'Feedback:',
                                                ' ',
                                                _react2.default.createElement(
                                                    'strong',
                                                    null,
                                                    x.content
                                                )
                                            ),
                                            _react2.default.createElement(
                                                'span',
                                                {
                                                    className: 'small-4 columns'
                                                },
                                                'Email: ',
                                                x.email
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
                                                x.useragent,
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

    return FeedbackPage;
}(_react2.default.Component);

exports.default = FeedbackPage;