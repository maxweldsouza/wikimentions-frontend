'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Book = require('./Book');

var _Book2 = _interopRequireDefault(_Book);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _browserCookies = require('browser-cookies');

var _browserCookies2 = _interopRequireDefault(_browserCookies);

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _Navbar = require('./Navbar');

var _Navbar2 = _interopRequireDefault(_Navbar);

var _Pagination = require('./Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

var _Person = require('./Person');

var _Person2 = _interopRequireDefault(_Person);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _snackbar = require('./snackbar');

var _snackbar2 = _interopRequireDefault(_snackbar);

var _SubmitButton = require('./SubmitButton');

var _SubmitButton2 = _interopRequireDefault(_SubmitButton);

var _Video = require('./Video');

var _Video2 = _interopRequireDefault(_Video);

var _reactAutobind = require('react-autobind');

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListPage = function (_React$Component) {
    _inherits(ListPage, _React$Component);

    _createClass(ListPage, null, [{
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
                    name: 'list',
                    path: '/api/v1/lists/' + id
                }, {
                    name: 'items',
                    path: '/api/v1/lists/items/' + id + query
                }]
            };
        }
    }]);

    function ListPage(props) {
        _classCallCheck(this, ListPage);

        var _this = _possibleConstructorReturn(this, (ListPage.__proto__ || Object.getPrototypeOf(ListPage)).call(this, props));

        (0, _reactAutobind2.default)(_this);
        _this.state = {
            id: null,
            submitting: false,
            formMessage: '',
            valid: true,
            message: ''
        };
        return _this;
    }

    _createClass(ListPage, [{
        key: 'onSelect',
        value: function onSelect(x) {
            this.setState({
                id: x.id
            });
        }
    }, {
        key: 'onSubmit',
        value: function onSubmit(e) {
            var _this2 = this;

            var _props$path$split = this.props.path.split('/'),
                _props$path$split2 = _slicedToArray(_props$path$split, 3),
                type = _props$path$split2[0],
                id = _props$path$split2[1],
                slug = _props$path$split2[2];

            e.preventDefault();
            this.setState({
                submitting: true
            });
            _superagent2.default.post('/api/v1/lists/items/' + id).type('form').send({
                obj_id: this.state.id,
                _xsrf: _browserCookies2.default.get('_xsrf')
            }).end(function (err, res) {
                _this2.setState({
                    submitting: false
                });
                if (err && err.status) {
                    _this2.setState({
                        formMessage: res.body.message
                    });
                } else {
                    _this2.setState({
                        formMessage: ''
                    });
                    (0, _snackbar2.default)({ message: 'Added item' });
                    history.pushState(null, null, window.location.pathname + window.location.search);
                    Mentions.route(window.location.pathname + window.location.search);
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var list = this.props.data.items.items;
            var title = this.props.data.list.title;
            var description = this.props.data.list.description;
            var total = this.props.data.items.total;

            var page = this.props.query.page ? this.props.query.page : 1;
            var start = (page - 1) * list.length + 1;
            var end = page * list.length;
            var metaRobots = void 0;
            if (total === 0) {
                metaRobots = { name: 'robots', content: 'noindex' };
            } else {
                metaRobots = { name: 'robots', content: 'index' };
            }
            return _react2.default.createElement(
                'div',
                { className: 'flex-wrapper' },
                _react2.default.createElement(_reactHelmet2.default, {
                    title: title,
                    titleTemplate: '%s - ' + _config2.default.name + ' - Lists',
                    meta: [metaRobots],
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
                            'div',
                            { className: 'row' },
                            _react2.default.createElement(
                                'div',
                                { className: 'small-12 columns' },
                                _react2.default.createElement(
                                    'div',
                                    { className: '' },
                                    _react2.default.createElement(
                                        'h1',
                                        null,
                                        'List - ',
                                        title
                                    ),
                                    description,
                                    _react2.default.createElement('hr', { className: 'no-margin-bottom' }),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'margin-bottom' },
                                        list.map(function (x) {
                                            if (x.props.type === 'video') {
                                                return _react2.default.createElement(_Video2.default, {
                                                    key: x.id,
                                                    id: x.id,
                                                    type: x.props.type,
                                                    slug: x.props.slug,
                                                    title: x.props.title,
                                                    mentioned_count: x.mentioned_count,
                                                    mentioned_by_count: x.mentioned_by_count,
                                                    image: x.image,
                                                    url: x.props.url
                                                });
                                            } else if (x.props.type === 'book') {
                                                return _react2.default.createElement(_Book2.default, {
                                                    key: x.id,
                                                    id: x.id,
                                                    image: x.image,
                                                    type: x.props.type,
                                                    slug: x.props.slug,
                                                    title: x.props.title,
                                                    description: x.props.description,
                                                    mentioned_count: x.mentioned_count,
                                                    mentioned_by_count: x.mentioned_by_count,
                                                    isbn: x.isbn,
                                                    isbn13: x.isbn13
                                                });
                                            }
                                            return _react2.default.createElement(_Person2.default, {
                                                key: x.id,
                                                id: x.id,
                                                image: x.image,
                                                type: x.props.type,
                                                slug: x.props.slug,
                                                title: x.props.title,
                                                description: x.props.description,
                                                book_count: x.book_count,
                                                video_count: x.video_count,
                                                mentioned_count: x.mentioned_count,
                                                mentioned_by_count: x.mentioned_by_count,
                                                isbn: x.isbn,
                                                isbn13: x.isbn13
                                            });
                                        }),
                                        list.length === 0 ? _react2.default.createElement(
                                            'div',
                                            null,
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'blankslate' },
                                                _react2.default.createElement('span', {
                                                    className: 'icon ion-android-list'
                                                }),
                                                _react2.default.createElement(
                                                    'h3',
                                                    null,
                                                    'List is Empty'
                                                ),
                                                'No items have been added to this list. You can begin adding items below.'
                                            ),
                                            _react2.default.createElement('hr', null)
                                        ) : null
                                    ),
                                    _react2.default.createElement(_Pagination2.default, {
                                        path: this.props.path,
                                        page: this.props.query.page,
                                        count: list.length,
                                        total: total
                                    }),
                                    list.length > 0 ? _react2.default.createElement(
                                        'div',
                                        { className: 'text-right' },
                                        'Showing results',
                                        ' ',
                                        start,
                                        ' ',
                                        'to',
                                        ' ',
                                        end,
                                        ' ',
                                        'of',
                                        ' ',
                                        total
                                    ) : null,
                                    _react2.default.createElement(
                                        'h2',
                                        null,
                                        'Add to list'
                                    ),
                                    _react2.default.createElement(
                                        'form',
                                        { onSubmit: this.onSubmit },
                                        this.state.formMessage ? _react2.default.createElement(
                                            'div',
                                            { className: 'callout alert' },
                                            this.state.formMessage
                                        ) : null,
                                        _react2.default.createElement(_Select2.default, {
                                            name: 'id',
                                            placeholder: 'Search',
                                            onSelectValue: this.onSelect,
                                            valid: this.state.valid,
                                            message: this.state.message
                                        }),
                                        _react2.default.createElement(_SubmitButton2.default, {
                                            title: 'Add',
                                            className: 'button primary float-right',
                                            submitting: this.state.submitting
                                        })
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return ListPage;
}(_react2.default.Component);

exports.default = ListPage;