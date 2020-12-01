'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Thumbnail = require('./Thumbnail');

var _Thumbnail2 = _interopRequireDefault(_Thumbnail);

var _Link = require('./Link');

var _Link2 = _interopRequireDefault(_Link);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _browserCookies = require('browser-cookies');

var _browserCookies2 = _interopRequireDefault(_browserCookies);

var _snackbar = require('./snackbar');

var _snackbar2 = _interopRequireDefault(_snackbar);

var _SubmitButton = require('./SubmitButton');

var _SubmitButton2 = _interopRequireDefault(_SubmitButton);

var _reactAutobind = require('react-autobind');

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AuthorCard = function (_React$Component) {
    _inherits(AuthorCard, _React$Component);

    function AuthorCard(props) {
        _classCallCheck(this, AuthorCard);

        var _this = _possibleConstructorReturn(this, (AuthorCard.__proto__ || Object.getPrototypeOf(AuthorCard)).call(this, props));

        (0, _reactAutobind2.default)(_this);
        _this.state = {
            submitting: false
        };
        return _this;
    }

    _createClass(AuthorCard, [{
        key: 'removeAuthor',
        value: function removeAuthor(e) {
            var _this2 = this;

            e.preventDefault();
            var type = void 0;
            if (this.props.sourceType === 'book') {
                type = 'booksby';
            } else if (this.props.sourceType === 'video') {
                type = 'videosby';
            }
            _superagent2.default.delete('/api/v1/thing/' + this.props.sourceId + '/' + type).type('form').send({
                author_id: this.props.id,
                _xsrf: _browserCookies2.default.get('_xsrf')
            }).end(function (err, res) {
                _this2.setState({
                    submitting: false
                });
                if (err && err.status) {
                    (0, _snackbar2.default)({ message: res.body.message });
                } else {
                    (0, _snackbar2.default)({ message: 'Removed author' });
                    history.pushState(null, null, window.location.pathname + window.location.search);
                    Mentions.route(window.location.pathname + window.location.search);
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'form',
                { onSubmit: this.removeAuthor, className: 'card box' },
                _react2.default.createElement(
                    'div',
                    { className: 'shrink columns' },
                    _react2.default.createElement(_Thumbnail2.default, {
                        type: this.props.type,
                        image: this.props.image,
                        alt: this.props.title,
                        displayWidth: 40
                    })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'columns' },
                    _react2.default.createElement(
                        _Link2.default,
                        {
                            id: this.props.id,
                            slug: this.props.slug,
                            type: this.props.type
                        },
                        this.props.title
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        this.props.description
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'shrink columns' },
                    _react2.default.createElement(_SubmitButton2.default, {
                        title: _react2.default.createElement('span', { className: 'ion-close', 'aria-label': 'Remove' }),
                        className: 'button small',
                        submitting: this.state.submitting
                    })
                )
            );
        }
    }]);

    return AuthorCard;
}(_react2.default.Component);

exports.default = AuthorCard;