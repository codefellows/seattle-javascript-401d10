'use strict';

// npm modules
const morgan = require('morgan');
const express = require('express');
const createError = require('http-errors');
const debug = require('debug')('note:server');

// app modules
const cors = require('./lib/cors-middleware.js');
const noteRouter = require('./route/note-router.js');
const errorMiddleware = require('./lib/error-middleware.js');

// module constants
const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));
app.use(cors);

// register routes
app.use(noteRouter);
app.use(errorMiddleware);

app.listen(PORT, function(){
  debug(`server up ${PORT}`);
});

