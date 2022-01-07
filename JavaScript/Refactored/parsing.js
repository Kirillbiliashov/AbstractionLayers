'use strict';

const parseData = (data) => {
  const obj = JSON.parse(data);
  obj.birth = new Date(obj.birth);
  const difference = new Date() - obj.birth;
  obj.age = Math.floor(difference / 31536000000);
  delete obj.birth;
  return JSON.stringify(obj);
};

const parseBody = (body) => {
  let data = Buffer.concat(body).toString();
  const obj = JSON.parse(data);
  if (obj.name) obj.name = obj.name.trim();
  return JSON.stringify(obj);
};

const parseCookies = (cookie) => {
  const cookies = {};
  if (cookie) cookie.split(';').forEach((item) => {
    const parts = item.split('=');
    cookies[(parts[0]).trim()] = (parts[1] || '').trim();
  });
  return cookies;
};


module.exports = { parseData, parseBody, parseCookies };