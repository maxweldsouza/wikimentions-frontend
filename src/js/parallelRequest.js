import request from 'superagent';
import async from 'async';
import _ from 'underscore';
import NProgress from 'nprogress';

const makeRequest = (url, callback) => cb => {
    request
    .get(url)
    .on('progress', () => {
        NProgress.inc();
    })
    .end(cb);
    return;
};

const parallelRequests = {
    get (paths, callback) {
        let i;
        const tasks = [];
        for (i = 0; i < paths.length; i++) {
            tasks.push(makeRequest(paths[i], callback));
        }
        async.parallel(tasks, callback);
    }
};

export default parallelRequests;
