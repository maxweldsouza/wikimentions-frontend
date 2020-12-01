'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _Navbar = require('./Navbar');

var _Navbar2 = _interopRequireDefault(_Navbar);

var _Pagination = require('./Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

var _HistoryItem = require('./HistoryItem');

var _HistoryItem2 = _interopRequireDefault(_HistoryItem);

var _PageBar = require('./PageBar');

var _PageBar2 = _interopRequireDefault(_PageBar);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HistoryPage = function (_React$Component) {
    _inherits(HistoryPage, _React$Component);

    function HistoryPage() {
        _classCallCheck(this, HistoryPage);

        return _possibleConstructorReturn(this, (HistoryPage.__proto__ || Object.getPrototypeOf(HistoryPage)).apply(this, arguments));
    }

    _createClass(HistoryPage, [{
        key: 'render',
        value: function render() {
            var id = Number(this.props.path.split('/')[1]);
            var slug = this.props.data.history.props.slug;
            var type = this.props.data.history.props.type;
            var history = this.props.data.history.history;
            var nodata = void 0;
            if (history.length === 0) {
                nodata = _react2.default.createElement(
                    'div',
                    { className: 'small-12 columns' },
                    _react2.default.createElement(
                        'div',
                        { className: 'blankslate' },
                        _react2.default.createElement(
                            'h3',
                            null,
                            'No history'
                        ),
                        'There is no recorded history for this page.'
                    )
                );
            }
            return _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(_reactHelmet2.default, {
                    title: 'History - ' + this.props.data.thing.props.title,
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
                            'History - ' + this.props.data.thing.props.title
                        ),
                        _react2.default.createElement(_PageBar2.default, { id: id, slug: slug, type: type }),
                        _react2.default.createElement('hr', null),
                        _react2.default.createElement(
                            'div',
                            { className: 'row' },
                            nodata,
                            history.map(function (x) {
                                return _react2.default.createElement(_HistoryItem2.default, {
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
                            count: history.length
                        })
                    )
                )
            );
        }
    }], [{
        key: 'resources',
        value: function resources(appstate) {
            var _appstate$path$split = appstate.path.split('/'),
                _appstate$path$split2 = _slicedToArray(_appstate$path$split, 3),
                type = _appstate$path$split2[0],
                id = _appstate$path$split2[1],
                slug = _appstate$path$split2[2];

            var page = appstate.query.page;
            var query = page ? '?page=' + page : '';
            return {
                api: [{
                    name: 'history',
                    path: '/api/v1/history/' + id + query
                }, {
                    name: 'thing',
                    path: '/api/v1/thing/' + id
                }]
            };
        }
    }]);

    return HistoryPage;
}(_react2.default.Component);

exports.default = HistoryPage;