'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

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

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

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

var _Thumbnail = require('./Thumbnail');

var _Thumbnail2 = _interopRequireDefault(_Thumbnail);

var _PageBar = require('./PageBar');

var _PageBar2 = _interopRequireDefault(_PageBar);

var _reactAutobind = require('react-autobind');

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var QuotesPage = function (_React$Component) {
    _inherits(QuotesPage, _React$Component);

    _createClass(QuotesPage, null, [{
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
                    name: 'thing',
                    path: '/api/v1/thing/' + id
                }, {
                    name: 'quotes',
                    path: '/api/v1/quotes/' + id + query
                }]
            };
        }
    }]);

    function QuotesPage(props) {
        _classCallCheck(this, QuotesPage);

        var _this = _possibleConstructorReturn(this, (QuotesPage.__proto__ || Object.getPrototypeOf(QuotesPage)).call(this, props));

        (0, _reactAutobind2.default)(_this);
        _this.state = {
            quote: '',
            submitting: false
        };
        return _this;
    }

    _createClass(QuotesPage, [{
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
        key: 'validateForm',
        value: function validateForm() {
            var valid = true;
            return valid;
        }
    }, {
        key: 'onSubmit',
        value: function onSubmit(e) {
            var _this2 = this;

            e.preventDefault();
            var id = Number(this.props.path.split('/')[1]);
            if (this.validateForm()) {
                this.setState({
                    submitting: true
                });
                _superagent2.default.post('/api/v1/quotes/' + id).type('form').send({
                    quote: this.state.quote,
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
                            formMessage: '',
                            quote: ''
                        });
                        (0, _snackbar2.default)({ message: 'Quote added' });
                        history.pushState(null, null, window.location.pathname + window.location.search);
                        Mentions.route(window.location.pathname + window.location.search);
                    }
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var quotes = this.props.data.quotes.items;
            var total = this.props.data.quotes.total;
            var metaRobots = void 0;
            if (total === 0) {
                metaRobots = { name: 'robots', content: 'noindex' };
            } else {
                metaRobots = { name: 'robots', content: 'index' };
            }
            return _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(_reactHelmet2.default, {
                    title: 'Quotes - ' + this.props.data.thing.props.title,
                    titleTemplate: '%s - ' + _config2.default.name,
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
                                    'h1',
                                    null,
                                    this.props.data.thing.props.title,
                                    ' - Quotes'
                                ),
                                _react2.default.createElement(_PageBar2.default, {
                                    id: this.props.data.thing.id,
                                    slug: this.props.data.thing.props.slug,
                                    type: this.props.data.thing.props.type
                                }),
                                _react2.default.createElement('hr', null),
                                quotes.length > 0 ? _react2.default.createElement(
                                    'div',
                                    { className: 'row' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'shrink columns' },
                                        _react2.default.createElement(_Thumbnail2.default, {
                                            alt: this.props.data.thing.props.title,
                                            type: this.props.data.thing.props.type,
                                            image: this.props.data.thing.image,
                                            url: this.props.data.thing.props.url,
                                            displayWidth: 75
                                        })
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'columns' },
                                        _react2.default.createElement(
                                            'blockquote',
                                            { className: 'quote' },
                                            _underscore2.default.first(quotes).quote
                                        )
                                    )
                                ) : _react2.default.createElement(
                                    'div',
                                    { className: 'blankslate' },
                                    _react2.default.createElement('span', { className: 'icon ion-quote' }),
                                    _react2.default.createElement(
                                        'h3',
                                        null,
                                        'No quotes added'
                                    ),
                                    'There are no quotes added for',
                                    ' ',
                                    this.props.data.thing.props.title,
                                    '. You could help us by adding some of your favorite quotes.'
                                ),
                                _react2.default.createElement('hr', null),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'row' },
                                    _underscore2.default.rest(quotes).map(function (x) {
                                        return _react2.default.createElement(
                                            'div',
                                            { className: 'small-12 columns' },
                                            _react2.default.createElement(
                                                'blockquote',
                                                { className: 'quote' },
                                                x.quote
                                            ),
                                            _react2.default.createElement('hr', null)
                                        );
                                    })
                                ),
                                _react2.default.createElement(_Pagination2.default, {
                                    path: this.props.path,
                                    page: this.props.query.page,
                                    count: quotes.length,
                                    total: total
                                }),
                                _react2.default.createElement(
                                    'h2',
                                    null,
                                    'Add Quote'
                                ),
                                _react2.default.createElement(
                                    'form',
                                    { onSubmit: this.onSubmit },
                                    _react2.default.createElement('textarea', {
                                        type: 'text',
                                        name: 'quote',
                                        onChange: this.onChangeText,
                                        value: this.state.quote,
                                        rows: 3
                                    }),
                                    this.state.quote.length > 0 ? 140 - this.state.quote.length : null,
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
            );
        }
    }]);

    return QuotesPage;
}(_react2.default.Component);

exports.default = QuotesPage;