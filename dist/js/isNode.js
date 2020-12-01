'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var isBrowser = function isBrowser() {
    return typeof window !== 'undefined';
};

var isNode = function isNode() {
    return !isBrowser();
};

exports.default = {
    isNode: isNode,
    isBrowser: isBrowser
};