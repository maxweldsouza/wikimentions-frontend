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

var ButtonSelect = function (_React$Component) {
    _inherits(ButtonSelect, _React$Component);

    _createClass(ButtonSelect, null, [{
        key: 'defaultProps',
        get: function get() {
            return {
                className: 'small button-group'
            };
        }
    }]);

    function ButtonSelect(props) {
        _classCallCheck(this, ButtonSelect);

        var _this = _possibleConstructorReturn(this, (ButtonSelect.__proto__ || Object.getPrototypeOf(ButtonSelect)).call(this, props));

        (0, _reactAutobind2.default)(_this);
        _this.state = {
            selected: _this.props.default
        };
        return _this;
    }

    _createClass(ButtonSelect, [{
        key: 'onChangeSelected',
        value: function onChangeSelected(x) {
            this.setState({
                selected: x
            });
            this.props.onChange(x);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement('input', {
                    type: 'hidden',
                    name: this.props.name,
                    value: this.state.selected ? this.state.selected : ''
                }),
                _react2.default.createElement(
                    'div',
                    { className: this.props.className, role: 'group' },
                    this.props.options.map(function (x) {
                        return _react2.default.createElement(
                            'button',
                            {
                                'aria-selected': _this2.state.selected === x.value,
                                className: _this2.state.selected === x.value ? 'button' : 'button secondary',
                                key: x.value,
                                onClick: _this2.onChangeSelected.bind(null, x.value),
                                type: 'button'
                            },
                            x.name
                        );
                    })
                )
            );
        }
    }]);

    return ButtonSelect;
}(_react2.default.Component);

exports.default = ButtonSelect;