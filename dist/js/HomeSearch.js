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

var HomeSearch = function (_React$Component) {
    _inherits(HomeSearch, _React$Component);

    function HomeSearch(props) {
        _classCallCheck(this, HomeSearch);

        var _this = _possibleConstructorReturn(this, (HomeSearch.__proto__ || Object.getPrototypeOf(HomeSearch)).call(this, props));

        (0, _reactAutobind2.default)(_this);
        _this.state = {
            searchText: ''
        };
        return _this;
    }

    _createClass(HomeSearch, [{
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
        key: 'handleKeys',
        value: function handleKeys(event) {
            if (event.key === 'Enter') {
                var path = '/search?q=' + this.state.searchText;
                history.pushState(null, null, path);
                Mentions.route(path);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'h2',
                    null,
                    'Search'
                ),
                _react2.default.createElement('input', {
                    type: 'text',
                    name: 'searchText',
                    value: this.state.searchText,
                    onChange: this.onChangeText,
                    onKeyDown: this.handleKeys
                })
            );
        }
    }]);

    return HomeSearch;
}(_react2.default.Component);

exports.default = HomeSearch;