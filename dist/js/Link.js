'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Link = function Link(_ref) {
    var type = _ref.type,
        tab = _ref.tab,
        id = _ref.id,
        slug = _ref.slug,
        className = _ref.className,
        children = _ref.children;

    var pagepath = void 0;
    var defaultTab = void 0;
    if (type === 'video') {
        pagepath = '/videos/';
        defaultTab = 'mentioned';
    } else if (type === 'book') {
        pagepath = '/books/';
        defaultTab = 'mentioned';
    } else if (type === 'person') {
        pagepath = '/people/';
        defaultTab = 'videos';
    } else {
        throw new Error('No page type specified');
    }

    var finaltab = tab ? tab : defaultTab;
    var href = void 0;
    var nofollow = false;
    if (['edit', 'discuss', 'history'].includes(finaltab)) {
        href = '/' + finaltab + '/' + id + '/' + slug;
        nofollow = true;
    } else if (finaltab !== defaultTab) {
        href = pagepath + id + '/' + slug + '/' + finaltab;
    } else {
        href = pagepath + id + '/' + slug;
    }
    if (nofollow) {
        return _react2.default.createElement(
            'a',
            { rel: 'nofollow', className: className, href: href },
            children
        );
    }
    return _react2.default.createElement(
        'a',
        { className: className, href: href },
        children
    );
};

exports.default = Link;