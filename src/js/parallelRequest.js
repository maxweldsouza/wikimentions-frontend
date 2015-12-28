var request = require('superagent');
var async = require('async');
var _ = require('underscore');

var makeRequest = function (url, callback) {
    return function (cb) {
        request.get(url)
        .end(cb);
        return;
    };
};

var parallelRequests = {
    get (paths, callback) {
        var i;
        var tasks = [];
        for (i = 0; i < paths.length; i++) {
            tasks.push(makeRequest(paths[i], callback));
        }
        async.parallel(tasks, callback);
    }
};

module.exports = parallelRequests;
