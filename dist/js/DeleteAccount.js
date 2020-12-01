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

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _browserCookies = require('browser-cookies');

var _browserCookies2 = _interopRequireDefault(_browserCookies);

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _reactAutobind = require('react-autobind');

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DeleteAccount = function (_React$Component) {
    _inherits(DeleteAccount, _React$Component);

    function DeleteAccount(props) {
        _classCallCheck(this, DeleteAccount);

        var _this = _possibleConstructorReturn(this, (DeleteAccount.__proto__ || Object.getPrototypeOf(DeleteAccount)).call(this, props));

        (0, _reactAutobind2.default)(_this);
        _this.state = {
            submitting: false,
            password: ''
        };
        return _this;
    }

    _createClass(DeleteAccount, [{
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
        key: 'deleteAccount',
        value: function deleteAccount(e) {
            var _this2 = this;

            e.preventDefault();
            if (!this.state.password) {
                (0, _snackbar2.default)({ message: 'Password is empty' });
            } else {
                this.setState({
                    submitting: true
                });
                _superagent2.default.post('/api/v1/user/' + this.props.id + '/delete').type('form').send({
                    password: this.state.password,
                    _xsrf: _browserCookies2.default.get('_xsrf')
                }).end(function (err, res) {
                    _this2.setState({
                        submitting: false
                    });
                    if (err && err.status) {
                        (0, _snackbar2.default)({ message: res.body.message });
                    } else {
                        (0, _snackbar2.default)({ message: 'Account permanently deleted' });
                        history.pushState(null, null, '/');
                        Mentions.route('/');
                    }
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                {
                    className: 'tabs-panel is-active',
                    role: 'tabpanel',
                    'aria-hidden': 'false'
                },
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'large-8 columns' },
                        _react2.default.createElement(
                            'form',
                            {
                                onSubmit: this.deleteAccount,
                                className: 'columns box'
                            },
                            _react2.default.createElement(
                                'h2',
                                null,
                                'Delete Account'
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'callout warning' },
                                'If you delete your account all your account information will be deleted. Any edits/contributions will NOT be deleted. This cannot be undone.'
                            ),
                            'Password',
                            _react2.default.createElement(_Input2.default, {
                                type: 'password',
                                name: 'password',
                                onChange: this.onChangeText,
                                value: this.state.password,
                                onClear: this.onClear,
                                valid: true,
                                message: ''
                            }),
                            _react2.default.createElement(_SubmitButton2.default, {
                                title: 'Delete Account',
                                className: 'button alert float-right',
                                submitting: this.state.submitting
                            })
                        )
                    )
                )
            );
        }
    }]);

    return DeleteAccount;
}(_react2.default.Component);

exports.default = DeleteAccount;