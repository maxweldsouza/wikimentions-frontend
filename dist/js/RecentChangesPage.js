'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _Navbar = require('./Navbar');

var _Navbar2 = _interopRequireDefault(_Navbar);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _Pagination = require('./Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

var _HistoryItem = require('./HistoryItem');

var _HistoryItem2 = _interopRequireDefault(_HistoryItem);

var _reactAutobind = require('react-autobind');

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RecentChangesPage = function (_React$Component) {
    _inherits(RecentChangesPage, _React$Component);

    function RecentChangesPage() {
        _classCallCheck(this, RecentChangesPage);

        return _possibleConstructorReturn(this, (RecentChangesPage.__proto__ || Object.getPrototypeOf(RecentChangesPage)).apply(this, arguments));
    }

    _createClass(RecentChangesPage, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(_reactHelmet2.default, {
                    title: 'Recent Changes',
                    titleTemplate: '%s - ' + _config2.default.name,
                    meta: [{ name: 'robots', content: 'noindex' }],
                    link: [{ rel: 'canonical', href: _config2.default.url + this.props.path }]
                }),
                _react2.default.createElement(_Navbar2.default, {
                    loggedin: this.props.loggedin,
                    username: this.props.username,
                    userid: this.props.userid,
                    toggleSidebar: this.props.toggleSidebar
                }),
                _react2.default.createElement(
                    'div',
                    { className: 'row page-body white' },
                    _react2.default.createElement(
                        'div',
                        { className: 'small-12 large-8 columns' },
                        _react2.default.createElement(
                            'h1',
                            null,
                            'Recent Changes'
                        ),
                        _react2.default.createElement('hr', null),
                        _react2.default.createElement(
                            'div',
                            { className: 'row' },
                            this.props.data.history.map(function (x, i) {
                                return _react2.default.createElement(_HistoryItem2.default, {
                                    key: i,
                                    user: x.user,
                                    username: x.username,
                                    ip: x.ip,
                                    entry: x.entry,
                                    entrytype: x.entrytype,
                                    timestamp: x.timestamp,
                                    deleted: x.deleted
                                });
                            })
                        ),
                        _react2.default.createElement(_Pagination2.default, {
                            path: this.props.path,
                            page: this.props.query.page,
                            count: this.props.data.history.length
                        })
                    )
                )
            );
        }
    }], [{
        key: 'resources',
        value: function resources(appstate) {
            var page = appstate.query.page;
            var query = page ? '?page=' + page : '';
            return {
                api: [{
                    name: 'history',
                    path: '/api/v1/recent-changes' + query
                }]
            };
        }
    }]);

    return RecentChangesPage;
}(_react2.default.Component);

exports.default = RecentChangesPage;