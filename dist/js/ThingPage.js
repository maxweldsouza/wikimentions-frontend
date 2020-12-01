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

var _PageBar = require('./PageBar');

var _PageBar2 = _interopRequireDefault(_PageBar);

var _Share = require('./Share');

var _Share2 = _interopRequireDefault(_Share);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _Link = require('./Link');

var _Link2 = _interopRequireDefault(_Link);

var _Thumbnail = require('./Thumbnail');

var _Thumbnail2 = _interopRequireDefault(_Thumbnail);

var _Modal = require('./Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _Markdown = require('./Markdown');

var _Markdown2 = _interopRequireDefault(_Markdown);

var _Affiliate = require('./Affiliate');

var _Affiliate2 = _interopRequireDefault(_Affiliate);

var _Time = require('./Time');

var _Time2 = _interopRequireDefault(_Time);

var _CopyButton = require('./CopyButton');

var _CopyButton2 = _interopRequireDefault(_CopyButton);

var _EditTags = require('./EditTags');

var _EditTags2 = _interopRequireDefault(_EditTags);

var _reactAutobind = require('react-autobind');

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ThingPage = function (_React$Component) {
    _inherits(ThingPage, _React$Component);

    _createClass(ThingPage, null, [{
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
            }];
            var defaultTab = void 0;

            if (type === 'people') {
                defaultTab = 'videos';
            } else {
                defaultTab = 'mentioned';
            }

            tab = tab ? tab : defaultTab;

            if (type === 'videos') {
                api.push({
                    name: 'videoauthors',
                    path: '/api/v1/thing/' + id + '/videosby'
                });
            } else if (type === 'books') {
                api.push({
                    name: 'bookauthors',
                    path: '/api/v1/thing/' + id + '/booksby'
                });
            }

            if (tab === 'videos') {
                api.push({
                    name: 'videos',
                    path: '/api/v1/thing/' + id + '/videos' + query
                });
            }
            if (tab === 'books') {
                api.push({
                    name: 'books',
                    path: '/api/v1/thing/' + id + '/books' + query
                });
            }
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

    function ThingPage(props) {
        _classCallCheck(this, ThingPage);

        var _this = _possibleConstructorReturn(this, (ThingPage.__proto__ || Object.getPrototypeOf(ThingPage)).call(this, props));

        (0, _reactAutobind2.default)(_this);
        _this.state = {
            modalIsOpen: false
        };
        return _this;
    }

    _createClass(ThingPage, [{
        key: 'onOpenModal',
        value: function onOpenModal(e) {
            if (this.props.data.thing.image) {
                this.setState({
                    modalIsOpen: true
                });
            }
            e.preventDefault();
        }
    }, {
        key: 'onCloseModal',
        value: function onCloseModal() {
            this.setState({ modalIsOpen: false });
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
            var defaultTab = void 0;

            if (type === 'people') {
                defaultTab = 'videos';
            } else {
                defaultTab = 'mentioned';
            }
            tab = tab ? tab : defaultTab;

            var authors = [];
            if (thing.props.type === 'book' && this.props.data.bookauthors.length > 0) {
                authors = this.props.data.bookauthors;
            } else if (thing.props.type === 'video' && this.props.data.videoauthors.length > 0) {
                authors = this.props.data.videoauthors;
            }
            if (thing.props.type === 'book' || thing.props.type === 'video') {
                authors = _react2.default.createElement(_Authors2.default, { authors: authors, id: id, type: thing.props.type });
            }
            var mentions = this.props.data.mentions;
            var mentionedby = this.props.data.mentionedby;
            var tabs = [];
            var books = void 0;
            var videos = void 0;
            if (thing.props.type === 'person') {
                tabs.push('videos');
                tabs.push('books');
                books = this.props.data.books;
                videos = this.props.data.videos;
            }
            tabs = tabs.concat(['mentioned', 'mentionedby']);
            var tabTitles = {
                mentioned: 'Mentioned',
                mentionedby: 'Mentioned By',
                books: 'Books',
                videos: 'Videos'
            };
            var tabCounts = {
                mentioned: 'mentioned_count',
                mentionedby: 'mentioned_by_count',
                books: 'book_count',
                videos: 'video_count'
            };
            var tabTooltips = {
                mentioned: 'Books and people mentioned by ' + thing.props.title,
                mentionedby: 'People who have mentioned ' + thing.props.title,
                books: 'Books by ' + thing.props.title,
                videos: 'Videos by ' + thing.props.title
            };
            var tabHeading = _react2.default.createElement(
                'ul',
                { className: 'tabs text-left', role: 'tablist' },
                tabs.map(function (x) {
                    var cls = void 0;
                    var aria = void 0;
                    if (x === tab) {
                        return _react2.default.createElement(
                            'li',
                            {
                                className: 'tabs-title is-active',
                                role: 'tab',
                                key: x,
                                title: tabTooltips[x],
                                'aria-selected': true
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
                            role: 'tab',
                            key: x,
                            title: tabTooltips[x],
                            'aria-selected': false
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
            if (thing.video_count === 0 && thing.book_count === 0 && thing.mentioned_count === 0 && thing.mentioned_by_count === 0) {
                metaRobots = { name: 'robots', content: 'noindex' };
            }
            if (thing.props.type === 'person') {
                if (tab === 'books' && thing.book_count === 0) {
                    metaRobots = { name: 'robots', content: 'noindex' };
                }
                if (tab === 'mentioned' && thing.mentioned_count === 0) {
                    metaRobots = { name: 'robots', content: 'noindex' };
                }
                if (tab === 'mentionedby' && thing.mentioned_by_count === 0) {
                    metaRobots = { name: 'robots', content: 'noindex' };
                }
            } else {
                if (thing.mentioned_count === 0 && thing.mentioned_by_count === 0) {
                    metaRobots = { name: 'robots', content: 'noindex' };
                }
                if (tab === 'mentionedby' && thing.mentioned_by_count === 0) {
                    metaRobots = { name: 'robots', content: 'noindex' };
                }
            }
            var tabContent = void 0;
            var pageTitle = void 0;
            var pageDescription = void 0;
            if (tab === 'mentioned') {
                tabContent = _react2.default.createElement(_ThingMentionTab2.default, {
                    loggedin: this.props.loggedin,
                    id: id,
                    mentions: mentions,
                    count: thing.mentioned_count,
                    type: thing.props.type,
                    path: this.props.path,
                    page: this.props.query.page
                });
                pageTitle = 'Mentioned - ' + thing.props.title;
                if (thing.props.type === 'person') {
                    pageDescription = 'Books and people mentioned by ' + thing.props.title;
                } else {
                    pageDescription = 'Books and people mentioned in ' + thing.props.title;
                }
            } else if (tab === 'mentionedby') {
                tabContent = _react2.default.createElement(_ThingMentionedByTab2.default, {
                    loggedin: this.props.loggedin,
                    id: id,
                    mentionedby: mentionedby,
                    count: thing.mentioned_by_count,
                    type: thing.props.type,
                    path: this.props.path,
                    page: this.props.query.page
                });
                pageTitle = 'Mentioned by - ' + thing.props.title;
                pageDescription = 'People or books that mention ' + thing.props.title;
            } else if (tab === 'books' && thing.props.type === 'person') {
                tabContent = _react2.default.createElement(_ThingBookTab2.default, {
                    loggedin: this.props.loggedin,
                    id: id,
                    books: books,
                    count: thing.book_count,
                    path: this.props.path,
                    page: this.props.query.page
                });
                pageTitle = 'Books - ' + thing.props.title;
                pageDescription = 'Books authored by ' + thing.props.title;
            } else if (tab === 'videos' && thing.props.type === 'person') {
                tabContent = _react2.default.createElement(_ThingVideoTab2.default, {
                    loggedin: this.props.loggedin,
                    id: id,
                    videos: videos,
                    count: thing.video_count,
                    path: this.props.path,
                    page: this.props.query.page
                });
                pageTitle = 'Videos - ' + thing.props.title;
                pageDescription = 'A collection of videos of ' + thing.props.title;
            }
            pageDescription = thing.props.description ? pageDescription + ', ' + thing.props.description : pageDescription;
            var imageUrl = void 0;
            if (thing.image) {
                imageUrl = _config2.default.url + 'api/v1/static/images/' + thing.image.md5 + '-' + thing.image.width + '-' + thing.image.height + '.jpg';
            }
            return _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(_reactHelmet2.default, {
                    title: pageTitle,
                    titleTemplate: '%s - ' + _config2.default.name,
                    meta: [{ name: 'description', content: pageDescription }, metaRobots, { name: 'twitter:card', content: 'summary' }, { name: 'twitter:site', content: _config2.default.twitter }, { name: 'twitter:title', content: pageTitle }, {
                        name: 'twitter:description',
                        content: pageDescription
                    }, { name: 'twitter:image', content: imageUrl }, { property: 'og:title', content: pageTitle }, { property: 'og:type', content: 'article' }, {
                        property: 'og:url',
                        content: _config2.default.url + this.props.path
                    }, {
                        property: 'og:description',
                        content: pageDescription
                    }, { property: 'og:image', content: imageUrl }, { property: 'og:site_name', content: _config2.default.name }],
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
                            { className: 'row' },
                            _react2.default.createElement(
                                'div',
                                { className: 'small-12 large-3 columns' },
                                _react2.default.createElement(
                                    'div',
                                    null,
                                    thing.props.type !== 'video' ? _react2.default.createElement(
                                        'a',
                                        { onClick: this.onOpenModal },
                                        thing.props.type === 'book' ? _react2.default.createElement(_Thumbnail2.default, {
                                            alt: thing.props.title,
                                            type: thing.props.type,
                                            image: thing.image,
                                            shadow: true,
                                            bordered: true,
                                            marginBottom: true,
                                            displayHeight: 200
                                        }) : _react2.default.createElement(_Thumbnail2.default, {
                                            alt: thing.props.title,
                                            type: thing.props.type,
                                            image: thing.image,
                                            bordered: true,
                                            marginBottom: true,
                                            displayWidth: 200
                                        })
                                    ) : null,
                                    _react2.default.createElement(
                                        _Modal2.default,
                                        {
                                            isOpen: this.state.modalIsOpen,
                                            onClose: this.onCloseModal,
                                            className: 'modal-content modal-small',
                                            overlayClassName: 'modal-overlay'
                                        },
                                        thing.image ? _react2.default.createElement(
                                            'div',
                                            null,
                                            _react2.default.createElement(
                                                'h1',
                                                null,
                                                'Image'
                                            ),
                                            thing.props.type === 'book' ? _react2.default.createElement(_Thumbnail2.default, {
                                                alt: thing.props.title,
                                                type: thing.props.type,
                                                image: thing.image,
                                                shadow: true,
                                                displayHeight: 200
                                            }) : _react2.default.createElement(_Thumbnail2.default, {
                                                type: thing.props.type,
                                                image: thing.image,
                                                displayWidth: 200
                                            }),
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'row' },
                                                _react2.default.createElement(
                                                    'div',
                                                    {
                                                        className: 'small-6 columns'
                                                    },
                                                    _react2.default.createElement(
                                                        'strong',
                                                        null,
                                                        'Description'
                                                    )
                                                ),
                                                _react2.default.createElement(
                                                    'div',
                                                    {
                                                        className: 'small-6 columns text-right'
                                                    },
                                                    _react2.default.createElement(_Time2.default, {
                                                        hintDirection: 'bottom-left',
                                                        timestamp: thing.image.added,
                                                        type: 'ago'
                                                    })
                                                )
                                            ),
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'callout' },
                                                _react2.default.createElement(_Markdown2.default, {
                                                    markdown: thing.image.description
                                                })
                                            ),
                                            _react2.default.createElement(_CopyButton2.default, {
                                                className: 'button secondary',
                                                hintDirection: 'right',
                                                text: thing.image.description,
                                                ariaLabel: 'Copy description as markdown'
                                            }),
                                            _react2.default.createElement(
                                                'button',
                                                {
                                                    className: 'button float-right',
                                                    onClick: this.onCloseModal
                                                },
                                                'Close'
                                            )
                                        ) : null
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'small-12 large-9 columns' },
                                _react2.default.createElement(
                                    'h1',
                                    null,
                                    thing.props.title,
                                    thing.props.url ? _react2.default.createElement(
                                        'a',
                                        {
                                            className: 'secondary',
                                            href: thing.props.url,
                                            target: '_blank'
                                        },
                                        ' ',
                                        _react2.default.createElement('span', { className: 'ion-link' })
                                    ) : null
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'row' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'small-12 columns' },
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'thing-description' },
                                            thing.props.description,
                                            authors
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'row' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'shrink columns' },
                                        _react2.default.createElement(_Share2.default, {
                                            title: thing.props.title,
                                            path: this.props.path
                                        })
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'row' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'small-12 columns' },
                                        _react2.default.createElement(_PageBar2.default, {
                                            id: id,
                                            slug: thing.props.slug,
                                            type: thing.props.type,
                                            noPage: true
                                        })
                                    )
                                ),
                                thing.props.type === 'video' ? _react2.default.createElement(
                                    'div',
                                    null,
                                    _react2.default.createElement(
                                        'a',
                                        { href: thing.url },
                                        _react2.default.createElement('img', {
                                            className: '',
                                            src: '/assets/video.png',
                                            alt: ''
                                        })
                                    )
                                ) : null,
                                tabHeading,
                                _react2.default.createElement(
                                    'div',
                                    { className: 'tabs-content text-left' },
                                    _react2.default.createElement(
                                        'div',
                                        {
                                            className: 'tabs-panel is-active',
                                            'aria-hidden': 'false'
                                        },
                                        tabContent
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    null,
                                    'Tags:',
                                    thing.tags ? _react2.default.createElement(
                                        'span',
                                        null,
                                        thing.tags.map(function (x) {
                                            return _react2.default.createElement(
                                                'a',
                                                {
                                                    key: x,
                                                    className: 'tag secondary round small no-margin-bottom',
                                                    href: '/tags/' + x
                                                },
                                                x
                                            );
                                        })
                                    ) : null,
                                    _react2.default.createElement(_EditTags2.default, { tags: thing.tags, id: id })
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return ThingPage;
}(_react2.default.Component);

exports.default = ThingPage;