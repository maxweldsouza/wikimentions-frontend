'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _Thumbnail = require('./Thumbnail');

var _Thumbnail2 = _interopRequireDefault(_Thumbnail);

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _reactAutobind = require('react-autobind');

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Select = function (_React$Component) {
    _inherits(Select, _React$Component);

    function Select(props) {
        _classCallCheck(this, Select);

        var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

        (0, _reactAutobind2.default)(_this);
        _this.loadData = _underscore2.default.throttle(_this.loadData, 1000);
        _this.state = {
            focus: -1,
            editable: true,
            searchText: _this.props.initialLabel ? _this.props.initialLabel : '',
            value: _this.props.initialValue ? _this.props.initialValue : '',
            options: [],
            loading: false,
            error: false,
            visible: false
        };
        return _this;
    }

    _createClass(Select, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            window.addEventListener('click', this._hideDropdown, false);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.removeEventListener('click', this._hideDropdown, false);
        }
    }, {
        key: '_hideDropdown',
        value: function _hideDropdown() {
            this.setState({
                visible: false
            });
        }
    }, {
        key: 'onSearchTextChanged',
        value: function onSearchTextChanged(e) {
            if (this.props.onSearchTextChanged) {
                this.props.onSearchTextChanged(e.target.value);
            }
            if (e.target.value.length > 1) {
                this.loadData(e.target.value);
                this.setState({
                    loading: true,
                    searchText: e.target.value,
                    visible: true,
                    value: ''
                });
            } else if (e.target.value.length >= 0) {
                this.setState({
                    options: [],
                    searchText: e.target.value,
                    visible: false,
                    value: ''
                });
            }
        }
    }, {
        key: 'onSelectValue',
        value: function onSelectValue(x) {
            this.setState({
                options: [],
                searchText: x.props.title,
                editable: false,
                value: x.id,
                visible: false
            });
            if (this.props.onSelectValue) {
                this.props.onSelectValue(x);
            }
        }
    }, {
        key: 'focusNext',
        value: function focusNext() {
            var next = void 0;
            if (this.state.focus >= this.state.options.length - 1) {
                next = -1;
            } else {
                next = this.state.focus + 1;
            }
            this.setState({
                focus: next
            });
        }
    }, {
        key: 'focusPrev',
        value: function focusPrev() {
            var prev = void 0;
            if (this.state.focus <= -1) {
                prev = this.state.options.length - 1;
            } else {
                prev = this.state.focus - 1;
            }
            this.setState({
                focus: prev
            });
        }
    }, {
        key: 'handleKeys',
        value: function handleKeys(event) {
            switch (event.key) {
                case 'ArrowDown':
                    this.focusNext();
                    event.preventDefault();
                    break;
                case 'ArrowUp':
                    this.focusPrev();
                    event.preventDefault();
                    break;
                case 'Enter':
                    if (this.state.focus === -1 && this.props.moreResults) {
                        this.onClickMoreResults();
                    }
                    if (this.state.focus >= 0) {
                        this.onSelectValue(this.state.options[this.state.focus]);
                    }
                    break;
                default:
                    return;
            }
        }
    }, {
        key: 'loadData',
        value: function loadData(x) {
            var _this2 = this;

            var typeQuery = void 0;
            if (this.props.types) {
                typeQuery = '?types=' + this.props.types.join(',');
            } else {
                typeQuery = '';
            }
            if (this.props.autocomplete) {
                _superagent2.default.get('/api/v1/autocomplete/' + encodeURIComponent(x) + typeQuery).end(function (err, res) {
                    if (err && err.status) {
                        _this2.setState({
                            loading: false,
                            options: [],
                            error: true
                        });
                    } else {
                        _this2.setState({
                            loading: false,
                            options: res.body,
                            error: false
                        });
                    }
                });
            } else {
                _superagent2.default.get('/api/v1/search/' + encodeURIComponent(x) + typeQuery).end(function (err, res) {
                    if (err && err.status) {
                        _this2.setState({
                            loading: false,
                            options: [],
                            error: true
                        });
                    } else {
                        _this2.setState({
                            loading: false,
                            options: res.body.results,
                            error: false
                        });
                    }
                });
            }
        }
    }, {
        key: 'onClear',
        value: function onClear() {
            this.setState({
                searchText: '',
                options: [],
                visible: false
            });
        }
    }, {
        key: 'onClickMoreResults',
        value: function onClickMoreResults() {
            var path = '/search?q=' + this.state.searchText;
            this.onClear();
            history.pushState(null, null, path);
            Mentions.route(path);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return _react2.default.createElement(
                'div',
                {
                    style: { position: 'relative', width: '100%', display: 'flex' },
                    onKeyDown: this.handleKeys
                },
                _react2.default.createElement(_Input2.default, {
                    type: 'text',
                    role: 'combobox',
                    'aria-haspopup': true,
                    'aria-expanded': this.state.visible,
                    style: { width: this.props.width },
                    className: 'select-round ' + this.props.className,
                    value: this.state.searchText,
                    valid: this.props.valid,
                    message: this.props.message,
                    placeholder: this.props.placeholder,
                    autoComplete: 'off',
                    spellCheck: 'false',
                    'aria-label': 'Search',
                    autoFocus: this.props.autoFocus,
                    onChange: this.onSearchTextChanged,
                    onKeyDown: this.handleKeys
                }),
                this.state.searchText.length > 0 ? _react2.default.createElement('span', {
                    onClick: this.onClear,
                    className: 'ion-backspace select-clear'
                }) : null,
                _react2.default.createElement('input', {
                    name: this.props.name,
                    type: 'hidden',
                    value: this.state.value,
                    required: this.props.required
                }),
                this.state.visible ? _react2.default.createElement(
                    'div',
                    { className: 'select-options' },
                    !this.state.loading && this.state.options.length === 0 ? _react2.default.createElement(
                        'div',
                        {
                            className: 'select-option select-option-message'
                        },
                        _react2.default.createElement(
                            'span',
                            null,
                            'No results. You can',
                            ' ',
                            _react2.default.createElement(
                                'a',
                                {
                                    href: '/create?title=' + this.state.searchText
                                },
                                'Create'
                            ),
                            ' ',
                            'this page.'
                        )
                    ) : null,
                    this.state.loading && this.state.options.length === 0 ? _react2.default.createElement(
                        'div',
                        {
                            className: 'select-option select-option-message'
                        },
                        'Loading...'
                    ) : null,
                    this.state.options.map(function (entry, i) {
                        var focused = i === _this3.state.focus;
                        focused = focused ? { background: '#f3f3f3' } : {};

                        return _react2.default.createElement(
                            'div',
                            {
                                key: entry.id,
                                className: 'select-option',
                                value: entry.id,
                                style: focused,
                                onClick: _this3.onSelectValue.bind(null, entry)
                            },
                            _react2.default.createElement(
                                'div',
                                { className: 'select-option-image' },
                                _react2.default.createElement(_Thumbnail2.default, {
                                    alt: entry.props.title,
                                    type: entry.props.type,
                                    image: entry.image,
                                    url: entry.props.url,
                                    displayWidth: 50
                                })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: '' },
                                entry.props.title,
                                _react2.default.createElement(
                                    'div',
                                    { className: 'select-option-type' },
                                    entry.props.type === 'person' ? _utils2.default.ellipsis(entry.props.description, 50) : entry.props.type
                                )
                            )
                        );
                    }),
                    this.state.error ? _react2.default.createElement(
                        'div',
                        { className: 'select-option' },
                        'Search failed'
                    ) : null,
                    this.props.moreResults ? _react2.default.createElement(
                        'div',
                        {
                            className: 'select-option select-more-results',
                            onClick: this.onClickMoreResults
                        },
                        _react2.default.createElement(
                            'a',
                            { className: 'secondary' },
                            'More Results'
                        )
                    ) : null
                ) : null
            );
        }
    }]);

    return Select;
}(_react2.default.Component);

Select.defaultProps = {
    autocomplete: true,
    className: '',
    valid: true,
    autoFocus: false,
    message: ''
};

exports.default = Select;