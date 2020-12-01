'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _browserCookies = require('browser-cookies');

var _browserCookies2 = _interopRequireDefault(_browserCookies);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _snackbar = require('./snackbar');

var _snackbar2 = _interopRequireDefault(_snackbar);

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _reactAutobind = require('react-autobind');

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Feedback = function (_React$Component) {
    _inherits(Feedback, _React$Component);

    function Feedback(props) {
        _classCallCheck(this, Feedback);

        var _this = _possibleConstructorReturn(this, (Feedback.__proto__ || Object.getPrototypeOf(Feedback)).call(this, props));

        (0, _reactAutobind2.default)(_this);
        _this.state = {
            step: 'rate',
            feedback: '',
            email: ''
        };
        return _this;
    }

    _createClass(Feedback, [{
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
        key: 'onRate',
        value: function onRate(rate) {
            var _this2 = this;

            _superagent2.default.post('/api/v1/feedback').type('form').send({
                positive: rate,
                platform: window.navigator.platform,
                useragent: window.navigator.userAgent,
                url: window.location.pathname + window.location.search,
                _xsrf: _browserCookies2.default.get('_xsrf')
            }).end(function (err, res) {
                if (err) {
                    (0, _snackbar2.default)({ message: res.body.message });
                } else {
                    _this2.setState({
                        step: 'feedback',
                        token: res.body.token
                    });
                }
            });
        }
    }, {
        key: 'onFeedback',
        value: function onFeedback() {
            var _this3 = this;

            _superagent2.default.post('/api/v1/feedback').type('form').send({
                token: this.state.token,
                feedback: this.state.feedback,
                _xsrf: _browserCookies2.default.get('_xsrf')
            }).end(function (err, res) {
                if (err) {
                    (0, _snackbar2.default)({ message: res.body.message });
                } else {
                    _this3.setState({
                        step: 'email'
                    });
                }
            });
        }
    }, {
        key: 'onEmail',
        value: function onEmail() {
            var _this4 = this;

            _superagent2.default.post('/api/v1/feedback').type('form').send({
                email: this.state.email,
                token: this.state.token,
                _xsrf: _browserCookies2.default.get('_xsrf')
            }).end(function (err, res) {
                if (err) {
                    (0, _snackbar2.default)({ message: res.body.message });
                } else {
                    _this4.setState({
                        step: 'done'
                    });
                }
            });
        }
    }, {
        key: 'startOver',
        value: function startOver() {
            this.setState({
                step: 'rate'
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var main = void 0;
            if (this.state.step === 'rate') {
                main = _react2.default.createElement(
                    'div',
                    { style: { textAlign: 'right' } },
                    _config2.default.name + ' is ',
                    _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement(
                            'button',
                            {
                                className: 'button small secondary no-margin-bottom',
                                onClick: this.onRate.bind(null, 'good')
                            },
                            _react2.default.createElement('i', { className: 'ion-checkmark' }),
                            ' Great'
                        ),
                        ' ',
                        _react2.default.createElement(
                            'button',
                            {
                                className: 'button small secondary no-margin-bottom',
                                onClick: this.onRate.bind(null, 'bad')
                            },
                            _react2.default.createElement('i', { className: 'ion-close' }),
                            ' Needs Work'
                        )
                    )
                );
            } else if (this.state.step === 'feedback') {
                main = _react2.default.createElement(
                    'div',
                    null,
                    'How can we improve ?',
                    _react2.default.createElement('textarea', {
                        type: 'text',
                        className: 'form-control',
                        name: 'feedback',
                        onChange: this.onChangeText,
                        maxLength: 65535
                    }),
                    _react2.default.createElement(
                        'div',
                        { className: 'float-right small button-group' },
                        _react2.default.createElement(
                            'button',
                            {
                                className: 'button secondary no-margin-bottom',
                                onClick: this.startOver,
                                role: 'button'
                            },
                            'Cancel'
                        ),
                        _react2.default.createElement(
                            'button',
                            {
                                className: 'button no-margin-bottom',
                                onClick: this.onFeedback,
                                role: 'button'
                            },
                            'Send Feedback'
                        ),
                        ' '
                    )
                );
            } else if (this.state.step === 'email') {
                main = _react2.default.createElement(
                    'div',
                    { className: '' },
                    'Would you like to leave your email?',
                    _react2.default.createElement(_Input2.default, {
                        type: 'email',
                        className: 'form-control',
                        name: 'email',
                        value: this.state.email,
                        onChange: this.onChangeText,
                        onClear: this.onClear,
                        valid: true,
                        message: ''
                    }),
                    _react2.default.createElement(
                        'div',
                        { className: 'float-right small button-group' },
                        _react2.default.createElement(
                            'button',
                            {
                                className: 'button secondary no-margin-bottom',
                                onClick: this.startOver,
                                role: 'button'
                            },
                            'No Thanks'
                        ),
                        _react2.default.createElement(
                            'button',
                            {
                                className: 'button no-margin-bottom',
                                onClick: this.onEmail,
                                role: 'button'
                            },
                            'Save'
                        ),
                        ' '
                    )
                );
            } else if (this.state.step === 'done') {
                main = _react2.default.createElement(
                    'div',
                    null,
                    'Thanks for your feedback!',
                    ' ',
                    _react2.default.createElement(
                        'button',
                        {
                            className: 'button small secondary no-margin-bottom',
                            onClick: this.startOver
                        },
                        'Start Over'
                    )
                );
            }
            return main;
        }
    }]);

    return Feedback;
}(_react2.default.Component);

exports.default = Feedback;