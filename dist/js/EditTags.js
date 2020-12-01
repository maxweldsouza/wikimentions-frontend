'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Modal = require('./Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _SubmitButton = require('./SubmitButton');

var _SubmitButton2 = _interopRequireDefault(_SubmitButton);

var _browserCookies = require('browser-cookies');

var _browserCookies2 = _interopRequireDefault(_browserCookies);

var _snackbar = require('./snackbar');

var _snackbar2 = _interopRequireDefault(_snackbar);

var _reactAutobind = require('react-autobind');

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var allTags = ['Science', 'Startups', 'Programming'];

var EditTags = function (_React$Component) {
    _inherits(EditTags, _React$Component);

    _createClass(EditTags, null, [{
        key: 'defaultProps',
        get: function get() {
            return {
                tags: []
            };
        }
    }]);

    function EditTags(props) {
        _classCallCheck(this, EditTags);

        var _this = _possibleConstructorReturn(this, (EditTags.__proto__ || Object.getPrototypeOf(EditTags)).call(this, props));

        (0, _reactAutobind2.default)(_this);
        _this.state = {
            modalIsOpen: false,
            submitting: false,
            formMessage: '',
            tag: ''
        };
        return _this;
    }

    _createClass(EditTags, [{
        key: 'onOpenModal',
        value: function onOpenModal() {
            this.setState({
                modalIsOpen: true
            });
        }
    }, {
        key: 'onCloseModal',
        value: function onCloseModal() {
            this.setState({
                modalIsOpen: false
            });
        }
    }, {
        key: 'onRemoveTag',
        value: function onRemoveTag(tag) {
            var _this2 = this;

            this.setState({
                submitting: true
            });
            _superagent2.default.delete('/api/v1/tag/' + this.props.id).type('form').send({
                tag: tag,
                _xsrf: _browserCookies2.default.get('_xsrf')
            }).end(function (err, res) {
                _this2.setState({
                    submitting: false
                });
                if (err && err.status) {
                    _this2.setState({
                        formMessage: res.body.message
                    });
                } else {
                    _this2.setState({
                        formMessage: ''
                    });
                    (0, _snackbar2.default)({ message: 'Tag removed' });
                    history.pushState(null, null, window.location.pathname + window.location.search);
                    Mentions.route(window.location.pathname + window.location.search);
                }
            });
        }
    }, {
        key: 'onAddTag',
        value: function onAddTag(e) {
            var _this3 = this;

            e.preventDefault();
            this.setState({
                submitting: true
            });
            _superagent2.default.post('/api/v1/tag/' + this.props.id).type('form').send({
                tag: this.state.tag,
                _xsrf: _browserCookies2.default.get('_xsrf')
            }).end(function (err, res) {
                _this3.setState({
                    submitting: false
                });
                if (err && err.status) {
                    _this3.setState({
                        formMessage: res.body.message
                    });
                } else {
                    _this3.setState({
                        formMessage: ''
                    });
                    (0, _snackbar2.default)({ message: 'Tag added' });
                    history.pushState(null, null, window.location.pathname + window.location.search);
                    Mentions.route(window.location.pathname + window.location.search);
                }
            });
        }
    }, {
        key: 'onChangeTag',
        value: function onChangeTag(e) {
            this.setState({
                tag: e.target.value
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            return _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                    'a',
                    {
                        onClick: this.onOpenModal,
                        className: 'tag round secondary hint--right hint--rounded hint--no-animate',
                        'aria-label': 'Edit Tags'
                    },
                    _react2.default.createElement('span', { className: 'ion-edit' })
                ),
                _react2.default.createElement(
                    _Modal2.default,
                    {
                        isOpen: this.state.modalIsOpen,
                        onClose: this.onCloseModal,
                        className: 'modal-content modal-small',
                        overlayClassName: 'modal-overlay'
                    },
                    _react2.default.createElement(
                        'form',
                        { onSubmit: this.onAddTag },
                        _react2.default.createElement(
                            'h1',
                            null,
                            'Edit Tags'
                        ),
                        this.state.formMessage ? _react2.default.createElement(
                            'div',
                            { className: 'callout alert' },
                            this.state.formMessage
                        ) : null,
                        _react2.default.createElement(
                            'p',
                            null,
                            'Tags:',
                            this.props.tags.map(function (x) {
                                return _react2.default.createElement(
                                    'span',
                                    {
                                        className: 'tag round no-margin-bottom',
                                        href: '/tags/' + x,
                                        key: x
                                    },
                                    x,
                                    ' ',
                                    _react2.default.createElement('span', {
                                        onClick: _this4.onRemoveTag.bind(null, x),
                                        className: 'ion-close-circled'
                                    })
                                );
                            })
                        ),
                        _react2.default.createElement(
                            'select',
                            {
                                onChange: this.onChangeTag,
                                value: this.state.tag
                            },
                            _react2.default.createElement(
                                'option',
                                { value: '', disabled: true },
                                'Add Tag...'
                            ),
                            allTags.map(function (x) {
                                return _react2.default.createElement(
                                    'option',
                                    { value: x, key: x },
                                    x
                                );
                            })
                        ),
                        _react2.default.createElement(_SubmitButton2.default, {
                            title: 'Add',
                            className: 'button float-right',
                            submitting: this.state.submitting
                        })
                    )
                )
            );
        }
    }]);

    return EditTags;
}(_react2.default.Component);

exports.default = EditTags;