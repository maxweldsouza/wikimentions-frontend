'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _browserCookies = require('browser-cookies');

var _browserCookies2 = _interopRequireDefault(_browserCookies);

var _Dropdown = require('./Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _Link = require('./Link');

var _Link2 = _interopRequireDefault(_Link);

var _urlParse = require('url-parse');

var _urlParse2 = _interopRequireDefault(_urlParse);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _snackbar = require('./snackbar');

var _snackbar2 = _interopRequireDefault(_snackbar);

var _Thumbnail = require('./Thumbnail');

var _Thumbnail2 = _interopRequireDefault(_Thumbnail);

var _reactAutobind = require('react-autobind');

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mention = function (_React$Component) {
    _inherits(Mention, _React$Component);

    function Mention(props) {
        _classCallCheck(this, Mention);

        var _this = _possibleConstructorReturn(this, (Mention.__proto__ || Object.getPrototypeOf(Mention)).call(this, props));

        (0, _reactAutobind2.default)(_this);
        _this.state = {
            dropdownIsOpen: false
        };
        return _this;
    }

    _createClass(Mention, [{
        key: 'removeMention',
        value: function removeMention() {
            var _this2 = this;

            _superagent2.default.delete('/api/v1/mentions').type('form').send({
                mention_id: this.props.mention_id,
                _xsrf: _browserCookies2.default.get('_xsrf')
            }).end(function (err, res) {
                _this2.setState({
                    submitting: false
                });
                if (err && err.status) {
                    (0, _snackbar2.default)({ message: res.body.message });
                } else {
                    (0, _snackbar2.default)({ message: 'Mention deleted' });
                    history.pushState(null, null, window.location.pathname + window.location.search);
                    Mentions.route(window.location.pathname + window.location.search);
                }
            });
        }
    }, {
        key: 'openDropdown',
        value: function openDropdown() {
            this.setState({
                dropdownIsOpen: true
            });
        }
    }, {
        key: 'closeDropdown',
        value: function closeDropdown() {
            this.setState({
                dropdownIsOpen: false
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var icon = void 0;
            var secondaryIcon = void 0;
            var description = void 0;

            var main = void 0;
            var secondary = void 0;
            var inorby = void 0;
            if (this.props.type === 'person') {
                if (this.props.mentioned) {
                    main = this.props.mentioned;
                } else {
                    main = this.props.mentioned_by;
                }
                secondary = this.props.mentioned_in;
                inorby = 'In ';
            } else if (this.props.mentioned) {
                main = this.props.mentioned;
                secondary = this.props.mentioned_by;
                inorby = 'By ';
            } else {
                main = this.props.mentioned_by;
                secondary = this.props.mentioned_in;
                inorby = 'In ';
            }
            description = main.props && main.props.description ? main.props.description : '';

            if (secondary && 'props' in secondary && 'type' in secondary.props) {
                if (secondary.props.type === 'book') {
                    secondaryIcon = 'ion-ios-book';
                } else if (secondary.props.type === 'video') {
                    secondaryIcon = 'ion-ios-videocam';
                } else if (secondary.props.type === 'person') {
                    secondaryIcon = 'ion-person';
                }
            }

            if (main.props.type === 'book') {
                icon = 'ion-ios-book';
                description = 'Book';
            } else if (main.props.type === 'video') {
                icon = 'ion-ios-videocam';
                description = 'Video';
            } else if (main.props.type === 'person') {
                icon = 'ion-person';
            }

            var parsed = void 0;
            if (this.props.reference) {
                parsed = (0, _urlParse2.default)(this.props.reference);
            }
            return _react2.default.createElement(
                'div',
                { className: 'card box' },
                _react2.default.createElement('span', {
                    className: 'ion-chevron-down card-chevron',
                    onClick: this.openDropdown
                }),
                _react2.default.createElement(
                    _Dropdown2.default,
                    {
                        isOpen: this.state.dropdownIsOpen,
                        onClose: this.closeDropdown
                    },
                    _react2.default.createElement(
                        'div',
                        { className: 'dropdown-pane bottom-right small' },
                        _react2.default.createElement(
                            'ul',
                            { className: 'dropdown menu vertical' },
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    {
                                        className: 'secondary',
                                        onClick: this.removeMention
                                    },
                                    'Remove'
                                )
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'shrink columns' },
                    _react2.default.createElement(
                        _Link2.default,
                        {
                            id: main.id,
                            slug: main.props.slug,
                            type: main.props.type
                        },
                        _react2.default.createElement(_Thumbnail2.default, {
                            alt: main.props.title,
                            type: main.props.type,
                            image: main.image,
                            url: main.props.url,
                            displayWidth: 75
                        })
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'columns' },
                    _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement(
                            'div',
                            { className: 'small-12 columns card-title' },
                            _react2.default.createElement(
                                _Link2.default,
                                {
                                    id: main.id,
                                    slug: main.props.slug,
                                    type: main.props.type
                                },
                                main.props.title
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'small-12 columns' },
                            description ? _react2.default.createElement(
                                'span',
                                null,
                                _react2.default.createElement('span', { className: icon }),
                                ' ',
                                ' ',
                                description
                            ) : null
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'small-12 columns' },
                            this.props.quote
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'small-12 columns' },
                            main.props.type === 'person' ? _react2.default.createElement(
                                _Link2.default,
                                {
                                    id: main.id,
                                    slug: main.props.slug,
                                    title: main.props.title,
                                    type: main.props.type,
                                    className: 'secondary card-count',
                                    tab: 'videos'
                                },
                                'Videos ',
                                _react2.default.createElement(
                                    'span',
                                    { className: 'badge' },
                                    main.video_count
                                ),
                                '  '
                            ) : null,
                            main.props.type === 'person' ? _react2.default.createElement(
                                _Link2.default,
                                {
                                    id: main.id,
                                    slug: main.props.slug,
                                    title: main.props.title,
                                    type: main.props.type,
                                    className: 'secondary card-count',
                                    tab: 'books'
                                },
                                'Books ',
                                _react2.default.createElement(
                                    'span',
                                    { className: 'badge' },
                                    main.book_count
                                ),
                                '  '
                            ) : null,
                            _react2.default.createElement(
                                _Link2.default,
                                {
                                    id: main.id,
                                    slug: main.props.slug,
                                    title: main.props.title,
                                    type: main.props.type,
                                    className: 'secondary card-count',
                                    tab: 'mentioned'
                                },
                                'Mentions ',
                                _react2.default.createElement(
                                    'span',
                                    { className: 'badge' },
                                    main.mentioned_count
                                ),
                                '  '
                            ),
                            _react2.default.createElement(
                                _Link2.default,
                                {
                                    id: main.id,
                                    slug: main.props.slug,
                                    title: main.props.title,
                                    type: main.props.type,
                                    className: 'secondary card-count',
                                    tab: 'mentionedby'
                                },
                                'Mentioned By ',
                                _react2.default.createElement(
                                    'span',
                                    { className: 'badge' },
                                    main.mentioned_by_count
                                )
                            )
                        ),
                        secondary ? _react2.default.createElement(
                            'div',
                            { className: 'small-12 columns' },
                            inorby,
                            ' ',
                            _react2.default.createElement('span', { className: secondaryIcon }),
                            ' ',
                            _react2.default.createElement(
                                'strong',
                                null,
                                _react2.default.createElement(
                                    _Link2.default,
                                    {
                                        className: 'secondary',
                                        id: secondary.id,
                                        slug: secondary.props.slug,
                                        type: secondary.props.type
                                    },
                                    secondary.props.title
                                )
                            )
                        ) : null,
                        this.props.reference ? _react2.default.createElement(
                            'div',
                            { className: 'small-12 columns' },
                            'Reference: ',
                            _react2.default.createElement(
                                'a',
                                {
                                    className: 'secondary',
                                    style: { fontWeight: 'bold' },
                                    href: this.props.reference,
                                    target: '_blank'
                                },
                                parsed.hostname,
                                ' ',
                                _react2.default.createElement('span', { className: 'ion-android-open' })
                            )
                        ) : null
                    )
                )
            );
        }
    }]);

    return Mention;
}(_react2.default.Component);

exports.default = Mention;