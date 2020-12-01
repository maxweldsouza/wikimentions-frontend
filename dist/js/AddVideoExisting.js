'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _browserCookies = require('browser-cookies');

var _browserCookies2 = _interopRequireDefault(_browserCookies);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _snackbar = require('./snackbar');

var _snackbar2 = _interopRequireDefault(_snackbar);

var _SubmitButton = require('./SubmitButton');

var _SubmitButton2 = _interopRequireDefault(_SubmitButton);

var _reactAutobind = require('react-autobind');

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddVideoExisting = function (_React$Component) {
    _inherits(AddVideoExisting, _React$Component);

    function AddVideoExisting(props) {
        _classCallCheck(this, AddVideoExisting);

        var _this = _possibleConstructorReturn(this, (AddVideoExisting.__proto__ || Object.getPrototypeOf(AddVideoExisting)).call(this, props));

        (0, _reactAutobind2.default)(_this);
        _this.state = {
            video_id: '',
            submitting: false,
            videoValid: true,
            videoMessage: '',
            formMessage: ''
        };
        return _this;
    }

    _createClass(AddVideoExisting, [{
        key: 'onSelect',
        value: function onSelect(x) {
            this.setState({
                video_id: x.id
            });
        }
    }, {
        key: 'validateForm',
        value: function validateForm() {
            var valid = true;
            if (!this.state.video_id) {
                this.setState({
                    videoValid: false,
                    videoMessage: 'No video selected'
                });
                valid = false;
            } else {
                this.setState({
                    videoValid: true,
                    videoMessage: ''
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
                _superagent2.default.post('/api/v1/thing/' + this.props.id + '/videos').type('form').send({
                    video_id: this.state.video_id,
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
                        (0, _snackbar2.default)({ message: 'Video added' });
                        history.pushState(null, null, window.location.pathname + window.location.search);
                        Mentions.route(window.location.pathname + window.location.search);
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
                'Search for video',
                _react2.default.createElement(_Select2.default, {
                    name: 'video_id',
                    onSelectValue: this.onSelect,
                    types: ['video'],
                    valid: this.state.videoValid,
                    message: this.state.videoMessage
                }),
                _react2.default.createElement(_SubmitButton2.default, {
                    title: 'Add',
                    className: 'button primary float-right',
                    submitting: this.state.submitting
                })
            );
        }
    }]);

    return AddVideoExisting;
}(_react2.default.Component);

exports.default = AddVideoExisting;