'use strict';

const http = require('http');
const { parseBody, parseCookies } = require('./parsing.js');
const { logInfo } = require('./logging.js');
const { getRouter, postRouter } = require('./routing.js');
const { serveFromCache } = require('./cache.js');
const { replyFactory } = require('./reply.js');

const filename = './person.json';
const PORT = 8000;

http.createServer(async (req, res) => {
  const { url, method, headers, connection } = req;
  const cookies = parseCookies(headers.cookie);

  const date = new Date().toISOString();
  logInfo(date, method, url);

  let reply = serveFromCache(url, method);
  let routes;

  if (method === 'GET') {
    routes = getRouter(connection.remoteAddress, cookies);
  } else {
    const body = [];
    for await (const chunk of req) {
      body.push(chunk);
    }
    const data = parseBody(body);
    routes = postRouter(data);
  };

  const handler = routes[url];
  if (!handler) reply = replyFactory([404], null, 'Page Not found');
  if (!reply) reply = handler(filename, url);

  res.writeHead(...reply['head']);
  if (reply['write']) res.write(reply['write']);
  res.end(reply['end']);

}).listen(PORT);