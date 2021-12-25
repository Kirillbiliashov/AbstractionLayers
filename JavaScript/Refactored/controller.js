'use strict'

const fs = require('fs');
const { parseBody, parseData, parseCookie } = require('./parse.js');
const {cache} = require('./cache');
const { sendReply } = require('./httpReply');

const getMain = (req, res) => sendReply(res, [200, {
    'Set-Cookie': 'mycookie=test',
    'Content-Type': 'text/html'
}], `<h1>Welcome</h1>Your IP: ${req.connection.remoteAddress}`, `<pre>${JSON.stringify(parseCookie(req.headers.cookie))}</pre>`);

const getPerson = (req, res, filename) => {
    fs.readFile(filename, (err, data) => {
        if (!err) {
            const obj = parseData(data);
            cache().save(req.url, obj);
            sendReply(res, [200], null, obj);
        } else {
            sendReply(res, [500], null, 'read Error');
        }
    });
}

const writePerson = (req, res, filename) => {
    const body = [];
    req.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        const data = parseBody(body);
            fs.writeFile(filename, data, (err) => {
            if (!err) {
                sendReply(res, [200], null, 'File saved');
            } else {
                sendReply(res, [500], null, 'Write Error');
            }
        });  
    });
}

const error = (req, res) => {
    sendReply(res, [404], null, 'page not found')
}

module.exports = { getPerson, writePerson, getMain, error }