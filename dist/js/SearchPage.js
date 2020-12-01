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

var _Comment = require('./Comment');

var _Comment2 = _interopRequireDefault(_Comment);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _DiscussReply = require('./DiscussReply');

var _DiscussReply2 = _interopRequireDefault(_DiscussReply);

var _PageBar = require('./PageBar');

var _PageBar2 = _interopRequireDefault(_PageBar);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _HomeItem = require('./HomeItem');

var _HomeItem2 = _interopRequireDefault(_HomeItem);

var _Pagination = require('./Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

var _ButtonSelect = require('./ButtonSelect');

var _ButtonSelect2 = _interopRequireDefault(_ButtonSelect);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _reactAutobind = require('react-autobind');

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchPage = function (_React$Component) {
    _inherits(SearchPage, _React$Component);

    _createClass(SearchPage, null, [{
        key: 'resources',
        value: function resources(appstate) {
            return {
                api: []
            };
        }
    }]);

    function SearchPage(props) {
        _classCallCheck(this, SearchPage);

        var _this = _possibleConstructorReturn(this, (SearchPage.__proto__ || Object.getPrototypeOf(SearchPage)).call(this, props));

        (0, _reactAutobind2.default)(_this);
        _this.state = {
            searchText: _this.props.query.q,
            results: [],
            numFound: 0
        };
        return _this;
    }

    _createClass(SearchPage, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var type = this.props.query.type ? this.props.query.type : 'any';
            this.loadData(this.state.searchText, 1, type);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState({
                searchText: nextProps.query.q
            });
            this.loadData(nextProps.query.q, nextProps.query.page, nextProps.query.type);
        }
    }, {
        key: 'onSearchTextChanged',
        value: function onSearchTextChanged(e) {
            this.setState({
                searchText: e.target.value
            });
        }
    }, {
        key: 'loadData',
        value: function loadData(x, page, type) {
            var _this2 = this;

            var query = {};
            query.page = page ? page : 1;
            if (type !== 'any') {
                query.types = [type];
            }
            _superagent2.default.get('/api/v1/search/' + encodeURIComponent(x) + '?' + _queryString2.default.stringify(query)).end(function (err, res) {
                if (err) {
                    snackbar({ message: 'Search failed' });
                } else {
                    _this2.setState({
                        results: res.body.results,
                        numFound: res.body.numFound
                    });
                }
            });
        }
    }, {
        key: 'onSearchClicked',
        value: function onSearchClicked() {
            var type = this.props.query.type ? this.props.query.type : 'any';
            this.newSearch(type);
        }
    }, {
        key: 'newSearch',
        value: function newSearch(type) {
            var typeQuery = type !== 'any' ? '&type=' + type : '';
            var path = '/search?q=' + this.state.searchText + typeQuery;
            history.pushState(null, null, path);
            Mentions.route(path);
        }
    }, {
        key: 'handleKeys',
        value: function handleKeys(event) {
            var type = this.props.query.type ? this.props.query.type : 'any';
            if (event.key === 'Enter') {
                this.newSearch(type);
            }
        }
    }, {
        key: 'onChangeType',
        value: function onChangeType(type) {
            this.newSearch(type);
        }
    }, {
        key: 'render',
        value: function render() {
            var page = this.props.query.page ? this.props.query.page : 1;
            var options = [{ name: 'Any', value: 'any' }, { name: 'Person', value: 'person' }, { name: 'Book', value: 'book' }, { name: 'Video', value: 'video' }];
            var start = (page - 1) * this.state.results.length + 1;
            var end = page * this.state.results.length;
            var type = this.props.query.type ? this.props.query.type : 'any';
            return _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(_reactHelmet2.default, {
                    title: 'Search',
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
                            'Search'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'input-group' },
                            _react2.default.createElement('input', {
                                type: 'text',
                                placeholder: 'Search',
                                value: this.state.searchText,
                                onChange: this.onSearchTextChanged,
                                onKeyDown: this.handleKeys
                            }),
                            _react2.default.createElement(
                                'button',
                                {
                                    className: 'button primary',
                                    onClick: this.onSearchClicked,
                                    style: {
                                        borderTopLeftRadius: 0,
                                        borderBottomLeftRadius: 0
                                    }
                                },
                                _react2.default.createElement('span', { className: 'ion-android-search' })
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'row' },
                            _react2.default.createElement(
                                'div',
                                { className: 'small-12 medium-6 columns' },
                                _react2.default.createElement(_ButtonSelect2.default, {
                                    name: 'type',
                                    options: options,
                                    'default': type,
                                    onChange: this.onChangeType
                                })
                            ),
                            this.state.results.length > 0 ? _react2.default.createElement(
                                'div',
                                {
                                    className: 'small-12 medium-6 columns text-right'
                                },
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
                                this.state.numFound
                            ) : null
                        ),
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'div',
                                { className: 'card-container' },
                                this.state.results.length === 0 ? _react2.default.createElement(
                                    'div',
                                    { className: 'card box' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'small-12 columns' },
                                        'No results found.'
                                    )
                                ) : null,
                                this.state.results.map(function (x) {
                                    return _react2.default.createElement(_HomeItem2.default, {
                                        key: x.id,
                                        id: x.id,
                                        title: x.props.title,
                                        image: x.image,
                                        description: x.props.description,
                                        type: x.props.type,
                                        slug: x.props.slug,
                                        url: x.props.url,
                                        book_count: x.book_count,
                                        video_count: x.video_count,
                                        mentioned_count: x.mentioned_count,
                                        mentioned_by_count: x.mentioned_by_count
                                    });
                                }),
                                _react2.default.createElement(_Pagination2.default, {
                                    total: this.state.numFound,
                                    path: this.props.path,
                                    page: this.props.query.page,
                                    query: this.props.query
                                })
                            )
                        )
                    )
                )
            );
        }
    }]);

    return SearchPage;
}(_react2.default.Component);

exports.default = SearchPage;