var $ = require('jquery');
var _ = require('underscore');

var Snackbar = function (options) {
    var defaults = {
        duration: 3000,
        message: '',
        onAction: null,
        showActionButton: false,
        actionText: ''
    }
    defaults = _.extend(defaults, options);

    // Validation
    if (defaults.message.length > 20) {
        console.warn("Snackbar message is too long");
    }

    // DOM Elements
    var action = defaults.showActionButton ? '<span class="snackbar-action">' + defaults.actionText + '</span>' : '';
    var message = '<span class="snackbar-message">' + defaults.message + '</span>'
    var snack = '<div class="snackbar" id="snackbar">' + message + action + '</div>';

    if ($('#snackbar').length) {
        $('#snackbar').replaceWith(snack);
    } else {
        $("body").append(snack);
    }
    $('#snackbar').addClass('showing');
    setTimeout(function () {
        $('#snackbar').removeClass('showing');
    }, defaults.duration);
};

module.exports = Snackbar;
