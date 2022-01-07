'use strict';

const logInfo = (date, method, url) => {
  console.log([date, method, url].join('  '));
};

module.exports = { logInfo };