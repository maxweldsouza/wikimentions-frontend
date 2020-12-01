'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _store = require('store');

var _store2 = _interopRequireDefault(_store);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Affiliate = function Affiliate(_ref) {
    var isbn = _ref.isbn,
        authors = _ref.authors,
        title = _ref.title;

    var country = _store2.default.get('country');
    var searchTerm = void 0;
    if (isbn) {
        searchTerm = isbn;
    } else if (authors.length < 3) {
        searchTerm = title + ' ' + _underscore2.default.map(authors, function (x) {
            return x.props.title;
        }).join(' ');
    } else {
        searchTerm = title;
    }
    return _react2.default.createElement(
        'span',
        null,
        country === 'US' ? _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement(
                'a',
                {
                    className: 'button small alert',
                    target: '_blank',
                    href: 'http://www.amazon.com/gp/search?keywords=' + searchTerm + '&index=books'
                },
                'Buy on Amazon.com',
                ' ',
                _react2.default.createElement('span', { className: 'ion-android-open' })
            )
        ) : null,
        country === 'IN' ? _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement(
                'a',
                {
                    className: 'button small alert',
                    target: '_blank',
                    href: 'http://www.amazon.in/gp/search?keywords=' + searchTerm + '&index=books'
                },
                'Buy on Amazon.in ',
                _react2.default.createElement('span', { className: 'ion-android-open' })
            )
        ) : null
    );
};

exports.default = Affiliate;