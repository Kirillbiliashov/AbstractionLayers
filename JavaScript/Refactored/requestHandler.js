'use strict';

const fs = require('fs');
const { replyFactory } = require('./reply.js');
const { parseData } = require('./parsing.js');
const { saveToCache } = require('./cache.js');


const getMain = (ip, cookies) => replyFactory([200, {
  'Set-Cookie': 'mycookie=test',
  'Content-Type': 'text/html'
}], `<h1>Welcome</h1>Your IP: ${ip}`, `<pre>${JSON.stringify(cookies)}</pre>`);

const getPerson = (filename, url) => {
  const data = fs.readFileSync(filename);
  const sobj = parseData(data);
  saveToCache(url, sobj);
  return replyFactory([200], null, sobj);
};

const postPerson = (data, filename, url) => {
  try {
    saveToCache(url, data);
    fs.writeFileSync(filename, data);
    return replyFactory([200], null, 'File saved');
  } catch (error) {
    console.dir({ msg: error.message });
    return replyFactory([500], null, 'Write Error');
  }
};

module.exports = { getMain, getPerson, postPerson };