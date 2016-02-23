var addNofollow = function (str) {
    if (str.indexOf('rel="nofollow"') >= 0) {
        return str;
    }
    return str.replace(new RegExp('(<a\s*(?!.*rel=)[^>]*)(href="https?://)((?!mentionhub.com)[^"]+)"([^>]*)>'), '$1$2$3"$4 rel="nofollow">');
};

module.exports = addNofollow;
