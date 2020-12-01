'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _snackbar = require('./snackbar');

var _snackbar2 = _interopRequireDefault(_snackbar);

var _SubmitButton = require('./SubmitButton');

var _SubmitButton2 = _interopRequireDefault(_SubmitButton);

var _browserCookies = require('browser-cookies');

var _browserCookies2 = _interopRequireDefault(_browserCookies);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _reactAutobind = require('react-autobind');

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddVideoNew = function (_React$Component) {
    _inherits(AddVideoNew, _React$Component);

    function AddVideoNew(props) {
        _classCallCheck(this, AddVideoNew);

        var _this = _possibleConstructorReturn(this, (AddVideoNew.__proto__ || Object.getPrototypeOf(AddVideoNew)).call(this, props));

        (0, _reactAutobind2.default)(_this);
        _this.state = {
            title: '',
            url: '',
            titleValid: true,
            urlValid: true,
            titleMessage: '',
            urlMessage: '',
            formMessage: ''
        };
        return _this;
    }

    _createClass(AddVideoNew, [{
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
        key: 'validateForm',
        value: function validateForm() {
            var valid = true;
            if (!this.state.title) {
                this.setState({
                    titleValid: false,
                    titleMessage: 'Title cannot be empty'
                });
                valid = false;
            } else {
                this.setState({
                    titleValid: true,
                    titleMessage: ''
                });
            }
            if (!this.state.url) {
                this.setState({
                    urlValid: false,
                    urlMessage: 'Url cannot be empty'
                });
                valid = false;
            } else {
                this.setState({
                    urlValid: true,
                    urlMessage: ''
                });
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
                _superagent2.default.post('/api/v1/thing').type('form').send({
                    title: this.state.title,
                    url: this.state.url,
                    type: 'video',
                    _xsrf: _browserCookies2.default.get('_xsrf')
                }).end(function (err, res) {
                    if (err && err.status) {
                        _this2.setState({
                            formMessage: res.body.message
                        });
                    } else {
                        _superagent2.default.post('/api/v1/thing/' + _this2.props.id + '/videos').type('form').send({
                            video_id: res.body.id,
                            _xsrf: _browserCookies2.default.get('_xsrf')
                        }).end(function (err2, res2) {
                            _this2.setState({
                                submitting: false,
                                title: '',
                                url: ''
                            });
                            if (err2 && err2.status) {
                                _this2.setState({
                                    formMessage: res2.body.message
                                });
                            } else {
                                _this2.setState({
                                    formMessage: ''
                                });
                                (0, _snackbar2.default)({ message: 'Video added' });
                                history.pushState(null, null, window.location.pathname + window.location.search);
                                Mentions.route(window.location.pathname + window.location.search);
                            }
                        });
                    }
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'form',
                { onSubmit: this.onSubmit },
                this.state.formMessage ? _react2.default.createElement(
                    'div',
                    { className: 'callout alert' },
                    this.state.formMessage
                ) : null,
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
                'Url',
                _react2.default.createElement(_Input2.default, {
                    type: 'text',
                    name: 'url',
                    value: this.state.url,
                    onChange: this.onChangeText,
                    onClear: this.onClear,
                    valid: this.state.urlValid,
                    placeholder: 'http://',
                    message: this.state.urlMessage
                }),
                _react2.default.createElement(_SubmitButton2.default, {
                    title: 'Create',
                    className: 'button primary float-right',
                    submitting: this.state.submitting
                })
            );
        }
    }]);

    return AddVideoNew;
}(_react2.default.Component);

exports.default = AddVideoNew;