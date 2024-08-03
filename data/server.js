const express = require('express');
const server = express();

server.use(express.json());

server.get('/*', (req, res, next) => {
  next({ status: 404, message: 'Nothing to see here...' });
})

server.use((error, req, res, next) => { // eslint-disable-line
  res.status(error.status).json(error)
})

module.exports = server;