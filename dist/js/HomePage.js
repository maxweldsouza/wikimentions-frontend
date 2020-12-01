'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _Navbar = require('./Navbar');

var _Navbar2 = _interopRequireDefault(_Navbar);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Link = require('./Link');

var _Link2 = _interopRequireDefault(_Link);

var _Thumbnail = require('./Thumbnail');

var _Thumbnail2 = _interopRequireDefault(_Thumbnail);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _reactAutobind = require('react-autobind');

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

var _reactTweetEmbed = require('react-tweet-embed');

var _reactTweetEmbed2 = _interopRequireDefault(_reactTweetEmbed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HomePage = function (_React$Component) {
    _inherits(HomePage, _React$Component);

    _createClass(HomePage, null, [{
        key: 'resources',
        value: function resources() {
            return {
                api: [{
                    name: 'home',
                    path: '/api/v1/home'
                }]
            };
        }
    }]);

    function HomePage(props) {
        _classCallCheck(this, HomePage);

        var _this = _possibleConstructorReturn(this, (HomePage.__proto__ || Object.getPrototypeOf(HomePage)).call(this, props));

        (0, _reactAutobind2.default)(_this);
        _this.state = {
            tab: 'Startups'
        };
        return _this;
    }

    _createClass(HomePage, [{
        key: 'onChangeTab',
        value: function onChangeTab(x) {
            this.setState({ tab: x });
        }
    }, {
        key: 'render',
        value: function render() {
            var featuredVideo = this.props.data.home.featuredVideo;
            var video2 = this.props.data.home.video2;
            var video3 = this.props.data.home.video3;
            var books = this.props.data.home.books;
            var people = this.props.data.home.people;
            return _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(_reactHelmet2.default, {
                    title: 'Home',
                    titleTemplate: '%s - ' + _config2.default.name,
                    meta: [{
                        name: 'description',
                        content: 'Discover people, books and videos based on mentions'
                    }],
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
                    { className: 'full-width' },
                    _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement(
                            'div',
                            { className: 'small-12 columns margin-bottom' },
                            _react2.default.createElement(
                                'div',
                                { className: 'row' },
                                _react2.default.createElement(
                                    'div',
                                    {
                                        className: 'small-12 large-8 columns margin-bottom'
                                    },
                                    _react2.default.createElement(
                                        _Link2.default,
                                        {
                                            id: featuredVideo.id,
                                            slug: featuredVideo.props.slug,
                                            className: 'secondary',
                                            type: featuredVideo.props.type
                                        },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'home-video' },
                                            _react2.default.createElement('img', {
                                                className: 'home-video-thumb',
                                                src: _utils2.default.youtubeThumb(featuredVideo.props.url, 'max')
                                            }),
                                            _react2.default.createElement(
                                                'h1',
                                                { className: 'video-title' },
                                                featuredVideo.props.title
                                            )
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'small-12 large-4 columns' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'row' },
                                        _react2.default.createElement(
                                            'div',
                                            {
                                                className: 'small-12 medium-6 large-12 columns margin-bottom'
                                            },
                                            _react2.default.createElement(
                                                _Link2.default,
                                                {
                                                    id: video2.id,
                                                    slug: video2.props.slug,
                                                    className: 'secondary',
                                                    type: video2.props.type
                                                },
                                                _react2.default.createElement(
                                                    'div',
                                                    { className: 'home-video' },
                                                    _react2.default.createElement('img', {
                                                        className: 'home-video-thumb',
                                                        src: _utils2.default.youtubeThumb(video2.props.url)
                                                    }),
                                                    _react2.default.createElement(
                                                        'strong',
                                                        {
                                                            className: 'video-title'
                                                        },
                                                        video2.props.title
                                                    )
                                                )
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            {
                                                className: 'small-12 medium-6 large-12 columns margin-bottom'
                                            },
                                            _react2.default.createElement(
                                                _Link2.default,
                                                {
                                                    id: video3.id,
                                                    slug: video3.props.slug,
                                                    className: 'secondary',
                                                    type: video3.props.type
                                                },
                                                _react2.default.createElement(
                                                    'div',
                                                    { className: 'home-video' },
                                                    _react2.default.createElement('img', {
                                                        className: 'home-video-thumb',
                                                        src: _utils2.default.youtubeThumb(video3.props.url)
                                                    }),
                                                    _react2.default.createElement(
                                                        'strong',
                                                        {
                                                            className: 'video-title'
                                                        },
                                                        video3.props.title
                                                    )
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'small-12 columns margin-bottom' },
                            _react2.default.createElement(
                                'div',
                                { className: 'home-tagline' },
                                'Discover books and people mentioned by prominent people.'
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'full-width white' },
                    _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement(
                            'div',
                            { className: 'small-12 columns margin-bottom' },
                            _react2.default.createElement(
                                'h2',
                                { className: 'home-section' },
                                'What People Are Saying'
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'row' },
                                _react2.default.createElement(
                                    'div',
                                    {
                                        className: 'small-12 large-6 columns text-center'
                                    },
                                    _react2.default.createElement(_reactTweetEmbed2.default, {
                                        id: '841342731049926657',
                                        options: {
                                            cards: 'hidden',
                                            align: 'center'
                                        }
                                    })
                                ),
                                _react2.default.createElement(
                                    'div',
                                    {
                                        className: 'small-12 large-6 columns text-center'
                                    },
                                    _react2.default.createElement(_reactTweetEmbed2.default, {
                                        id: '841342689815744512',
                                        options: {
                                            cards: 'hidden',
                                            align: 'center'
                                        }
                                    })
                                ),
                                _react2.default.createElement(
                                    'div',
                                    {
                                        className: 'small-12 columns text-center'
                                    },
                                    _react2.default.createElement(_reactTweetEmbed2.default, {
                                        id: '847483186816835584',
                                        options: {
                                            cards: 'hidden',
                                            align: 'center'
                                        }
                                    })
                                )
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'full-width' },
                    _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement(
                            'div',
                            { className: 'small-12 columns margin-bottom' },
                            _react2.default.createElement(
                                'h2',
                                { className: 'home-section' },
                                'Browse Tags'
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'row' },
                                _react2.default.createElement(
                                    'div',
                                    {
                                        className: 'small-12 medium-6 large-4 columns text-center'
                                    },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'small-12 columns' },
                                        _react2.default.createElement(
                                            'a',
                                            {
                                                href: '/tags/Programming',
                                                className: 'secondary tag-card'
                                            },
                                            _react2.default.createElement('img', {
                                                src: '/assets/images/pexels-photo-90807.jpeg'
                                            }),
                                            _react2.default.createElement(
                                                'span',
                                                { className: 'label' },
                                                'Programming'
                                            )
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    {
                                        className: 'small-12 medium-6 large-4 columns text-center'
                                    },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'small-12 columns' },
                                        _react2.default.createElement(
                                            'a',
                                            {
                                                href: '/tags/Science',
                                                className: 'secondary tag-card'
                                            },
                                            _react2.default.createElement('img', {
                                                src: '/assets/images/sky-earth-space-working.jpg'
                                            }),
                                            _react2.default.createElement(
                                                'span',
                                                { className: 'label' },
                                                'Science'
                                            )
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    {
                                        className: 'small-12 medium-6 large-4 columns text-center'
                                    },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'small-12 columns' },
                                        _react2.default.createElement(
                                            'a',
                                            {
                                                href: '/tags/Startups',
                                                className: 'secondary tag-card'
                                            },
                                            _react2.default.createElement('img', {
                                                src: '/assets/images/pexels-photo.jpg'
                                            }),
                                            _react2.default.createElement(
                                                'span',
                                                { className: 'label' },
                                                'Startups'
                                            )
                                        )
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'small-12 columns margin-bottom' },
                            _react2.default.createElement(
                                'div',
                                { className: 'row' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'small-12 medium-4 columns' },
                                    _react2.default.createElement(
                                        'h2',
                                        { className: 'home-section' },
                                        'Lists'
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        null,
                                        _react2.default.createElement(
                                            'a',
                                            { href: '/lists/1/best-science-books' },
                                            'Science books'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        null,
                                        _react2.default.createElement(
                                            'a',
                                            {
                                                href: '/lists/4/programmers-that-created-programming-languages'
                                            },
                                            'Programmers that created programming languages'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        null,
                                        _react2.default.createElement(
                                            'a',
                                            {
                                                href: '/lists/2/best-programming-books'
                                            },
                                            'Programming books'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        null,
                                        _react2.default.createElement(
                                            'a',
                                            {
                                                href: '/lists/3/best-programming-talks'
                                            },
                                            'Programming talks'
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'small-12 medium-8 columns' },
                                    _react2.default.createElement(
                                        'h2',
                                        { className: 'home-section' },
                                        'Quotes'
                                    ),
                                    _react2.default.createElement(
                                        'blockquote',
                                        null,
                                        'It doesn\'t matter how beautiful your theory is, it doesn\'t matter how smart you are. If it doesn\'t agree with experiment, it\'s wrong. --',
                                        _react2.default.createElement(
                                            'a',
                                            { href: '/quotes/116/richard-feynman' },
                                            'Richard Feynman'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'blockquote',
                                        null,
                                        'I would like to die on mars. Just not on impact. --',
                                        _react2.default.createElement(
                                            'a',
                                            { href: '/quotes/339/elon-musk' },
                                            'Elon Musk'
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement(
                            'div',
                            { className: 'small-12 columns margin-bottom' },
                            _react2.default.createElement(
                                'h2',
                                { className: 'home-section' },
                                'Featured books'
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'row' },
                                books.map(function (x) {
                                    return _react2.default.createElement(
                                        'div',
                                        {
                                            key: x.id,
                                            className: 'small-6 medium-4 large-3 xlarge-2 columns text-center'
                                        },
                                        _react2.default.createElement(
                                            _Link2.default,
                                            {
                                                id: x.id,
                                                slug: x.props.slug,
                                                className: 'home-books',
                                                type: x.props.type
                                            },
                                            _react2.default.createElement(_Thumbnail2.default, {
                                                alt: x.props.title,
                                                type: x.props.type,
                                                image: x.image,
                                                shadow: true,
                                                bordered: true,
                                                marginBottom: true,
                                                offset: 10000,
                                                displayHeight: 200
                                            })
                                        )
                                    );
                                })
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement(
                            'div',
                            { className: 'small-12 columns margin-bottom' },
                            _react2.default.createElement(
                                'h2',
                                { className: 'home-section' },
                                'Featured people'
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'row' },
                                people.map(function (x) {
                                    return _react2.default.createElement(
                                        'div',
                                        {
                                            key: x.id,
                                            className: 'small-12 medium-6 large-4 xlarge-3 columns text-center'
                                        },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'person-card' },
                                            _react2.default.createElement(
                                                _Link2.default,
                                                {
                                                    id: x.id,
                                                    className: 'secondary',
                                                    slug: x.props.slug,
                                                    type: x.props.type
                                                },
                                                _react2.default.createElement(
                                                    'span',
                                                    {
                                                        className: 'person-card-img'
                                                    },
                                                    _react2.default.createElement(_Thumbnail2.default, {
                                                        alt: x.props.title,
                                                        type: x.props.type,
                                                        image: x.image,
                                                        shadow: false,
                                                        round: true,
                                                        bordered: true,
                                                        marginBottom: true,
                                                        offset: 10000,
                                                        displayWidth: 120
                                                    })
                                                ),
                                                _react2.default.createElement(
                                                    'span',
                                                    {
                                                        className: 'person-card-title'
                                                    },
                                                    x.props.title
                                                )
                                            ),
                                            _react2.default.createElement(
                                                'div',
                                                {
                                                    className: 'person-card-description',
                                                    title: x.props.description
                                                },
                                                x.props.description
                                            )
                                        )
                                    );
                                })
                            )
                        )
                    )
                )
            );
        }
    }]);

    return HomePage;
}(_react2.default.Component);

exports.default = HomePage;