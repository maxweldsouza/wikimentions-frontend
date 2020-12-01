'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAutobind = require('react-autobind');

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* Having a time ago or a local timestamp prevents us from caching pages
This component renders the timestamp no the client side instead */

var toTitle = function toTitle(moment, time) {
    return time.local().format('LLL');
};

var toTime = function toTime(moment, time, format, type) {
    if (type === 'ago') {
        return time.local().calendar(null, {
            sameDay: 'LT',
            nextDay: '[Tomorrow]',
            nextWeek: 'dddd',
            lastDay: '[Yesterday] LT',
            lastWeek: 'MMM DD[,] YYYY',
            sameElse: 'MMM DD[,] YYYY'
        });
    }
    return time.local().format(format);
};

var Time = function (_React$Component) {
    _inherits(Time, _React$Component);

    _createClass(Time, null, [{
        key: 'defaultProps',
        get: function get() {
            return {
                hintDirection: 'bottom'
            };
        }
    }]);

    function Time(props) {
        _classCallCheck(this, Time);

        var _this = _possibleConstructorReturn(this, (Time.__proto__ || Object.getPrototypeOf(Time)).call(this, props));

        (0, _reactAutobind2.default)(_this);
        _this.state = {
            server: true
        };
        return _this;
    }

    _createClass(Time, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            new Promise(function (resolve) {
                require.ensure([], function (require) {
                    resolve(require('moment'));
                });
            }).then(function (moment) {
                var time = moment.utc(_this2.props.timestamp);
                _this2.setState({
                    time: toTime(moment, time, _this2.props.format, _this2.props.type),
                    title: toTitle(moment, time),
                    server: false
                });
            }).catch(function (err) {
                return console.log('Failed to load moment', err);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.state.server) {
                return null;
            }
            return _react2.default.createElement(
                'time',
                {
                    className: 'hint--' + this.props.hintDirection + ' hint--rounded hint--no-animate',
                    'aria-label': this.state.title,
                    dateTime: this.props.timestamp
                },
                this.state.time
            );
        }
    }]);

    return Time;
}(_react2.default.Component);

exports.default = Time;