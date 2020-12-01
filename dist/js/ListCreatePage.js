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

var _browserCookies = require('browser-cookies');

var _browserCookies2 = _interopRequireDefault(_browserCookies);

var _snackbar = require('./snackbar');

var _snackbar2 = _interopRequireDefault(_snackbar);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _SubmitButton = require('./SubmitButton');

var _SubmitButton2 = _interopRequireDefault(_SubmitButton);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _Restricted = require('./Restricted');

var _Restricted2 = _interopRequireDefault(_Restricted);

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _LoginModal = require('./LoginModal');

var _LoginModal2 = _interopRequireDefault(_LoginModal);

var _SignupModal = require('./SignupModal');

var _SignupModal2 = _interopRequireDefault(_SignupModal);

var _IpWarning = require('./IpWarning');

var _IpWarning2 = _interopRequireDefault(_IpWarning);

var _reactAutobind = require('react-autobind');

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListCreatePage = function (_React$Component) {
    _inherits(ListCreatePage, _React$Component);

    _createClass(ListCreatePage, null, [{
        key: 'resources',
        value: function resources() {
            return {
                api: []
            };
        }
    }]);

    function ListCreatePage(props) {
        _classCallCheck(this, ListCreatePage);

        var _this = _possibleConstructorReturn(this, (ListCreatePage.__proto__ || Object.getPrototypeOf(ListCreatePage)).call(this, props));

        (0, _reactAutobind2.default)(_this);
        _this.state = {
            title: _this.props.query.title ? _this.props.query.title : '',
            titleValid: true,
            titleMessage: '',
            description: '',
            descriptionValid: true,
            descriptionMessage: '',
            submitting: false,
            formMessage: ''
        };
        return _this;
    }

    _createClass(ListCreatePage, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.query.title) {
                this.setState({
                    title: nextProps.query.title
                });
            }
        }
    }, {
        key: 'onChangeType',
        value: function onChangeType(x) {
            this.setState({
                type: x
            });
        }
    }, {
        key: 'onChangeText',
        value: function onChangeText(e) {
            var temp = {
                error: false,
                message: ''
            };
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
        key: 'validateForm',
        value: function validateForm() {
            var valid = true;
            if (!this.state.title) {
                this.setState({
                    titleValid: false,
                    titleMessage: 'Title cannot be empty'
                });
                valid = false;
            }
            return valid;
        }
    }, {
        key: 'onSubmit',
        value: function onSubmit(e) {
            var _this2 = this;

            e.preventDefault();
            if (this.validateForm()) {
                this.setState({
                    submitting: true
                });
                _superagent2.default.post('/api/v1/lists').type('form').send({
                    title: this.state.title,
                    description: this.state.description,
                    _xsrf: _browserCookies2.default.get('_xsrf')
                }).end(function (err, res) {
                    _this2.setState({
                        submitting: false
                    });
                    if (err && err.status) {
                        _this2.setState({
                            formMessage: res.body.message
                        });
                    } else {
                        _this2.setState({
                            formMessage: ''
                        });
                        (0, _snackbar2.default)({ message: 'List created' });
                        history.pushState(null, null, res.body.redirect);
                        Mentions.route(res.body.redirect);
                    }
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var loggedOutMessage = _react2.default.createElement(
                'span',
                null,
                'You need to ',
                _react2.default.createElement(_LoginModal2.default, null),
                ' / ',
                _react2.default.createElement(_SignupModal2.default, null),
                ' to create a list.'
            );
            return _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(_reactHelmet2.default, {
                    title: 'Create list',
                    titleTemplate: '%s - ' + _config2.default.name,
                    meta: [{
                        name: 'description',
                        content: 'Create a new list on WikiMentions'
                    }],
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
                        { className: 'small-12 columns' },
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'h1',
                                null,
                                'Create list'
                            ),
                            this.state.formMessage ? _react2.default.createElement(
                                'div',
                                { className: 'callout alert' },
                                this.state.formMessage
                            ) : null,
                            _react2.default.createElement(
                                _Restricted2.default,
                                { message: loggedOutMessage },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'row' },
                                    _react2.default.createElement(
                                        'div',
                                        {
                                            className: 'small-12 large-4 large-order-2 columns'
                                        },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'callout warning' },
                                            'Search to check whether a list already exists before adding a new one. Make sure you have read our',
                                            ' ',
                                            _react2.default.createElement(
                                                'a',
                                                { href: '/guidelines' },
                                                'Guidelines'
                                            )
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        {
                                            className: 'small-12 large-8 large-order-1  columns'
                                        },
                                        _react2.default.createElement(_IpWarning2.default, {
                                            loggedin: this.props.loggedin
                                        }),
                                        _react2.default.createElement(
                                            'form',
                                            { onSubmit: this.onSubmit },
                                            'Title',
                                            _react2.default.createElement(_Input2.default, {
                                                type: 'text',
                                                name: 'title',
                                                value: this.state.title,
                                                onChange: this.onChangeText,
                                                onClear: this.onClear,
                                                valid: this.state.titleValid,
                                                message: this.state.titleMessage
                                            }),
                                            _react2.default.createElement(
                                                'span',
                                                null,
                                                'Description (Optional)',
                                                _react2.default.createElement('textarea', {
                                                    type: 'text',
                                                    name: 'description',
                                                    rows: 3,
                                                    value: this.state.description,
                                                    onChange: this.onChangeText
                                                })
                                            ),
                                            _react2.default.createElement(_SubmitButton2.default, {
                                                title: 'Create',
                                                className: 'button primary float-right',
                                                submitting: this.state.submitting
                                            })
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

    return ListCreatePage;
}(_react2.default.Component);

exports.default = ListCreatePage;