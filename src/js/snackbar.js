import $ from 'jquery';
import _ from 'underscore';
import isNode from './isNode';

const snackbar = (() => {
    let visible = false;
    if (isNode.isBrowser()) {
        $('body').append('<div class="snackbar" id="snackbar"><span class="snackbar-message" id="snackbar-message"></span></div>');
    }
    let i = 0;
    return options => {
        let defaults = {
            animationDuration: 200,
            duration: 3000,
            message: ''
        };
        defaults = _.extend(defaults, options);

        const message = `<span class="snackbar-message">${defaults.message}</span>`;
        i = i + 1;
        const j = i;
        if (visible) {
            $('#snackbar').removeClass('showing');
            visible = false;
            setTimeout(() => {
                $('.snackbar-message').replaceWith(message);
                $('#snackbar').addClass('showing');
                visible = true;
                setTimeout(() => {
                    if (i === j) {
                        $('#snackbar').removeClass('showing');
                        visible = false;
                    }
                }, defaults.duration);
            }, defaults.animationDuration);
        } else {
            $('.snackbar-message').replaceWith(message);
            $('#snackbar').addClass('showing');
            visible = true;
            setTimeout(() => {
                if (i === j) {
                    $('#snackbar').removeClass('showing');
                    visible = false;
                }
            }, defaults.duration);
        }
    };
})();


export default snackbar;
