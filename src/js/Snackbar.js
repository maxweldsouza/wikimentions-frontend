var $ = require('jquery');
var _ = require('underscore');
var isNode = require('./isNode');

var Snackbar = function () {
    var visible = false;
    if (isNode.isBrowser()) {
        $('body').append('<div class="snackbar" id="snackbar"><span class="snackbar-message" id="snackbar-message"></span></div>');
    }
    var i = 0;
    return function (options) {
        var defaults = {
            animationDuration: 200,
            duration: 3000,
            message: '',
        };
        defaults = _.extend(defaults, options);

        // Validation
        if (defaults.message.length > 20) {
            console.warn('Snackbar message is too long');
        }

        var message = '<span class="snackbar-message">' + defaults.message + '</span>';
        i = i + 1;
        var j = i;
        if (visible) {
            $('#snackbar').removeClass('showing');
            visible = false;
            setTimeout(function () {
                $('.snackbar-message').replaceWith(message);
                $('#snackbar').addClass('showing');
                visible = true;
                setTimeout(function () {
                    if (i == j) {
                        $('#snackbar').removeClass('showing');
                        visible = false;
                    }
                }, defaults.duration);
            }, defaults.animationDuration);
        } else {
            $('.snackbar-message').replaceWith(message);
            $('#snackbar').addClass('showing');
            visible = true;
            setTimeout(function () {
                if (i == j) {
                    $('#snackbar').removeClass('showing');
                    visible = false;
                }
            }, defaults.duration);
        }
    };
}();


module.exports = Snackbar;
