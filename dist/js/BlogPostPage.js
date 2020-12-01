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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BlogPostPage = function (_React$Component) {
    _inherits(BlogPostPage, _React$Component);

    function BlogPostPage() {
        _classCallCheck(this, BlogPostPage);

        return _possibleConstructorReturn(this, (BlogPostPage.__proto__ || Object.getPrototypeOf(BlogPostPage)).apply(this, arguments));
    }

    _createClass(BlogPostPage, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'flex-wrapper' },
                _react2.default.createElement(_reactHelmet2.default, {
                    title: this.props.data.post.title,
                    titleTemplate: '%s - ' + _config2.default.name + ' - Blog',
                    meta: [{ name: 'description', content: '' }, { name: 'twitter:card', content: 'summary' }, { name: 'twitter:site', content: _config2.default.twitter }, {
                        name: 'twitter:title',
                        content: this.props.data.post.title
                    }, { name: 'twitter:description', content: '' }, {
                        property: 'og:title',
                        content: this.props.data.post.title
                    }, { property: 'og:type', content: 'article' }, {
                        property: 'og:url',
                        content: _config2.default.url + this.props.path
                    }, { property: 'og:description', content: '' }, { property: 'og:site_name', content: _config2.default.name }],
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
                                    _react2.default.createElement(_BlogPost2.default, {
                                        title: this.props.data.post.title,
                                        slug: this.props.data.post.slug,
                                        content: this.props.data.post.content,
                                        created: this.props.data.post.created,
                                        prev: this.props.data.post.prev,
                                        next: this.props.data.post.next,
                                        author: this.props.data.post.author,
                                        authorId: this.props.data.post.authorId,
                                        showComments: true,
                                        showCta: true
                                    })
                                )
                            )
                        )
                    )
                )
            );
        }
    }], [{
        key: 'resources',
        value: function resources(routeObj) {
            var slug = routeObj.url.split('/')[1];
            return {
                api: [{
                    name: 'post',
                    path: '/api/v1/blogpost/' + slug
                }]
            };
        }
    }]);

    return BlogPostPage;
}(_react2.default.Component);

exports.default = BlogPostPage;