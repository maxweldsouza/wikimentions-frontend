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

var _Link = require('./Link');

var _Link2 = _interopRequireDefault(_Link);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var tags = ['book_without_author', 'missing_isbn', 'person_without_description'];

var Maintenance = function (_React$Component) {
    _inherits(Maintenance, _React$Component);

    function Maintenance() {
        _classCallCheck(this, Maintenance);

        return _possibleConstructorReturn(this, (Maintenance.__proto__ || Object.getPrototypeOf(Maintenance)).apply(this, arguments));
    }

    _createClass(Maintenance, [{
        key: 'render',
        value: function render() {
            var parts = this.props.path.split('/');
            var tag = parts[1];
            var limit = Number(parts[2]);
            var offset = Number(parts[3]);

            var data = this.props.data.data[tag];
            var title = void 0;
            var results = void 0;
            if (tag === 'book_without_author') {
                title = 'Books with no Author';
                results = _react2.default.createElement(
                    'div',
                    null,
                    data.map(function (x) {
                        return _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                _Link2.default,
                                { type: 'book', id: x.id, slug: x.props.slug },
                                x.props.title
                            )
                        );
                    })
                );
            } else if (tag === 'missing_isbn') {
                title = 'Books with Missing ISBN';
                results = _react2.default.createElement(
                    'div',
                    null,
                    data.map(function (x) {
                        return _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                _Link2.default,
                                { type: 'book', id: x.id, slug: x.props.slug },
                                x.props.title
                            )
                        );
                    })
                );
            } else if (tag === 'person_without_description') {
                title = 'People Pages without Description';
                results = _react2.default.createElement(
                    'div',
                    null,
                    data.map(function (x) {
                        return _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                _Link2.default,
                                {
                                    type: 'person',
                                    id: x.id,
                                    slug: x.props.slug
                                },
                                x.props.title
                            )
                        );
                    })
                );
            }
            var prev = void 0;
            if (offset === 0) {
                prev = '#';
            } else {
                prev = '/maintenance/' + tag + '/' + limit + '/' + (offset - limit);
            }
            var next = '/maintenance/' + tag + '/' + limit + '/' + (offset + limit);
            return _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(_reactHelmet2.default, {
                    title: 'Maintenance',
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
                            'div',
                            { className: 'row' },
                            _react2.default.createElement(
                                'div',
                                { className: 'small-12 columns' },
                                _react2.default.createElement(
                                    'h1',
                                    null,
                                    title
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'row' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'small-4 columns' },
                                        'Showing results ' + offset + ' to ' + (limit + offset)
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'small-4 columns' },
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'button-group small' },
                                            _react2.default.createElement(
                                                'a',
                                                {
                                                    className: 'button',
                                                    href: '/maintenance/' + tag + '/50/0'
                                                },
                                                '50'
                                            ),
                                            _react2.default.createElement(
                                                'a',
                                                {
                                                    className: 'button',
                                                    href: '/maintenance/' + tag + '/100/0'
                                                },
                                                '100'
                                            ),
                                            _react2.default.createElement(
                                                'a',
                                                {
                                                    className: 'button',
                                                    href: '/maintenance/' + tag + '/200/0'
                                                },
                                                '200'
                                            )
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'small-4 columns' },
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'button-group small' },
                                            _react2.default.createElement(
                                                'a',
                                                { className: 'button', href: prev },
                                                'Previous'
                                            ),
                                            _react2.default.createElement(
                                                'a',
                                                { className: 'button', href: next },
                                                'Next'
                                            )
                                        )
                                    )
                                ),
                                data.length === 0 ? _react2.default.createElement(
                                    'div',
                                    null,
                                    'There is no data here.'
                                ) : null,
                                results
                            )
                        )
                    )
                )
            );
        }
    }], [{
        key: 'resources',
        value: function resources(appstate) {
            var parts = appstate.path.split('/');
            var tag = parts[1];
            var limit = parts[2];
            var offset = parts[3];
            if (!tags.includes(tag)) {
                throw {
                    status: 404,
                    message: 'Count not find what you were looking for'
                };
            }
            return {
                api: [{
                    name: 'data',
                    path: '/api/v1/maintenance/' + tag + '/' + limit + '/' + offset
                }]
            };
        }
    }]);

    return Maintenance;
}(_react2.default.Component);

exports.default = Maintenance;