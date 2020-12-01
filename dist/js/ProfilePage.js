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

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _HistoryItem = require('./HistoryItem');

var _HistoryItem2 = _interopRequireDefault(_HistoryItem);

var _Time = require('./Time');

var _Time2 = _interopRequireDefault(_Time);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _Profile = require('./Profile');

var _Profile2 = _interopRequireDefault(_Profile);

var _string = require('string');

var _string2 = _interopRequireDefault(_string);

var _Pagination = require('./Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

var _TextWidget = require('./TextWidget');

var _TextWidget2 = _interopRequireDefault(_TextWidget);

var _Markdown = require('./Markdown');

var _Markdown2 = _interopRequireDefault(_Markdown);

var _reactAutobind = require('react-autobind');

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProfilePage = function (_React$Component) {
    _inherits(ProfilePage, _React$Component);

    function ProfilePage() {
        _classCallCheck(this, ProfilePage);

        return _possibleConstructorReturn(this, (ProfilePage.__proto__ || Object.getPrototypeOf(ProfilePage)).apply(this, arguments));
    }

    _createClass(ProfilePage, [{
        key: 'render',
        value: function render() {
            var _props$path$split = this.props.path.split('/'),
                _props$path$split2 = _slicedToArray(_props$path$split, 4),
                dummy = _props$path$split2[0],
                id = _props$path$split2[1],
                name = _props$path$split2[2],
                selectedTab = _props$path$split2[3];

            var self = this.props.userid === Number(id);
            selectedTab = selectedTab ? selectedTab : 'history';
            var user = this.props.data.user;
            var history = this.props.data.history;
            var tabs = ['history'];

            var empty = _react2.default.createElement(
                'div',
                { className: 'callout warning' },
                'There is no activity to show.'
            );
            var nomore = _react2.default.createElement(
                'div',
                { className: 'callout warning' },
                'No more entries to show.'
            );
            return _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(_reactHelmet2.default, {
                    title: user.name,
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
                        { className: 'small-12 columns' },
                        _react2.default.createElement(
                            'h1',
                            null,
                            user.name
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'row margin-bottom' },
                            _react2.default.createElement(
                                'div',
                                { className: 'small-12 large-9 columns' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'row' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'small-4 columns' },
                                        'User No:'
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'small-8 columns' },
                                        user.id
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'row' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'small-4 columns' },
                                        'Joined:'
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'small-8 columns' },
                                        _react2.default.createElement(_Time2.default, {
                                            timestamp: user.joined,
                                            type: 'ago'
                                        })
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'row' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'small-4 columns' },
                                        'Level:'
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'small-8 columns' },
                                        user.level
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'row' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'small-4 columns' },
                                        'About:'
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'small-8 columns' },
                                        _react2.default.createElement(_Markdown2.default, { markdown: user.about })
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'row' },
                            _react2.default.createElement(
                                'div',
                                { className: 'small-12 large-9 columns' },
                                self ? _react2.default.createElement(
                                    'div',
                                    null,
                                    _react2.default.createElement(
                                        'div',
                                        {
                                            className: 'button-group',
                                            role: 'group'
                                        },
                                        _react2.default.createElement(
                                            'a',
                                            {
                                                className: selectedTab === 'history' ? 'button' : 'button secondary',
                                                rel: 'nofollow',
                                                href: '/users/' + id + '/' + name,
                                                'aria-selected': selectedTab === 'history'
                                            },
                                            'Activity'
                                        ),
                                        _react2.default.createElement(
                                            'a',
                                            {
                                                className: selectedTab === 'profile' ? 'button' : 'button secondary',
                                                rel: 'nofollow',
                                                href: '/users/' + id + '/' + name + '/profile',
                                                'aria-selected': selectedTab === 'profile'
                                            },
                                            'Edit Profile'
                                        )
                                    )
                                ) : _react2.default.createElement(
                                    'div',
                                    null,
                                    _react2.default.createElement(
                                        'h2',
                                        null,
                                        'Activity'
                                    ),
                                    _react2.default.createElement('hr', null)
                                )
                            )
                        ),
                        self && selectedTab === 'profile' ? _react2.default.createElement(
                            'div',
                            { className: 'card-container' },
                            _react2.default.createElement(_Profile2.default, { id: id })
                        ) : null,
                        selectedTab === 'history' ? _react2.default.createElement(
                            'div',
                            { className: 'row' },
                            _react2.default.createElement(
                                'div',
                                { className: 'small-12 large-9 columns' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'row' },
                                    history.map(function (x, i) {
                                        return _react2.default.createElement(_HistoryItem2.default, {
                                            key: i,
                                            user: user.id,
                                            username: user.name,
                                            obj_id: x.obj_id,
                                            entry: x.entry,
                                            entrytype: x.entrytype,
                                            timestamp: x.timestamp,
                                            deleted: x.deleted
                                        });
                                    })
                                ),
                                !this.props.query.page && history.length === 0 ? empty : null,
                                this.props.query.page && history.length === 0 ? nomore : null,
                                _react2.default.createElement(_Pagination2.default, {
                                    path: this.props.path,
                                    page: this.props.query.page,
                                    count: history.length
                                })
                            )
                        ) : null
                    )
                )
            );
        }
    }], [{
        key: 'resources',
        value: function resources(appstate) {
            var _appstate$path$split = appstate.path.split('/'),
                _appstate$path$split2 = _slicedToArray(_appstate$path$split, 4),
                dummy = _appstate$path$split2[0],
                id = _appstate$path$split2[1],
                name = _appstate$path$split2[2],
                tab = _appstate$path$split2[3];

            var page = appstate.query.page;
            var query = page ? '?page=' + page : '';
            var api = [{
                name: 'user',
                path: '/api/v1/user/' + id + '?slug=' + name
            }];
            api.push({
                name: 'history',
                path: '/api/v1/userhistory/' + id + query
            });
            return {
                api: api
            };
        }
    }]);

    return ProfilePage;
}(_react2.default.Component);

exports.default = ProfilePage;