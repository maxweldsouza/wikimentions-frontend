'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _browserCookies = require('browser-cookies');

var _browserCookies2 = _interopRequireDefault(_browserCookies);

var _isNode = require('./isNode');

var _isNode2 = _interopRequireDefault(_isNode);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AdminOnly = function AdminOnly(_ref) {
    var children = _ref.children;

    var admin = void 0;
    if (_isNode2.default.isBrowser()) {
        admin = _browserCookies2.default.get(_config2.default.admin);
    }
    if (admin) {
        return children;
    }
    return null;
};

exports.default = AdminOnly;