'use strict';

const replyFactory = (head, write, end) => ({ head, write, end });

module.exports = { replyFactory };