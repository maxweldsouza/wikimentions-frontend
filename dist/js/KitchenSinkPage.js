'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ButtonSelect = require('./ButtonSelect');

var _ButtonSelect2 = _interopRequireDefault(_ButtonSelect);

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _Navbar = require('./Navbar');

var _Navbar2 = _interopRequireDefault(_Navbar);

var _Comment = require('./Comment');

var _Comment2 = _interopRequireDefault(_Comment);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _DiscussReply = require('./DiscussReply');

var _DiscussReply2 = _interopRequireDefault(_DiscussReply);

var _PageBar = require('./PageBar');

var _PageBar2 = _interopRequireDefault(_PageBar);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _AdminOnly = require('./AdminOnly');

var _AdminOnly2 = _interopRequireDefault(_AdminOnly);

var _Thumbnail = require('./Thumbnail');

var _Thumbnail2 = _interopRequireDefault(_Thumbnail);

var _SubmitButton = require('./SubmitButton');

var _SubmitButton2 = _interopRequireDefault(_SubmitButton);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _reactAutobind = require('react-autobind');

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KitchenSinkPage = function (_React$Component) {
    _inherits(KitchenSinkPage, _React$Component);

    function KitchenSinkPage() {
        _classCallCheck(this, KitchenSinkPage);

        return _possibleConstructorReturn(this, (KitchenSinkPage.__proto__ || Object.getPrototypeOf(KitchenSinkPage)).apply(this, arguments));
    }

    _createClass(KitchenSinkPage, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(_reactHelmet2.default, {
                    title: 'Kitchen Sink',
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
                        { className: 'small-8 columns' },
                        _react2.default.createElement(
                            'h1',
                            null,
                            'Kitchen Sink'
                        ),
                        _react2.default.createElement(
                            _AdminOnly2.default,
                            null,
                            _react2.default.createElement(
                                'div',
                                { className: 'row' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'small-12 columns' },
                                    _react2.default.createElement('hr', null),
                                    _react2.default.createElement(
                                        'h2',
                                        null,
                                        'Buttons'
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        null,
                                        _react2.default.createElement(
                                            'button',
                                            { className: 'button' },
                                            'Button'
                                        ),
                                        _react2.default.createElement(
                                            'button',
                                            { className: 'button secondary' },
                                            'Secondary'
                                        ),
                                        _react2.default.createElement(
                                            'button',
                                            { className: 'button success' },
                                            'Success'
                                        ),
                                        _react2.default.createElement(
                                            'button',
                                            { className: 'button warning' },
                                            'Warning'
                                        ),
                                        _react2.default.createElement(
                                            'button',
                                            { className: 'button alert' },
                                            'Alert'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'button',
                                        { className: 'button bare large' },
                                        _react2.default.createElement('span', { className: 'ion-share' })
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        null,
                                        _react2.default.createElement(
                                            'button',
                                            {
                                                className: 'button loading disabled'
                                            },
                                            'Button'
                                        ),
                                        _react2.default.createElement(
                                            'button',
                                            {
                                                className: 'button secondary loading disabled'
                                            },
                                            'Secondary'
                                        ),
                                        _react2.default.createElement(
                                            'button',
                                            {
                                                className: 'button success loading disabled'
                                            },
                                            'Success'
                                        ),
                                        _react2.default.createElement(
                                            'button',
                                            {
                                                className: 'button warning loading disabled'
                                            },
                                            'Warning'
                                        ),
                                        _react2.default.createElement(
                                            'button',
                                            {
                                                className: 'button alert loading disabled'
                                            },
                                            'Alert'
                                        )
                                    ),
                                    _react2.default.createElement('hr', null),
                                    _react2.default.createElement(
                                        'h2',
                                        null,
                                        'Typography'
                                    ),
                                    _react2.default.createElement(
                                        'h1',
                                        null,
                                        'Heading 1'
                                    ),
                                    _react2.default.createElement(
                                        'h2',
                                        null,
                                        'Heading 2'
                                    ),
                                    _react2.default.createElement(
                                        'h3',
                                        null,
                                        'Heading 3'
                                    ),
                                    _react2.default.createElement('hr', null),
                                    _react2.default.createElement(
                                        'h2',
                                        null,
                                        'Badge'
                                    ),
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'badge' },
                                        'B'
                                    ),
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'secondary badge' },
                                        'S'
                                    ),
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'success badge' },
                                        'S'
                                    ),
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'warning badge' },
                                        'W'
                                    ),
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'alert badge' },
                                        'A'
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'small-12 columns' },
                                    _react2.default.createElement(
                                        'h2',
                                        null,
                                        'Callout'
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'callout' },
                                        'This is a callout.'
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'callout success' },
                                        'This is a callout.'
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'callout warning' },
                                        'This is a callout.'
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'callout alert' },
                                        'This is a callout.'
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'small-12 columns' },
                                    _react2.default.createElement(
                                        'h2',
                                        null,
                                        'Pagination'
                                    ),
                                    _react2.default.createElement(
                                        'ul',
                                        {
                                            className: 'pagination',
                                            role: 'navigation',
                                            'aria-label': 'Pagination'
                                        },
                                        _react2.default.createElement(
                                            'li',
                                            { className: 'disabled' },
                                            'Previous',
                                            ' ',
                                            _react2.default.createElement(
                                                'span',
                                                { className: 'show-for-sr' },
                                                'page'
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'li',
                                            { className: 'current' },
                                            _react2.default.createElement(
                                                'span',
                                                { className: 'show-for-sr' },
                                                'You\'re on page'
                                            ),
                                            ' ',
                                            '1'
                                        ),
                                        _react2.default.createElement(
                                            'li',
                                            null,
                                            _react2.default.createElement(
                                                'a',
                                                { href: '#', 'aria-label': 'Page 2' },
                                                '2'
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'li',
                                            null,
                                            _react2.default.createElement(
                                                'a',
                                                { href: '#', 'aria-label': 'Page 3' },
                                                '3'
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'li',
                                            null,
                                            _react2.default.createElement(
                                                'a',
                                                { href: '#', 'aria-label': 'Page 4' },
                                                '4'
                                            )
                                        ),
                                        _react2.default.createElement('li', {
                                            className: 'ellipsis',
                                            'aria-hidden': 'true'
                                        }),
                                        _react2.default.createElement(
                                            'li',
                                            null,
                                            _react2.default.createElement(
                                                'a',
                                                { href: '#', 'aria-label': 'Page 12' },
                                                '12'
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'li',
                                            null,
                                            _react2.default.createElement(
                                                'a',
                                                { href: '#', 'aria-label': 'Page 13' },
                                                '13'
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'li',
                                            null,
                                            _react2.default.createElement(
                                                'a',
                                                { href: '#', 'aria-label': 'Next page' },
                                                'Next',
                                                ' ',
                                                _react2.default.createElement(
                                                    'span',
                                                    { className: 'show-for-sr' },
                                                    'page'
                                                )
                                            )
                                        )
                                    ),
                                    _react2.default.createElement('hr', null),
                                    _react2.default.createElement(
                                        'h2',
                                        null,
                                        'Images'
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'row' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'small-4 columns' },
                                            _react2.default.createElement('img', {
                                                className: 'thumbnail',
                                                src: 'https://d198s6k47dh00z.cloudfront.net/4994a3944f9bd4e5045064c2ed1572ec-250-250.jpg'
                                            })
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'small-4 columns' },
                                            _react2.default.createElement('img', {
                                                className: 'thumbnail',
                                                src: 'https://d198s6k47dh00z.cloudfront.net/84d376998b880e07e7a12262ff86f6dd-250-250.jpg'
                                            })
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'small-4 columns' },
                                            _react2.default.createElement('img', {
                                                className: 'thumbnail',
                                                src: 'https://d198s6k47dh00z.cloudfront.net/787d501ad8c61d42e44a1f7a19c29ff9-250-250.jpg'
                                            })
                                        )
                                    ),
                                    _react2.default.createElement('hr', null),
                                    _react2.default.createElement(
                                        'h2',
                                        null,
                                        'Forms'
                                    ),
                                    _react2.default.createElement(_ButtonSelect2.default, {
                                        options: [{
                                            name: 'Existing',
                                            value: 'Existing'
                                        }, { name: 'New', value: 'New' }],
                                        'default': 'Existing'
                                    }),
                                    _react2.default.createElement(
                                        'label',
                                        null,
                                        'Search'
                                    ),
                                    _react2.default.createElement(_Select2.default, {
                                        name: 'book_id',
                                        onSelectValue: function onSelectValue() {},
                                        types: ['book'],
                                        valid: true,
                                        message: '',
                                        placeholder: 'Book Title'
                                    }),
                                    _react2.default.createElement(
                                        'label',
                                        null,
                                        'Label'
                                    ),
                                    _react2.default.createElement(_Input2.default, {
                                        type: 'text',
                                        placeholder: 'Input',
                                        valid: true,
                                        message: ''
                                    }),
                                    _react2.default.createElement(
                                        'label',
                                        null,
                                        'Textarea'
                                    ),
                                    _react2.default.createElement('textarea', {
                                        type: 'text',
                                        placeholder: 'Textarea...'
                                    }),
                                    _react2.default.createElement(_SubmitButton2.default, {
                                        title: 'Submit',
                                        className: 'button primary float-right',
                                        submitting: false
                                    }),
                                    _react2.default.createElement('hr', null),
                                    _react2.default.createElement(
                                        'h2',
                                        null,
                                        'Tags'
                                    ),
                                    _react2.default.createElement(
                                        'span',
                                        {
                                            className: 'tag round no-margin-bottom'
                                        },
                                        'Programming',
                                        ' ',
                                        _react2.default.createElement('span', { className: 'ion-close-circled' })
                                    ),
                                    _react2.default.createElement(
                                        'span',
                                        {
                                            className: 'tag round no-margin-bottom'
                                        },
                                        'Science',
                                        ' ',
                                        _react2.default.createElement('span', { className: 'ion-close-circled' })
                                    ),
                                    _react2.default.createElement(
                                        'span',
                                        {
                                            className: 'tag round no-margin-bottom'
                                        },
                                        'Startups',
                                        ' ',
                                        _react2.default.createElement('span', { className: 'ion-close-circled' })
                                    ),
                                    _react2.default.createElement('hr', null),
                                    _react2.default.createElement(
                                        'h2',
                                        null,
                                        'Card '
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'person-card' },
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'person-card-img' },
                                            _react2.default.createElement('img', {
                                                className: 'thumbnail',
                                                src: 'https://localhost/api/v1/static/images/787d501ad8c61d42e44a1f7a19c29ff9-250-250.jpg'
                                            })
                                        ),
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'person-card-title' },
                                            'Carl Sagan'
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            {
                                                className: 'person-card-description'
                                            },
                                            'Astrophysicist'
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }], [{
        key: 'resources',
        value: function resources(appstate) {
            return {
                api: []
            };
        }
    }]);

    return KitchenSinkPage;
}(_react2.default.Component);

exports.default = KitchenSinkPage;