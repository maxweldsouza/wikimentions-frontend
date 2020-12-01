'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var addNofollow = function addNofollow(str) {
    if (str.includes('rel="nofollow"')) {
        return str;
    }
    return str.replace(new RegExp('(<a\s*(?!.*rel=)[^>]*)(href="https?://)((?!wikimentions.com)[^"]+)"([^>]*)>'), '$1$2$3"$4 rel="nofollow">');
};

exports.default = addNofollow;