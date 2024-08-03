const express = require('express');
const server = express();
const peopleRouter = require('./people/people-router');

server.use(express.json());
server.use('/api/people', peopleRouter)

server.get('/*', (req, res, next) => {
  next({ status: 404, message: 'Nothing to see here...' });
})

server.use((error, req, res, next) => { // eslint-disable-line
  res.status(error.status).json(error)
})

module.exports = server;