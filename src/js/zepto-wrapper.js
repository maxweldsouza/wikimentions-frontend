if (typeof window !== 'undefined') {
    var zepto = require('./zepto-1.1.6');
    module.exports = window.$;
} else {
    module.exports = {};
}
