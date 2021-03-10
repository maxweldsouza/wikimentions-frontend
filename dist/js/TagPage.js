'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _ButtonSelect = require('./ButtonSelect');

var _ButtonSelect2 = _interopRequireDefault(_ButtonSelect);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _browserCookies = require('browser-cookies');

var _browserCookies2 = _interopRequireDefault(_browserCookies);

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _HomeItem = require('./HomeItem');

var _HomeItem2 = _interopRequireDefault(_HomeItem);

var _HomeSearch = require('./HomeSearch');

var _HomeSearch2 = _interopRequireDefault(_HomeSearch);

var _Mention = require('./Mention');

var _Mention2 = _interopRequireDefault(_Mention);

var _Navbar = require('./Navbar');

var _Navbar2 = _interopRequireDefault(_Navbar);

var _Pagination = require('./Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _SignupModal = require('./SignupModal');

var _SignupModal2 = _interopRequireDefault(_SignupModal);

var _snackbar = require('./snackbar');

var _snackbar2 = _interopRequireDefault(_snackbar);

var _reactAutobind = require('react-autobind');

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TagPage = function (_React$Component) {
    _inherits(TagPage, _React$Component);

    _createClass(TagPage, null, [{
        key: 'resources',
        value: function resources(appstate) {
            var tag = appstate.path.split('/')[1];
            var page = appstate.query.page;
            var query = page ? '?page=' + page : '';
            return {
                api: [{
                    name: 'tag',
                    path: '/api/v1/tag/' + tag + query
                }]
            };
        }
    }]);

    function TagPage(props) {
        _classCallCheck(this, TagPage);

        var _this = _possibleConstructorReturn(this, (TagPage.__proto__ || Object.getPrototypeOf(TagPage)).call(this, props));

        (0, _reactAutobind2.default)(_this);
        _this.state = {
            pageno: 0
        };
        return _this;
    }

    _createClass(TagPage, [{
        key: 'render',
        value: function render() {
            var mentions = []; // this.state.newmentions;
            var options = ['Add New', 'Add Existing'];
            var tag = this.props.path.split('/')[1];
            var nomore = _react2.default.createElement(
                'div',
                { className: 'card box' },
                _react2.default.createElement(
                    'div',
                    { className: 'small-12 columns' },
                    'No more entries to show.'
                )
            );
            var tagCard = void 0;
            if (tag === 'Programming') {
                tagCard = _react2.default.createElement(
                    'a',
                    { href: '/tags/Programming', className: 'secondary tag-card' },
                    _react2.default.createElement('img', { src: '/assets/images/pexels-photo-90807.webp' }),
                    _react2.default.createElement(
                        'span',
                        { className: 'label' },
                        'Programming'
                    )
                );
            } else if (tag === 'Science') {
                tagCard = _react2.default.createElement(
                    'a',
                    { href: '/tags/Science', className: 'secondary tag-card' },
                    _react2.default.createElement('img', { src: '/assets/images/sky-earth-space-working.webp' }),
                    _react2.default.createElement(
                        'span',
                        { className: 'label' },
                        'Science'
                    )
                );
            } else if (tag === 'Startups') {
                tagCard = _react2.default.createElement(
                    'a',
                    { href: '/tags/Startups', className: 'secondary tag-card' },
                    _react2.default.createElement('img', { src: '/assets/images/pexels-photo.webp' }),
                    _react2.default.createElement(
                        'span',
                        { className: 'label' },
                        'Startups'
                    )
                );
            }
            return _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(_reactHelmet2.default, {
                    title: tag,
                    titleTemplate: '%s - ' + _config2.default.name,
                    meta: [{ name: 'description', content: '' }],
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
                        { className: 'small-12 xlarge-4 columns' },
                        _react2.default.createElement(
                            'div',
                            { className: 'show-for-xlarge' },
                            tagCard
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'callout show-for-xlarge' },
                            _react2.default.createElement(
                                'h2',
                                null,
                                'Tags'
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: 'tag' },
                                _react2.default.createElement(
                                    'a',
                                    {
                                        className: 'secondary',
                                        href: '/tags/Programming'
                                    },
                                    'Programming'
                                )
                            ),
                            ' ',
                            _react2.default.createElement(
                                'span',
                                { className: 'tag' },
                                _react2.default.createElement(
                                    'a',
                                    { className: 'secondary', href: '/tags/Science' },
                                    'Science'
                                )
                            ),
                            ' ',
                            _react2.default.createElement(
                                'span',
                                { className: 'tag' },
                                _react2.default.createElement(
                                    'a',
                                    { className: 'secondary', href: '/tags/Startups' },
                                    'Startups'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'callout show-for-xlarge' },
                            _react2.default.createElement(
                                'h2',
                                null,
                                'About'
                            ),
                            _react2.default.createElement(
                                'p',
                                null,
                                'WikiMentions helps you discover people, their books and videos based on their mentions. People can mention other people, books or videos in books or videos. Content can be added and edited by anyone.'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'small-12 xlarge-8 columns' },
                        _react2.default.createElement(
                            'div',
                            { className: 'card-container' },
                            this.props.data.tag.map(function (x) {
                                return _react2.default.createElement(_HomeItem2.default, {
                                    key: x.id,
                                    id: x.id,
                                    title: x.props.title,
                                    image: x.image,
                                    description: x.props.description,
                                    type: x.props.type,
                                    slug: x.props.slug,
                                    book_count: x.book_count,
                                    video_count: x.video_count,
                                    mentioned_count: x.mentioned_count,
                                    mentioned_by_count: x.mentioned_by_count
                                });
                            }),
                            this.props.data.tag.length === 0 ? nomore : null,
                            _react2.default.createElement(
                                'div',
                                { className: 'small-12 columns box' },
                                _react2.default.createElement(_Pagination2.default, {
                                    path: this.props.path,
                                    page: this.props.query.page,
                                    count: this.props.data.tag.length
                                })
                            )
                        )
                    )
                )
            );
        }
    }]);

    return TagPage;
}(_react2.default.Component);

exports.default = TagPage;