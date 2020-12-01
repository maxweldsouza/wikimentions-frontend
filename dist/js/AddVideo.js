'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ButtonSelect = require('./ButtonSelect');

var _ButtonSelect2 = _interopRequireDefault(_ButtonSelect);

var _AddVideoNew = require('./AddVideoNew');

var _AddVideoNew2 = _interopRequireDefault(_AddVideoNew);

var _AddVideoExisting = require('./AddVideoExisting');

var _AddVideoExisting2 = _interopRequireDefault(_AddVideoExisting);

var _Restricted = require('./Restricted');

var _Restricted2 = _interopRequireDefault(_Restricted);

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

var AddVideo = function (_React$Component) {
    _inherits(AddVideo, _React$Component);

    function AddVideo(props) {
        _classCallCheck(this, AddVideo);

        var _this = _possibleConstructorReturn(this, (AddVideo.__proto__ || Object.getPrototypeOf(AddVideo)).call(this, props));

        (0, _reactAutobind2.default)(_this);
        _this.state = {
            type: 'Existing'
        };
        return _this;
    }

    _createClass(AddVideo, [{
        key: 'onChangeType',
        value: function onChangeType(x) {
            this.setState({
                type: x
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var options = [{ name: 'Existing', value: 'Existing' }, { name: 'New', value: 'New' }];
            var loggedOutMessage = _react2.default.createElement(
                'span',
                null,
                'You need to ',
                _react2.default.createElement(_LoginModal2.default, null),
                ' / ',
                _react2.default.createElement(_SignupModal2.default, null),
                ' to add a Video.'
            );
            return _react2.default.createElement(
                _Restricted2.default,
                { message: loggedOutMessage },
                _react2.default.createElement(
                    'h2',
                    null,
                    'Add video'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'small-12 large-4 large-order-2 columns' },
                        _react2.default.createElement(
                            'div',
                            { className: 'callout warning' },
                            'Check whether a video already exists before adding a new one. Adding a new video will create a separate page.'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'small-12 large-8 large-order-1 columns' },
                        _react2.default.createElement(_IpWarning2.default, { loggedin: this.props.loggedin }),
                        _react2.default.createElement(_ButtonSelect2.default, {
                            options: options,
                            'default': this.state.type,
                            onChange: this.onChangeType
                        }),
                        this.state.type !== 'New' ? _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(_AddVideoExisting2.default, {
                                id: this.props.id,
                                loggedin: this.props.loggedin
                            })
                        ) : _react2.default.createElement(
                            'span',
                            null,
                            _react2.default.createElement(_AddVideoNew2.default, {
                                id: this.props.id,
                                loggedin: this.props.loggedin
                            })
                        )
                    )
                )
            );
        }
    }]);

    return AddVideo;
}(_react2.default.Component);

exports.default = AddVideo;