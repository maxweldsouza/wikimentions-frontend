'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Link = require('./Link');

var _Link2 = _interopRequireDefault(_Link);

var _Time = require('./Time');

var _Time2 = _interopRequireDefault(_Time);

var _Markdown = require('./Markdown');

var _Markdown2 = _interopRequireDefault(_Markdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HistoryItem = function (_React$Component) {
    _inherits(HistoryItem, _React$Component);

    function HistoryItem() {
        _classCallCheck(this, HistoryItem);

        return _possibleConstructorReturn(this, (HistoryItem.__proto__ || Object.getPrototypeOf(HistoryItem)).apply(this, arguments));
    }

    _createClass(HistoryItem, [{
        key: 'render',
        value: function render() {
            var added = this.props.deleted === 1 ? 'deleted by' : 'added by';
            var item = void 0;
            var type = void 0;
            if (this.props.entry && this.props.entrytype === 'video_author') {
                type = 'Author';
                item = _react2.default.createElement(
                    'span',
                    { className: 'row' },
                    _react2.default.createElement(
                        'span',
                        { className: 'small-12 columns' },
                        'Author: ',
                        _react2.default.createElement(
                            _Link2.default,
                            {
                                id: this.props.entry.source.id,
                                slug: this.props.entry.source.props.slug,
                                type: this.props.entry.source.props.type
                            },
                            this.props.entry.source.props.title
                        )
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'small-12 columns' },
                        'Video: ',
                        _react2.default.createElement(
                            _Link2.default,
                            {
                                id: this.props.entry.destination.id,
                                slug: this.props.entry.destination.props.slug,
                                type: this.props.entry.destination.props.type
                            },
                            this.props.entry.destination.props.title
                        )
                    )
                );
            } else if (this.props.entry && this.props.entrytype === 'book_author') {
                type = 'Author';
                item = _react2.default.createElement(
                    'span',
                    { className: 'row' },
                    _react2.default.createElement(
                        'span',
                        { className: 'small-12 columns' },
                        'Book: ',
                        _react2.default.createElement(
                            _Link2.default,
                            {
                                id: this.props.entry.destination.id,
                                slug: this.props.entry.destination.props.slug,
                                type: this.props.entry.destination.props.type
                            },
                            this.props.entry.destination.props.title
                        )
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'small-12 columns' },
                        'Author: ',
                        _react2.default.createElement(
                            _Link2.default,
                            {
                                id: this.props.entry.source.id,
                                slug: this.props.entry.source.props.slug,
                                type: this.props.entry.source.props.type
                            },
                            this.props.entry.source.props.title
                        )
                    )
                );
            } else if (this.props.entry && this.props.entrytype === 'prop') {
                type = 'Property';
                item = _react2.default.createElement(
                    'span',
                    { className: 'row' },
                    _react2.default.createElement(
                        'span',
                        { className: 'small-12 columns' },
                        'Page: ',
                        _react2.default.createElement(
                            _Link2.default,
                            {
                                id: this.props.entry.obj.id,
                                slug: this.props.entry.obj.props.slug,
                                type: this.props.entry.obj.props.type
                            },
                            this.props.entry.obj.props.title
                        )
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'small-12 columns' },
                        this.props.entry.key,
                        ': ',
                        this.props.entry.value
                    )
                );
            } else if (this.props.entry && this.props.entrytype === 'mention') {
                type = 'Mention';
                item = _react2.default.createElement(
                    'span',
                    { className: 'row' },
                    _react2.default.createElement(
                        'span',
                        { className: 'small-12 columns' },
                        'Mentioned by: ',
                        _react2.default.createElement(
                            _Link2.default,
                            {
                                id: this.props.entry.mentioned_by.id,
                                slug: this.props.entry.mentioned_by.props.slug,
                                type: this.props.entry.mentioned_by.props.type
                            },
                            this.props.entry.mentioned_by.props.title
                        )
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'small-12 columns' },
                        'Mentioned: ',
                        _react2.default.createElement(
                            _Link2.default,
                            {
                                id: this.props.entry.mentioned.id,
                                slug: this.props.entry.mentioned.props.slug,
                                type: this.props.entry.mentioned.props.type
                            },
                            this.props.entry.mentioned.props.title
                        )
                    ),
                    this.props.entry.mentioned_in ? _react2.default.createElement(
                        'span',
                        { className: 'small-12 columns' },
                        'Mentioned In: ',
                        _react2.default.createElement(
                            _Link2.default,
                            {
                                id: this.props.entry.mentioned_in.id,
                                slug: this.props.entry.mentioned_in.props.slug,
                                type: this.props.entry.mentioned_in.props.type
                            },
                            this.props.entry.mentioned_in.props.title
                        )
                    ) : null,
                    this.props.entry.reference ? _react2.default.createElement(
                        'span',
                        { className: 'small-12 columns' },
                        'Reference: ',
                        _react2.default.createElement(
                            'a',
                            {
                                className: 'secondary',
                                style: { fontWeight: 'bold' },
                                href: this.props.entry.reference
                            },
                            this.props.entry.reference
                        )
                    ) : null
                );
            } else if (this.props.entry && this.props.entrytype === 'image') {
                type = 'Image';
                item = _react2.default.createElement(
                    'span',
                    { className: 'row' },
                    _react2.default.createElement(
                        'span',
                        { className: 'small-12 columns' },
                        _react2.default.createElement(
                            _Link2.default,
                            {
                                id: this.props.entry.id,
                                slug: this.props.entry.slug,
                                type: this.props.entry.type
                            },
                            this.props.entry.title
                        )
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'shrink columns' },
                        _react2.default.createElement('img', {
                            src: 'https://d198s6k47dh00z.cloudfront.net/' + this.props.entry.thumb_md5 + '-' + this.props.entry.thumb_width + '-' + this.props.entry.thumb_height + '.jpg'
                        })
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'columns' },
                        _react2.default.createElement(
                            'strong',
                            null,
                            'Description:'
                        ),
                        ' ',
                        _react2.default.createElement(_Markdown2.default, { markdown: this.props.entry.description })
                    )
                );
            } else if (this.props.entry && this.props.entrytype === 'tag') {
                type = 'Tag';
                item = _react2.default.createElement(
                    'span',
                    { className: 'row' },
                    _react2.default.createElement(
                        'span',
                        { className: 'small-12 columns' },
                        'Page: ',
                        _react2.default.createElement(
                            _Link2.default,
                            {
                                id: this.props.entry.obj.id,
                                slug: this.props.entry.obj.props.slug,
                                type: this.props.entry.obj.props.type
                            },
                            this.props.entry.obj.props.title
                        )
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'small-12 columns' },
                        'Tag: ',
                        this.props.entry.tag
                    )
                );
            } else if (this.props.entry && this.props.entrytype === 'quote') {
                type = 'Quote';
                item = _react2.default.createElement(
                    'span',
                    { className: 'row' },
                    _react2.default.createElement(
                        'span',
                        { className: 'small-12 columns' },
                        'Page: ',
                        _react2.default.createElement(
                            _Link2.default,
                            {
                                id: this.props.entry.obj.id,
                                slug: this.props.entry.obj.props.slug,
                                type: this.props.entry.obj.props.type
                            },
                            this.props.entry.obj.props.title
                        )
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'small-12 columns' },
                        'Quote: ',
                        this.props.entry.quote
                    )
                );
            } else if (this.props.entry && this.props.entrytype === 'list') {
                type = 'List';
                item = _react2.default.createElement(
                    'span',
                    { className: 'row' },
                    _react2.default.createElement(
                        'span',
                        { className: 'small-12 columns' },
                        'List: ',
                        _react2.default.createElement(
                            'a',
                            {
                                href: '/lists/' + this.props.entry.id + '/' + this.props.entry.slug
                            },
                            this.props.entry.title
                        )
                    )
                );
            } else if (this.props.entry && this.props.entrytype === 'list_item') {
                type = 'List Item';
                item = _react2.default.createElement(
                    'span',
                    { className: 'row' },
                    _react2.default.createElement(
                        'span',
                        { className: 'small-12 columns' },
                        'Item: ',
                        _react2.default.createElement(
                            _Link2.default,
                            {
                                id: this.props.entry.obj.id,
                                slug: this.props.entry.obj.props.slug,
                                type: this.props.entry.obj.props.type
                            },
                            this.props.entry.obj.props.title
                        ),
                        _react2.default.createElement(
                            'div',
                            null,
                            'List: ',
                            _react2.default.createElement(
                                'a',
                                {
                                    href: '/lists/' + this.props.entry.list.id + '/' + this.props.entry.list.slug
                                },
                                this.props.entry.list.title
                            )
                        )
                    )
                );
            }
            return _react2.default.createElement(
                'div',
                { className: 'small-12 columns' },
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'span',
                        { className: 'small-8 columns' },
                        _react2.default.createElement(
                            'strong',
                            { style: { fontSize: 17 } },
                            type
                        ),
                        ' ',
                        added,
                        ' ',
                        _react2.default.createElement(
                            'strong',
                            null,
                            this.props.username ? _react2.default.createElement(
                                'a',
                                {
                                    className: '',
                                    rel: 'nofollow',
                                    href: '/users/' + this.props.user + '/' + this.props.username
                                },
                                this.props.username
                            ) : this.props.ip
                        )
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'small-4 columns text-right' },
                        _react2.default.createElement(_Time2.default, {
                            timestamp: this.props.timestamp,
                            type: 'ago',
                            hintDirection: 'bottom-left'
                        })
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'small-12 columns' },
                        item
                    )
                ),
                _react2.default.createElement('hr', null)
            );
        }
    }]);

    return HistoryItem;
}(_react2.default.Component);

exports.default = HistoryItem;