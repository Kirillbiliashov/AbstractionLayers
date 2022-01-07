'use strict';

const { getMain, getPerson, postPerson } = require('./requestHandler.js');

const getRouter = (ip, cookies) => ({
    '/': getMain.bind(null, ip, cookies),
    '/person': getPerson
});

const postRouter = (data) => ({
  '/person': postPerson.bind(null, data)
});

module.exports = { getRouter, postRouter };