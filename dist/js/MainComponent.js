'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Feedback = require('./Feedback');

var _Feedback2 = _interopRequireDefault(_Feedback);

var _Footer = require('./Footer');

var _Footer2 = _interopRequireDefault(_Footer);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _Sidebar = require('./Sidebar');

var _Sidebar2 = _interopRequireDefault(_Sidebar);

var _store = require('store');

var _store2 = _interopRequireDefault(_store);

var _reactAutobind = require('react-autobind');

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MainComponent = function (_React$Component) {
    _inherits(MainComponent, _React$Component);

    _createClass(MainComponent, null, [{
        key: 'defaultProps',
        get: function get() {
            return {
                loggedin: false,
                username: '',
                userid: ''
            };
        }
    }]);

    function MainComponent(props) {
        _classCallCheck(this, MainComponent);

        var _this = _possibleConstructorReturn(this, (MainComponent.__proto__ || Object.getPrototypeOf(MainComponent)).call(this, props));

        (0, _reactAutobind2.default)(_this);
        _this.state = {
            sidebar: false
        };
        return _this;
    }

    _createClass(MainComponent, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var country = _store2.default.get('country');
            if (!country) {
                _superagent2.default.get('/api/v1/country').end(function (err, res) {
                    if (err) {
                        return;
                    }
                    if (res.body.country) {
                        _store2.default.set('country', res.body.country);
                    }
                });
            }
            console.log('Hi there !');
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps() {
            this.setState({
                sidebar: false
            });
        }
    }, {
        key: 'onCloseSidebar',
        value: function onCloseSidebar() {
            this.setState({
                sidebar: false
            });
        }
    }, {
        key: 'onToggleSidebar',
        value: function onToggleSidebar() {
            this.setState({
                sidebar: !this.state.sidebar
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var Component = this.props.component;
            var session = void 0;
            var username = void 0;
            var userid = void 0;
            var loggedin = void 0;
            loggedin = Boolean(session);
            return _react2.default.createElement(
                'div',
                { className: 'main-component' },
                _react2.default.createElement(
                    'div',
                    { className: 'main-content' },
                    _react2.default.createElement(_Sidebar2.default, {
                        showing: this.state.sidebar,
                        onToggleSidebar: this.onCloseSidebar,
                        loggedin: this.props.loggedin,
                        username: this.props.username,
                        userid: this.props.userid
                    }),
                    _react2.default.createElement(Component, {
                        data: this.props.data,
                        path: this.props.path,
                        query: this.props.query,
                        loggedin: this.props.loggedin,
                        username: this.props.username,
                        userid: this.props.userid,
                        toggleSidebar: this.onToggleSidebar
                    })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'footer-feedback' },
                    _react2.default.createElement(
                        'div',
                        { className: 'row align-right' },
                        _react2.default.createElement(
                            'div',
                            { className: 'small-12 large-6 columns' },
                            _react2.default.createElement(_Feedback2.default, null)
                        )
                    )
                ),
                _react2.default.createElement(_Footer2.default, null)
            );
        }
    }]);

    return MainComponent;
}(_react2.default.Component);

MainComponent.propTypes = {
    query: _react2.default.PropTypes.object,
    path: function path(props, propName, componentName) {
        if (props[propName][0] === '/') {
            return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Validation failed.');
        }
    }
};

exports.default = MainComponent;