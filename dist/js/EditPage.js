'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AdminOnly = require('./AdminOnly');

var _AdminOnly2 = _interopRequireDefault(_AdminOnly);

var _ButtonSelect = require('./ButtonSelect');

var _ButtonSelect2 = _interopRequireDefault(_ButtonSelect);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _browserCookies = require('browser-cookies');

var _browserCookies2 = _interopRequireDefault(_browserCookies);

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _ImageUpload = require('./ImageUpload');

var _ImageUpload2 = _interopRequireDefault(_ImageUpload);

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _LoginModal = require('./LoginModal');

var _LoginModal2 = _interopRequireDefault(_LoginModal);

var _SignupModal = require('./SignupModal');

var _SignupModal2 = _interopRequireDefault(_SignupModal);

var _Modal = require('./Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _Navbar = require('./Navbar');

var _Navbar2 = _interopRequireDefault(_Navbar);

var _PageBar = require('./PageBar');

var _PageBar2 = _interopRequireDefault(_PageBar);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _Restricted = require('./Restricted');

var _Restricted2 = _interopRequireDefault(_Restricted);

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

var EditPage = function (_React$Component) {
    _inherits(EditPage, _React$Component);

    _createClass(EditPage, null, [{
        key: 'resources',
        value: function resources(appstate) {
            var _appstate$path$split = appstate.path.split('/'),
                _appstate$path$split2 = _slicedToArray(_appstate$path$split, 3),
                type = _appstate$path$split2[0],
                id = _appstate$path$split2[1],
                slug = _appstate$path$split2[2];

            var queryObj = {};
            if (appstate.query.page) {
                queryObj.page = appstate.query.page;
            }
            queryObj.slug = slug;
            var query = _queryString2.default.stringify(queryObj);
            query = query ? '?' + query : '';
            return {
                api: [{
                    name: 'thing',
                    path: '/api/v1/thing/' + id + query
                }]
            };
        }
    }]);

    function EditPage(props) {
        _classCallCheck(this, EditPage);

        var _this = _possibleConstructorReturn(this, (EditPage.__proto__ || Object.getPrototypeOf(EditPage)).call(this, props));

        (0, _reactAutobind2.default)(_this);
        _this.state = {
            type: _this.props.data.thing.props.type,
            title: _this.props.data.thing.props.title,
            titleValid: true,
            titleMessage: '',
            description: _this.props.data.thing.props.description,
            isbn: _this.props.data.thing.props.isbn,
            isbn13: _this.props.data.thing.props.isbn13,
            url: _this.props.data.thing.props.url,
            urlValid: true,
            urlMessage: '',
            submitting: false,
            formMessage: '',
            confirmDelete: false,
            modalIsOpen: false
        };
        return _this;
    }

    _createClass(EditPage, [{
        key: 'onChangeType',
        value: function onChangeType(x) {
            this.setState({
                type: x
            });
        }
    }, {
        key: 'onToggleConfirm',
        value: function onToggleConfirm() {
            this.setState({
                confirmDelete: !this.state.confirmDelete
            });
        }
    }, {
        key: 'onChangeText',
        value: function onChangeText(e) {
            var temp = {
                error: false,
                message: ''
            };
            temp[e.target.name] = e.target.value;
            this.setState(temp);
        }
    }, {
        key: 'onClear',
        value: function onClear(name) {
            var temp = {};
            temp[name] = '';
            this.setState(temp);
        }
    }, {
        key: 'validateForm',
        value: function validateForm() {
            var valid = true;
            if (!this.state.title) {
                this.setState({
                    titleValid: false,
                    titleMessage: 'Title cannot be empty'
                });
                valid = false;
            }
            if (this.state.type === 'video' && !this.state.url) {
                this.setState({
                    urlValid: false,
                    urlMessage: 'Url cannot be empty'
                });
                valid = false;
            }
            return valid;
        }
    }, {
        key: 'onSubmit',
        value: function onSubmit(e) {
            var _this2 = this;

            e.preventDefault();
            var id = Number(this.props.path.split('/')[1]);
            if (this.validateForm()) {
                this.setState({
                    submitting: true,
                    formMessage: ''
                });
                var data = {
                    title: this.state.title,
                    description: this.state.description,
                    type: this.state.type,
                    _xsrf: _browserCookies2.default.get('_xsrf')
                };
                if (this.state.type === 'book') {
                    data.isbn = this.state.isbn;
                    data.isbn13 = this.state.isbn13;
                } else if (this.state.type === 'video' || this.state.type === 'person') {
                    data.url = this.state.url;
                }
                _superagent2.default.put('/api/v1/thing/' + id).type('form').send(data).end(function (err, res) {
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
                        (0, _snackbar2.default)({ message: 'Changes saved' });
                        history.pushState(null, null, res.body.redirect);
                        Mentions.route(res.body.redirect);
                    }
                });
            }
        }
    }, {
        key: 'onDeletePage',
        value: function onDeletePage(e) {
            var _this3 = this;

            e.preventDefault();
            var id = Number(this.props.path.split('/')[1]);
            this.setState({
                submitting: true
            });
            var data = {
                _xsrf: _browserCookies2.default.get('_xsrf')
            };
            _superagent2.default.delete('/api/v1/thing/' + id).type('form').send(data).end(function (err, res) {
                _this3.setState({
                    submitting: false
                });
                if (err && err.status) {
                    (0, _snackbar2.default)({ message: res.body.message });
                } else {
                    (0, _snackbar2.default)({ message: 'Page deleted' });
                    history.pushState(null, null, res.body.redirect);
                    Mentions.route(res.body.redirect);
                }
            });
        }
    }, {
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
            this.setState({ modalIsOpen: false });
        }
    }, {
        key: 'render',
        value: function render() {
            var id = Number(this.props.path.split('/')[1]);
            var entry = this.props.data.thing;
            var options = [{ name: 'Person', value: 'person' }, { name: 'Book', value: 'book' }, { name: 'Video', value: 'video' }];
            var loggedOutMessage = _react2.default.createElement(
                'span',
                null,
                'You need to ',
                _react2.default.createElement(_LoginModal2.default, null),
                ' / ',
                _react2.default.createElement(_SignupModal2.default, null),
                ' to edit a page.'
            );
            return _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(_reactHelmet2.default, {
                    title: 'Edit - ' + entry.props.title,
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
                            'h1',
                            null,
                            'Edit - ' + entry.props.title
                        ),
                        _react2.default.createElement(_PageBar2.default, {
                            id: id,
                            slug: entry.props.slug,
                            type: entry.props.type
                        }),
                        _react2.default.createElement(
                            _Restricted2.default,
                            {
                                message: loggedOutMessage,
                                min_level: 1,
                                loggedin: this.props.loggedin
                            },
                            _react2.default.createElement(
                                'div',
                                { className: 'callout' },
                                _react2.default.createElement(
                                    'a',
                                    { onClick: this.onOpenModal },
                                    'Upload'
                                ),
                                ' an image for this page.'
                            ),
                            _react2.default.createElement(
                                _Modal2.default,
                                {
                                    isOpen: this.state.modalIsOpen,
                                    onClose: this.onCloseModal,
                                    className: 'modal-content',
                                    overlayClassName: 'modal-overlay'
                                },
                                _react2.default.createElement(_ImageUpload2.default, {
                                    title: entry.props.title,
                                    type: entry.props.type,
                                    id: id,
                                    width: 250,
                                    height: 250,
                                    onClose: this.onCloseModal
                                })
                            ),
                            _react2.default.createElement(
                                'form',
                                { onSubmit: this.onSubmit },
                                this.state.formMessage ? _react2.default.createElement(
                                    'div',
                                    { className: 'callout alert' },
                                    this.state.formMessage
                                ) : null,
                                'Type',
                                _react2.default.createElement(_ButtonSelect2.default, {
                                    name: 'type',
                                    'default': this.props.data.thing.props.type,
                                    options: options,
                                    onChange: this.onChangeType
                                }),
                                'Title',
                                _react2.default.createElement(_Input2.default, {
                                    type: 'text',
                                    name: 'title',
                                    value: this.state.title,
                                    onChange: this.onChangeText,
                                    onClear: this.onClear,
                                    valid: this.state.titleValid,
                                    message: this.state.titleMessage
                                }),
                                this.state.type === 'video' ? _react2.default.createElement(
                                    'span',
                                    null,
                                    'Url',
                                    _react2.default.createElement(_Input2.default, {
                                        type: 'text',
                                        name: 'url',
                                        value: this.state.url,
                                        onChange: this.onChangeText,
                                        onClear: this.onClear,
                                        valid: this.state.urlValid,
                                        message: this.state.urlMessage
                                    })
                                ) : null,
                                this.state.type === 'person' ? _react2.default.createElement(
                                    'span',
                                    null,
                                    'Description (Optional)',
                                    _react2.default.createElement(_Input2.default, {
                                        type: 'text',
                                        name: 'description',
                                        value: this.state.description,
                                        onChange: this.onChangeText,
                                        onClear: this.onClear
                                    })
                                ) : null,
                                this.state.type === 'person' ? _react2.default.createElement(
                                    'span',
                                    null,
                                    'Url (Optional)',
                                    _react2.default.createElement(_Input2.default, {
                                        type: 'text',
                                        name: 'url',
                                        value: this.state.url,
                                        onChange: this.onChangeText,
                                        onClear: this.onClear,
                                        valid: this.state.urlValid,
                                        placeholder: 'http://',
                                        message: this.state.urlMessage
                                    })
                                ) : null,
                                this.state.type === 'book' ? _react2.default.createElement(
                                    'span',
                                    null,
                                    'ISBN',
                                    _react2.default.createElement(_Input2.default, {
                                        type: 'text',
                                        name: 'isbn',
                                        value: this.state.isbn,
                                        onChange: this.onChangeText,
                                        onClear: this.onClear
                                    })
                                ) : null,
                                this.state.type === 'book' ? _react2.default.createElement(
                                    'span',
                                    null,
                                    'ISBN-13',
                                    _react2.default.createElement(_Input2.default, {
                                        type: 'text',
                                        name: 'isbn13',
                                        value: this.state.isbn13,
                                        onChange: this.onChangeText,
                                        onClear: this.onClear
                                    })
                                ) : null,
                                _react2.default.createElement(_SubmitButton2.default, {
                                    title: 'Save',
                                    className: 'button primary float-right',
                                    submitting: this.state.submitting
                                })
                            ),
                            _react2.default.createElement(
                                _AdminOnly2.default,
                                null,
                                _react2.default.createElement(
                                    'form',
                                    { onSubmit: this.onDeletePage },
                                    _react2.default.createElement('hr', null),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'row align-middle' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'small-6 columns' },
                                            _react2.default.createElement(
                                                'label',
                                                null,
                                                _react2.default.createElement('input', {
                                                    type: 'checkbox',
                                                    onChange: this.onToggleConfirm,
                                                    onClear: this.onClear
                                                }),
                                                'I\'m sure'
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'small-6 columns' },
                                            _react2.default.createElement(_SubmitButton2.default, {
                                                title: 'Delete Page',
                                                className: 'button primary float-right',
                                                confirm: this.state.confirmDelete,
                                                submitting: this.state.submitting
                                            })
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

    return EditPage;
}(_react2.default.Component);

exports.default = EditPage;