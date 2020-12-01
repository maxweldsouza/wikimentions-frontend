'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _AdminOnly = require('./AdminOnly');

var _AdminOnly2 = _interopRequireDefault(_AdminOnly);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Footer = function Footer() {
    return _react2.default.createElement(
        'footer',
        { className: 'page-footer align-right', role: 'contentinfo' },
        _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
                'div',
                {
                    className: 'small-12 xlarge-4 columns footer-logo-container'
                },
                _react2.default.createElement(
                    'div',
                    { className: 'footer-logo' },
                    _config2.default.name
                ),
                _config2.default.contact
            ),
            _react2.default.createElement(
                'div',
                { className: 'small-12 xlarge-8 columns' },
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        {
                            className: 'small-6 xlarge-offset-3 large-3 columns'
                        },
                        _react2.default.createElement(
                            'ul',
                            { className: 'menu vertical' },
                            _react2.default.createElement(
                                'li',
                                { className: 'menu-text' },
                                'Navigation'
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { href: '/create' },
                                    'Create Page'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { href: '/lists/create' },
                                    'Create List'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { rel: 'nofollow', href: '/recent-changes' },
                                    'Recent Changes'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    {
                                        rel: 'nofollow',
                                        href: '/recent-discussions'
                                    },
                                    'Recent Discussions'
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'small-6 large-3 columns' },
                        _react2.default.createElement(
                            'ul',
                            { className: 'menu vertical' },
                            _react2.default.createElement(
                                'li',
                                { className: 'menu-text' },
                                'Help'
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { href: '/about-us' },
                                    'About Us'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { href: '/guidelines' },
                                    'Guidelines'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { href: '/media-kit' },
                                    'Media Kit'
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'small-6 large-3 columns' },
                        _react2.default.createElement(
                            'ul',
                            { className: 'menu vertical' },
                            _react2.default.createElement(
                                'li',
                                { className: 'menu-text' },
                                'Social'
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { href: _config2.default.social.facebook },
                                    'Facebook'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { href: _config2.default.social.twitter },
                                    'Twitter'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { href: '/blog' },
                                    'Blog'
                                )
                            )
                        )
                    )
                )
            ),
            _react2.default.createElement(
                'div',
                {
                    className: 'small-12 columns text-center',
                    style: { fontSize: '12px', marginTop: 30 }
                },
                'By using',
                ' ',
                _config2.default.name,
                ' ',
                'you agree to our',
                ' ',
                _react2.default.createElement(
                    'a',
                    { href: '/terms-of-use' },
                    'Terms of Use'
                ),
                ' ',
                'and',
                ' ',
                _react2.default.createElement(
                    'a',
                    { href: '/privacy-policy' },
                    'Privacy Policy'
                ),
                ' ',
                'which were',
                ' ',
                _react2.default.createElement(
                    'strong',
                    null,
                    'last updated'
                ),
                ' ',
                'on',
                ' ',
                _react2.default.createElement(
                    'strong',
                    null,
                    '23rd September 2016.'
                ),
                _react2.default.createElement(
                    _AdminOnly2.default,
                    null,
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'strong',
                            null,
                            'Admin: '
                        ),
                        _react2.default.createElement(
                            'a',
                            { rel: 'nofollow', href: '/feedback' },
                            'Feedback'
                        ),
                        ' . ',
                        _react2.default.createElement(
                            'a',
                            { rel: 'nofollow', href: '/bugs' },
                            'Bugs'
                        ),
                        ' . ',
                        _react2.default.createElement(
                            'a',
                            { rel: 'nofollow', href: '/kitchen-sink' },
                            'Kitchen Sink'
                        )
                    )
                )
            )
        )
    );
};

exports.default = Footer;