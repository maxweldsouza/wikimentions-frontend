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

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _ThingMentionTab = require('./ThingMentionTab');

var _ThingMentionTab2 = _interopRequireDefault(_ThingMentionTab);

var _ThingMentionedByTab = require('./ThingMentionedByTab');

var _ThingMentionedByTab2 = _interopRequireDefault(_ThingMentionedByTab);

var _ThingBookTab = require('./ThingBookTab');

var _ThingBookTab2 = _interopRequireDefault(_ThingBookTab);

var _ThingVideoTab = require('./ThingVideoTab');

var _ThingVideoTab2 = _interopRequireDefault(_ThingVideoTab);

var _Authors = require('./Authors');

var _Authors2 = _interopRequireDefault(_Authors);

var _VideoEmbed = require('./VideoEmbed');

var _VideoEmbed2 = _interopRequireDefault(_VideoEmbed);

var _PageBar = require('./PageBar');

var _PageBar2 = _interopRequireDefault(_PageBar);

var _Share = require('./Share');

var _Share2 = _interopRequireDefault(_Share);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _Link = require('./Link');

var _Link2 = _interopRequireDefault(_Link);

var _urlParse = require('url-parse');

var _urlParse2 = _interopRequireDefault(_urlParse);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _reactAutobind = require('react-autobind');

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VideoPage = function (_React$Component) {
    _inherits(VideoPage, _React$Component);

    _createClass(VideoPage, null, [{
        key: 'resources',
        value: function resources(appstate) {
            var _appstate$path$split = appstate.path.split('/'),
                _appstate$path$split2 = _slicedToArray(_appstate$path$split, 4),
                type = _appstate$path$split2[0],
                id = _appstate$path$split2[1],
                slug = _appstate$path$split2[2],
                tab = _appstate$path$split2[3];

            var page = appstate.query.page;
            var query = page ? '?page=' + page : '';
            var api = [{
                name: 'thing',
                path: '/api/v1/thing/' + id + '?slug=' + slug
            }, {
                name: 'videoauthors',
                path: '/api/v1/thing/' + id + '/videosby'
            }];
            var defaultTab = void 0;

            if (type === 'people') {
                defaultTab = 'videos';
            } else {
                defaultTab = 'mentioned';
            }

            tab = tab ? tab : defaultTab;

            if (tab === 'mentioned') {
                api.push({
                    name: 'mentions',
                    path: '/api/v1/mentions/' + id + query
                });
            }
            if (tab === 'mentionedby') {
                api.push({
                    name: 'mentionedby',
                    path: '/api/v1/mentionedby/' + id + query
                });
            }
            return {
                api: api
            };
        }
    }]);

    function VideoPage(props) {
        _classCallCheck(this, VideoPage);

        var _this = _possibleConstructorReturn(this, (VideoPage.__proto__ || Object.getPrototypeOf(VideoPage)).call(this, props));

        (0, _reactAutobind2.default)(_this);
        _this.state = {
            embeddable: false,
            videoImage: ''
        };
        return _this;
    }

    _createClass(VideoPage, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            if (_utils2.default.isYoutubeUrl(this.props.data.thing.props.url)) {
                this.setState({
                    videoImage: _utils2.default.youtubeThumb(this.props.data.thing.props.url)
                });
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var parsed = (0, _urlParse2.default)(this.props.data.thing.props.url);
            if (_utils2.default.isYoutubeUrl(this.props.data.thing.props.url)) {
                var queryObject = _queryString2.default.parse(parsed.query);
                _superagent2.default.get('https://www.googleapis.com/youtube/v3/videos?part=status,snippet&fields=items(snippet/thumbnails/high,status(embeddable,privacyStatus,uploadStatus))&id=' + queryObject.v + '&key=' + _config2.default.keys.youtube).end(function (err, res) {
                    if (err) {
                        return;
                    }
                    try {
                        if (res.body.items[0].status.embeddable && res.body.items[0].status.privacyStatus === 'public' && res.body.items[0].status.uploadStatus === 'processed') {
                            _this2.setState({
                                embeddable: true
                            });
                            _this2.setState({
                                videoImage: res.body.items[0].snippet.thumbnails.high.url
                            });
                        }
                    } catch (e) {
                        return;
                    }
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props$path$split = this.props.path.split('/'),
                _props$path$split2 = _slicedToArray(_props$path$split, 4),
                type = _props$path$split2[0],
                id = _props$path$split2[1],
                slug = _props$path$split2[2],
                tab = _props$path$split2[3];

            var thing = this.props.data.thing;
            id = Number(thing.id);
            var defaultTab = 'mentioned';

            tab = tab ? tab : defaultTab;

            var authors = this.props.data.videoauthors;
            authors = _react2.default.createElement(_Authors2.default, { authors: authors, id: id, type: 'video' });
            var mentions = this.props.data.mentions;
            var mentionedby = this.props.data.mentionedby;
            var tabs = [];
            tabs = tabs.concat(['mentioned', 'mentionedby']);
            var tabTitles = {
                mentioned: 'Mentioned',
                mentionedby: 'Mentioned By'
            };
            var tabCounts = {
                mentioned: 'mentioned_count',
                mentionedby: 'mentioned_by_count',
                books: 'book_count',
                videos: 'video_count'
            };
            var tabTooltips = {
                mentioned: 'People, books or videos mentioned in ' + thing.props.title,
                mentionedby: 'People who have mentioned ' + thing.props.title
            };
            var tabHeading = _react2.default.createElement(
                'ul',
                { className: 'tabs', role: 'tablist' },
                tabs.map(function (x) {
                    var cls = void 0;
                    var aria = void 0;
                    if (x === tab) {
                        return _react2.default.createElement(
                            'li',
                            {
                                className: 'tabs-title is-active',
                                key: x,
                                title: tabTooltips[x],
                                role: 'tab'
                            },
                            _react2.default.createElement(
                                _Link2.default,
                                {
                                    id: thing.id,
                                    slug: thing.props.slug,
                                    type: thing.props.type,
                                    tab: x
                                },
                                tabTitles[x],
                                ' ',
                                _react2.default.createElement(
                                    'span',
                                    { className: 'badge' },
                                    thing[tabCounts[x]]
                                )
                            )
                        );
                    }
                    return _react2.default.createElement(
                        'li',
                        {
                            className: 'tabs-title',
                            key: x,
                            title: tabTooltips[x]
                        },
                        _react2.default.createElement(
                            _Link2.default,
                            {
                                id: thing.id,
                                slug: thing.props.slug,
                                type: thing.props.type,
                                tab: x
                            },
                            tabTitles[x],
                            ' ',
                            _react2.default.createElement(
                                'span',
                                { className: 'badge' },
                                thing[tabCounts[x]]
                            )
                        )
                    );
                })
            );
            var metaRobots = { name: 'robots', content: 'index' };
            if (thing.mentioned_count === 0 && thing.mentioned_by_count === 0) {
                metaRobots = { name: 'robots', content: 'noindex' };
            }
            if (tab === 'mentionedby' && thing.mentioned_by_count === 0) {
                metaRobots = { name: 'robots', content: 'noindex' };
            }
            var tabContent = void 0;
            var pageTitle = void 0;
            var pageDescription = void 0;
            if (tab === 'mentioned') {
                tabContent = _react2.default.createElement(_ThingMentionTab2.default, {
                    loggedin: this.props.loggedin,
                    mentions: mentions,
                    id: id,
                    path: this.props.path,
                    page: this.props.query.page,
                    count: thing.mentioned_count,
                    type: thing.props.type
                });
                pageTitle = 'Mentioned - ' + thing.props.title;
                pageDescription = 'People, books or videos mentioned in ' + thing.props.title;
            } else if (tab === 'mentionedby') {
                tabContent = _react2.default.createElement(_ThingMentionedByTab2.default, {
                    loggedin: this.props.loggedin,
                    id: id,
                    mentionedby: mentionedby,
                    path: this.props.path,
                    page: this.props.query.page,
                    count: thing.mentioned_by_count,
                    type: thing.props.type
                });
                pageTitle = 'Mentioned by - ' + thing.props.title;
                pageDescription = 'People who have mentioned ' + thing.props.title;
            }
            return _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(_reactHelmet2.default, {
                    title: pageTitle,
                    titleTemplate: '%s - ' + _config2.default.name,
                    meta: [{ name: 'description', content: pageDescription }, { name: 'twitter:card', content: 'summary' }, { name: 'twitter:site', content: _config2.default.twitter }, { name: 'twitter:title', content: pageTitle }, {
                        name: 'twitter:description',
                        content: pageDescription
                    }, {
                        name: 'twitter:image',
                        content: this.state.videoImage
                    }, { property: 'og:title', content: pageTitle }, { property: 'og:type', content: 'article' }, {
                        property: 'og:url',
                        content: _config2.default.url + this.props.path
                    }, { property: 'og:description', content: '' }, {
                        property: 'og:image',
                        content: this.state.videoImage
                    }, { property: 'og:site_name', content: _config2.default.name }],
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
                    { className: 'row page-body align-center' },
                    _react2.default.createElement(
                        'div',
                        { className: 'small-12 columns' },
                        _react2.default.createElement(
                            'div',
                            { className: 'row align-center' },
                            _react2.default.createElement(
                                'div',
                                { className: 'small-12 large-8 columns' },
                                _react2.default.createElement(
                                    'div',
                                    null,
                                    _react2.default.createElement(_VideoEmbed2.default, {
                                        url: this.props.data.thing.props.url,
                                        embeddable: this.state.embeddable
                                    })
                                ),
                                _react2.default.createElement(
                                    'h1',
                                    null,
                                    _react2.default.createElement(
                                        'a',
                                        {
                                            href: this.props.data.thing.props.url,
                                            target: '_blank'
                                        },
                                        thing.props.title,
                                        ' ',
                                        _react2.default.createElement(
                                            'sup',
                                            null,
                                            _react2.default.createElement('span', {
                                                className: 'ion-android-open'
                                            })
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'span',
                                    { className: 'thing-description' },
                                    thing.description,
                                    authors
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'row' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'small-6 columns' },
                                        _react2.default.createElement(_PageBar2.default, {
                                            id: id,
                                            slug: thing.props.slug,
                                            type: 'video',
                                            noPage: true
                                        })
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'small-6 columns text-right' },
                                        _react2.default.createElement(_Share2.default, {
                                            title: thing.props.title,
                                            path: this.props.path
                                        })
                                    )
                                ),
                                tabHeading,
                                _react2.default.createElement(
                                    'div',
                                    { className: 'tabs-content' },
                                    _react2.default.createElement(
                                        'div',
                                        {
                                            className: 'tabs-panel is-active',
                                            'aria-hidden': 'false'
                                        },
                                        tabContent
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return VideoPage;
}(_react2.default.Component);

exports.default = VideoPage;