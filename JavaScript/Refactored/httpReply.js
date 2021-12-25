'use strict'

const sendReply = (res, head, write, end) => {
    res.writeHead(...head);
   if (write) res.write(write);
    res.end(end);
}

module.exports = { sendReply }