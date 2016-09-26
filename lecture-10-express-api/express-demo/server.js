'use strict';

// npm modules
const morgan = require('morgan');
const express = require('express');
const Router = express.Router;
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('note:server');

// app modules
const Note = require('./model/note');
const storage = require('./lib/storage.js');

// module constants
const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.get('/hello', function(req, res){
  debug('hit route /api/note');
  res.json({msg: 'hello'});
});

app.post('/api/note', jsonParser, function(req, res, next){
  debug('hit route /api/note');
  Note.createNote(req.body)
  .then(note => res.json(note))
  .catch(err => next(err));
});

app.get('/api/note', function(req, res, next){
  debug('hit route GET /api/note');
  Note.fetchNote(req.query.id)
  .then( note => res.json(note))
  .catch( err => next(err));
});

app.use(function(err, req, res, next){
  debug('error middleware');
  console.error(err.message);
  
  if (err.status) {
    res.status(err.status).send(err.name);
    return;
  }

  err = createError(500, err.message);
  res.status(err.status).send(err.name);
});

app.listen(PORT, function(){
  debug(`server up ${PORT}`);
});

