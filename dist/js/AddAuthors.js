'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _browserCookies = require('browser-cookies');

var _browserCookies2 = _interopRequireDefault(_browserCookies);

var _snackbar = require('./snackbar');

var _snackbar2 = _interopRequireDefault(_snackbar);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _SubmitButton = require('./SubmitButton');

var _SubmitButton2 = _interopRequireDefault(_SubmitButton);

var _AuthorCard = require('./AuthorCard');

var _AuthorCard2 = _interopRequireDefault(_AuthorCard);

var _Modal = require('./Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _reactAutobind = require('react-autobind');

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddAuthors = function (_React$Component) {
    _inherits(AddAuthors, _React$Component);

    function AddAuthors(props) {
        _classCallCheck(this, AddAuthors);

        var _this = _possibleConstructorReturn(this, (AddAuthors.__proto__ || Object.getPrototypeOf(AddAuthors)).call(this, props));

        (0, _reactAutobind2.default)(_this);
        _this.state = {
            modalIsOpen: false,
            author: '',
            submitting: false,
            authorValid: true,
            authorMessage: '',
            formMessage: ''
        };
        return _this;
    }

    _createClass(AddAuthors, [{
        key: 'onOpenModal',
        value: function onOpenModal(e) {
            this.setState({
                modalIsOpen: true
            });
            e.preventDefault();
        }
    }, {
        key: 'onCloseModal',
        value: function onCloseModal() {
            this.setState({
                modalIsOpen: false
            });
        }
    }, {
        key: 'onChangeAuthor',
        value: function onChangeAuthor(x) {
            this.setState({
                author: x.id
            });
        }
    }, {
        key: 'validateForm',
        value: function validateForm() {
            var valid = true;
            if (!this.state.author) {
                this.setState({
                    authorValid: false,
                    authorMessage: 'No author selected'
                });
                valid = false;
            } else {
                this.setState({
                    authorValid: true,
                    authorMessage: ''
                });
            }
            return valid;
        }
    }, {
        key: 'onSubmit',
        value: function onSubmit(e) {
            var _this2 = this;

            e.preventDefault();
            if (this.validateForm()) {
                var type = void 0;
                if (this.props.type === 'book') {
                    type = 'booksby';
                } else if (this.props.type === 'video') {
                    type = 'videosby';
                }
                _superagent2.default.post('/api/v1/thing/' + this.props.id + '/' + type).type('form').send({
                    author_id: this.state.author,
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
                            formMessage: '',
                            modalIsOpen: false
                        });
                        (0, _snackbar2.default)({ message: 'Added author' });
                        history.pushState(null, null, window.location.pathname + window.location.search);
                        Mentions.route(window.location.pathname + window.location.search);
                    }
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            if (this.state.modalIsOpen) {
                return _react2.default.createElement(
                    _Modal2.default,
                    {
                        isOpen: this.state.modalIsOpen,
                        onClose: this.onCloseModal,
                        className: 'modal-content modal-small',
                        overlayClassName: 'modal-overlay'
                    },
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'h1',
                            null,
                            'Edit Authors'
                        ),
                        this.state.formMessage ? _react2.default.createElement(
                            'div',
                            { className: 'callout alert' },
                            this.state.formMessage
                        ) : null,
                        _react2.default.createElement(
                            'div',
                            { className: 'card-container' },
                            this.props.authors.map(function (x) {
                                return _react2.default.createElement(_AuthorCard2.default, {
                                    key: x.id,
                                    id: x.id,
                                    slug: x.props.slug,
                                    title: x.props.title,
                                    type: x.props.type,
                                    description: x.props.description,
                                    image: x.image,
                                    sourceType: _this3.props.type,
                                    sourceId: _this3.props.id
                                });
                            })
                        ),
                        _react2.default.createElement(
                            'form',
                            { className: 'box', onSubmit: this.onSubmit },
                            'Add Author',
                            _react2.default.createElement(_Select2.default, {
                                name: 'author',
                                onSelectValue: this.onChangeAuthor,
                                valid: this.state.authorValid,
                                message: this.state.authorMessage,
                                types: ['person']
                            }),
                            _react2.default.createElement(
                                'div',
                                { className: 'button-group float-right' },
                                _react2.default.createElement(_SubmitButton2.default, {
                                    title: 'Add',
                                    className: 'button primary',
                                    submitting: this.state.submitting
                                })
                            )
                        )
                    )
                );
            }
            return _react2.default.createElement(
                'span',
                { className: 'edit-links' },
                ' ',
                _react2.default.createElement(
                    'a',
                    { className: 'secondary', onClick: this.onOpenModal },
                    'Edit Authors'
                )
            );
        }
    }]);

    return AddAuthors;
}(_react2.default.Component);

exports.default = AddAuthors;