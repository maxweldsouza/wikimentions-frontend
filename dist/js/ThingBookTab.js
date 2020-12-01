'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Book = require('./Book');

var _Book2 = _interopRequireDefault(_Book);

var _AddBook = require('./AddBook');

var _AddBook2 = _interopRequireDefault(_AddBook);

var _Pagination = require('./Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ThingBookTab = function ThingBookTab(_ref) {
    var path = _ref.path,
        id = _ref.id,
        count = _ref.count,
        loggedin = _ref.loggedin,
        books = _ref.books,
        _ref$page = _ref.page,
        page = _ref$page === undefined ? '1' : _ref$page;

    var emptybooks = _react2.default.createElement(
        'div',
        { className: 'card box' },
        _react2.default.createElement(
            'div',
            { className: 'blankslate' },
            _react2.default.createElement('span', { className: 'icon ion-ios-book' }),
            _react2.default.createElement(
                'h3',
                null,
                'No Books'
            ),
            'No books have been added for this author. You can help us by adding some.'
        )
    );
    var nomore = _react2.default.createElement(
        'div',
        { className: 'card box' },
        _react2.default.createElement(
            'div',
            { className: 'blankslate' },
            _react2.default.createElement('span', { className: 'icon ion-ios-book' }),
            _react2.default.createElement(
                'h3',
                null,
                'End of items'
            ),
            'No more books to show.'
        )
    );
    return _react2.default.createElement(
        'div',
        { className: 'card-container' },
        books.map(function (x) {
            return _react2.default.createElement(_Book2.default, {
                key: x.id,
                id: x.id,
                image: x.image,
                type: x.props.type,
                slug: x.props.slug,
                title: x.props.title,
                mentioned_count: x.mentioned_count,
                mentioned_by_count: x.mentioned_by_count,
                isbn: x.isbn,
                isbn13: x.isbn13
            });
        }),
        page === '1' && books.length === 0 ? emptybooks : null,
        page !== '1' && books.length === 0 ? nomore : null,
        _react2.default.createElement(_Pagination2.default, { total: count, path: path, page: page }),
        _react2.default.createElement(
            'div',
            { className: 'card box' },
            _react2.default.createElement(
                'div',
                { className: 'small-12 columns' },
                _react2.default.createElement(_AddBook2.default, { id: id, loggedin: loggedin })
            )
        )
    );
};

exports.default = ThingBookTab;