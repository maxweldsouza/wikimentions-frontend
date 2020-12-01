'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _reactAutobind = require('react-autobind');

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pagination = function (_React$Component) {
    _inherits(Pagination, _React$Component);

    function Pagination() {
        _classCallCheck(this, Pagination);

        return _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).apply(this, arguments));
    }

    _createClass(Pagination, [{
        key: 'pagePath',
        value: function pagePath(no) {
            var query = this.props.query ? _underscore2.default.clone(this.props.query) : {};
            if (no === 1) {
                if (query && query.page) {
                    delete query.page;
                }
            } else {
                query.page = no;
            }
            if (_underscore2.default.isEmpty(query)) {
                return '/' + this.props.path;
            }
            return '/' + this.props.path + '?' + _queryString2.default.stringify(query);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var current = this.props.page ? Number(this.props.page) : 1;
            var totalPages = void 0;
            if (_underscore2.default.isUndefined(this.props.total)) {
                totalPages = this.props.count < 10 ? current : current + 1;
            } else {
                totalPages = Math.ceil(this.props.total / 10);
                if (totalPages < 2) {
                    return null;
                }
            }
            var pages = Array(totalPages).fill();
            pages = pages.map(function (x, i) {
                return i + 1;
            });
            var prev = this.pagePath(current - 1);
            var next = this.pagePath(current + 1);
            if (current === 1) {
                prev = _react2.default.createElement(
                    'li',
                    { className: 'pagination-previous disabled' },
                    'Previous ',
                    _react2.default.createElement(
                        'span',
                        { className: 'show-for-sr' },
                        'page'
                    )
                );
            } else {
                prev = _react2.default.createElement(
                    'li',
                    { className: 'pagination-previous' },
                    _react2.default.createElement(
                        'a',
                        { 'aria-label': 'Previous page', href: prev },
                        'Previous ',
                        _react2.default.createElement(
                            'span',
                            { className: 'show-for-sr' },
                            'page'
                        )
                    )
                );
            }
            if (current === totalPages) {
                next = _react2.default.createElement(
                    'li',
                    { className: 'pagination-next disabled' },
                    'Next ',
                    _react2.default.createElement(
                        'span',
                        { className: 'show-for-sr' },
                        'page'
                    )
                );
            } else {
                next = _react2.default.createElement(
                    'li',
                    { className: 'pagination-next' },
                    _react2.default.createElement(
                        'a',
                        { 'aria-label': 'Next page', href: next },
                        'Next ',
                        _react2.default.createElement(
                            'span',
                            { className: 'show-for-sr' },
                            'page'
                        )
                    )
                );
            }
            return _react2.default.createElement(
                'div',
                { className: 'box' },
                _react2.default.createElement(
                    'div',
                    { className: 'small-12 columns' },
                    _react2.default.createElement(
                        'ul',
                        {
                            className: 'pagination text-center',
                            role: 'navigation',
                            'aria-label': 'Pagination'
                        },
                        prev,
                        pages.map(function (x) {
                            var path = _this2.pagePath(x);
                            if (x === current) {
                                return _react2.default.createElement(
                                    'li',
                                    { className: 'current', key: x },
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'show-for-sr' },
                                        'You\'re on page'
                                    ),
                                    ' ',
                                    x
                                );
                            }
                            return _react2.default.createElement(
                                'li',
                                { key: x },
                                _react2.default.createElement(
                                    'a',
                                    { 'aria-label': 'Page ' + x, href: path },
                                    x
                                )
                            );
                        }),
                        next
                    )
                )
            );
        }
    }]);

    return Pagination;
}(_react2.default.Component);

exports.default = Pagination;