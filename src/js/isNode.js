var isBrowser = function () {
    return typeof window !== 'undefined';
};

var isNode = function () {
    return !isBrowser();
};

module.exports = {
    isNode: isNode,
    isBrowser: isBrowser
};
