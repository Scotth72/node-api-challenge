const express = require('express');
const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(helmet());

// const actionRouter = require('./routers/actionRouter');
const projectRouter = require('./routers/projectRouter');

// server.use('/actions', actionRouter);
server.use('/projects', projectRouter);

module.exports = server;
