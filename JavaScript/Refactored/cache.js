'use strict';

const { replyFactory } = require('./reply.js');

const cache = {};

const serveFromCache = (url, method) => {
  if (cache[url] && method === 'GET') return replyFactory([200], null, cache[url]);
  return null;
};

const saveToCache = (url, data) => {
  cache[url] = data;
}

module.exports = { serveFromCache, saveToCache };