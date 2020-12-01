'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Share = function Share(_ref) {
    var title = _ref.title,
        path = _ref.path;

    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            'div',
            { className: 'button-group small' },
            _react2.default.createElement(
                'a',
                {
                    role: 'button',
                    href: 'http://www.facebook.com/sharer/sharer.php?u=' + _config2.default.url + path + '&title=' + title,
                    className: 'button',
                    style: { background: '#3b5998' }
                },
                _react2.default.createElement('span', { className: 'ion-social-facebook' }),
                ' Share'
            ),
            _react2.default.createElement(
                'a',
                {
                    role: 'button',
                    href: 'http://twitter.com/intent/tweet?status=' + title + '+' + _config2.default.url + path,
                    className: 'button',
                    style: { background: '#55aace' }
                },
                _react2.default.createElement('span', { className: 'ion-social-twitter' }),
                ' Tweet'
            )
        )
    );
};

exports.default = Share;