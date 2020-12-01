'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _Navbar = require('./Navbar');

var _Navbar2 = _interopRequireDefault(_Navbar);

var _BlogPost = require('./BlogPost');

var _BlogPost2 = _interopRequireDefault(_BlogPost);

var _reactAutobind = require('react-autobind');

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var pageNoFromPath = function pageNoFromPath(path) {
    var parts = path.split('/');
    var page = void 0;
    if (parts.length > 2) {
        page = Number(parts[2]);
    } else {
        page = 0;
    }
    return page;
};

var BlogPage = function (_React$Component) {
    _inherits(BlogPage, _React$Component);

    _createClass(BlogPage, null, [{
        key: 'resources',
        value: function resources(routeObj) {
            var page = pageNoFromPath(routeObj.url);
            return {
                api: [{
                    name: 'posts',
                    path: '/api/v1/blog/' + page
                }]
            };
        }
    }]);

    function BlogPage(props) {
        _classCallCheck(this, BlogPage);

        var _this = _possibleConstructorReturn(this, (BlogPage.__proto__ || Object.getPrototypeOf(BlogPage)).call(this, props));

        (0, _reactAutobind2.default)(_this);
        return _this;
    }

    _createClass(BlogPage, [{
        key: 'render',
        value: function render() {
            var page = pageNoFromPath(this.props.path);
            var newerPosts = void 0;
            if (page === 0) {
                newerPosts = null;
            } else if (page === 1) {
                newerPosts = _react2.default.createElement(
                    'a',
                    { href: '/blog' },
                    'Newer Posts'
                );
            } else {
                newerPosts = _react2.default.createElement(
                    'a',
                    { href: '/blog/page/' + (page - 1) },
                    'Newer Posts'
                );
            }
            return _react2.default.createElement(
                'div',
                { className: 'flex-wrapper' },
                _react2.default.createElement(_reactHelmet2.default, {
                    title: 'Blog',
                    titleTemplate: '%s - ' + _config2.default.name,
                    meta: [{
                        name: 'description',
                        content: 'The official WikiMentions blog'
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
                                    this.props.data.posts.length === 0 ? _react2.default.createElement(
                                        'div',
                                        null,
                                        _react2.default.createElement(
                                            'h1',
                                            null,
                                            'Thats all!'
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'callout' },
                                            'There are no more posts to show'
                                        )
                                    ) : null,
                                    this.props.data.posts.map(function (x) {
                                        return _react2.default.createElement(_BlogPost2.default, {
                                            key: x.slug,
                                            title: x.title,
                                            content: x.content,
                                            created: x.created,
                                            slug: x.slug,
                                            prev: x.prev,
                                            next: x.next,
                                            author: x.author,
                                            authorId: x.authorId,
                                            showComments: false
                                        });
                                    }),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'row' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'small-12 columns' },
                                            newerPosts
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'small-12 columns' },
                                            this.props.data.posts.length > 0 ? _react2.default.createElement(
                                                'a',
                                                {
                                                    href: '/blog/page/' + (page + 1)
                                                },
                                                'Older Posts'
                                            ) : null
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return BlogPage;
}(_react2.default.Component);

exports.default = BlogPage;