'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _isNode = require('./isNode');

var _isNode2 = _interopRequireDefault(_isNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var snackbar = function () {
    var visible = false;
    if (_isNode2.default.isBrowser()) {
        (0, _jquery2.default)('body').append('<div class="snackbar" id="snackbar"><span class="snackbar-message" id="snackbar-message"></span></div>');
    }
    var i = 0;
    return function (options) {
        var defaults = {
            animationDuration: 200,
            duration: 3000,
            message: ''
        };
        defaults = _underscore2.default.extend(defaults, options);

        var message = '<span class="snackbar-message">' + defaults.message + '</span>';
        i += 1;
        var j = i;
        if (visible) {
            (0, _jquery2.default)('#snackbar').removeClass('showing');
            visible = false;
            setTimeout(function () {
                (0, _jquery2.default)('.snackbar-message').replaceWith(message);
                (0, _jquery2.default)('#snackbar').addClass('showing');
                visible = true;
                setTimeout(function () {
                    if (i === j) {
                        (0, _jquery2.default)('#snackbar').removeClass('showing');
                        visible = false;
                    }
                }, defaults.duration);
            }, defaults.animationDuration);
        } else {
            (0, _jquery2.default)('.snackbar-message').replaceWith(message);
            (0, _jquery2.default)('#snackbar').addClass('showing');
            visible = true;
            setTimeout(function () {
                if (i === j) {
                    (0, _jquery2.default)('#snackbar').removeClass('showing');
                    visible = false;
                }
            }, defaults.duration);
        }
    };
}();

exports.default = snackbar;