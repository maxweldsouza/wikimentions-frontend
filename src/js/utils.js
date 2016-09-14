var _ = require('underscore');

var ellipsis = function (s, max) {
    if (_.isString(s) && s.length > max) {
        return s.substring(0, max - 3) + '...';
    }
    return s;
};

module.exports = {
    ellipsis: ellipsis
};
