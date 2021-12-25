'use strict'

const { sendReply } = require('./httpReply');

const cache = () => {
    const data = {}
    return {
        load: ({ url, method }, res) => {
            if (cache[url] && method === 'GET') sendReply(res, [200], null, cache[url])
            else return;
        },
        save: (key, val) => {
            data[key] = val;
        }
    }
}
module.exports = { cache }