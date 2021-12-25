'use strict';

const http = require('http');
const { cache } = require('./cache');
const { routes } = require('./routes');

const filename = '../person.json';
const PORT = 8000;

const logRequest = (req) => {
    const date = new Date().toISOString();
    console.log([date, req.method, req.url].join('  '));
}

http.createServer((req, res) => {
    logRequest(req);
    cache().load(req, res);
    const methodRoutes = routes.get(req.method);
    const fn = methodRoutes[req.url] ?? routes.get('error');
    fn(req, res, filename);
}).listen(PORT);
