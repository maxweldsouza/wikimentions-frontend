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

var _Comment = require('./Comment');

var _Comment2 = _interopRequireDefault(_Comment);

var _DiscussReply = require('./DiscussReply');

var _DiscussReply2 = _interopRequireDefault(_DiscussReply);

var _PageBar = require('./PageBar');

var _PageBar2 = _interopRequireDefault(_PageBar);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _Pagination = require('./Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DiscussPage = function (_React$Component) {
    _inherits(DiscussPage, _React$Component);

    function DiscussPage() {
        _classCallCheck(this, DiscussPage);

        return _possibleConstructorReturn(this, (DiscussPage.__proto__ || Object.getPrototypeOf(DiscussPage)).apply(this, arguments));
    }

    _createClass(DiscussPage, [{
        key: 'render',
        value: function render() {
            var parts = this.props.path.split('/');
            var id = Number(parts[1]);
            var slug = parts[2];
            var type = this.props.data.discuss.props.type;
            var discussions = this.props.data.discuss.discussion;
            var nodata = void 0;
            var pagination = _react2.default.createElement(_Pagination2.default, {
                path: this.props.path,
                page: this.props.query.page,
                count: discussions.length
            });
            if (discussions.length === 0) {
                if (this.props.query.page) {
                    nodata = _react2.default.createElement(
                        'div',
                        { className: 'small-12 columns' },
                        _react2.default.createElement(
                            'div',
                            { className: 'blankslate' },
                            _react2.default.createElement('span', { className: 'icon ion-android-chat' }),
                            _react2.default.createElement(
                                'h3',
                                null,
                                'No more posts'
                            ),
                            'You have reached the end of discussions.'
                        )
                    );
                } else {
                    nodata = _react2.default.createElement(
                        'div',
                        { className: 'small-12 columns' },
                        _react2.default.createElement(
                            'div',
                            { className: 'blankslate' },
                            _react2.default.createElement('span', { className: 'icon ion-android-chat' }),
                            _react2.default.createElement(
                                'h3',
                                null,
                                'Discussion Empty'
                            ),
                            'There are no posts for this page.'
                        )
                    );
                    pagination = null;
                }
            }
            return _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(_reactHelmet2.default, {
                    title: 'Discussion - ' + this.props.data.discuss.props.title,
                    titleTemplate: '%s - ' + _config2.default.name,
                    meta: [{ name: 'description', content: '' }, { name: 'robots', content: 'noindex' }],
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
                            'Discussion - ' + this.props.data.discuss.props.title
                        ),
                        _react2.default.createElement(_PageBar2.default, { id: id, slug: slug, type: type }),
                        _react2.default.createElement('hr', null),
                        _react2.default.createElement(
                            'div',
                            { className: 'row' },
                            discussions.map(function (x) {
                                return _react2.default.createElement(_Comment2.default, {
                                    id: x.id,
                                    key: x.id,
                                    user: x.user,
                                    name: x.username,
                                    text: x.content,
                                    posted: x.created
                                });
                            }),
                            nodata,
                            _react2.default.createElement(
                                'div',
                                { className: 'small-12 columns' },
                                pagination
                            ),
                            _react2.default.createElement(_DiscussReply2.default, {
                                id: id,
                                loggedin: this.props.loggedin
                            })
                        )
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

            var queryObj = {};
            if (appstate.query.page) {
                queryObj.page = appstate.query.page;
            }
            queryObj.slug = slug;
            var query = _queryString2.default.stringify(queryObj);
            query = query ? '?' + query : '';
            return {
                api: [{
                    name: 'discuss',
                    path: '/api/v1/discuss/' + id + query
                }]
            };
        }
    }]);

    return DiscussPage;
}(_react2.default.Component);

exports.default = DiscussPage;