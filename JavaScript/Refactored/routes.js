'use strict'

const { writePerson, getPerson, getMain, error } = require('./controller.js');

const routes = new Map();

const getRoutes = {
    '/': getMain,
    '/person': getPerson
}

const postRoutes = {
    '/person': writePerson
}

routes.set('GET', getRoutes);
routes.set('POST', postRoutes);
routes.set('error', error)

module.exports = { routes }