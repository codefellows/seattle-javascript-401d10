'use strict';

// create the note router
const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('note:note-router');

// app modules
const Note = require('../model/note.js');

// module contants
const noteRouter = new Router();

noteRouter.post('/api/note', jsonParser, function(req, res, next){
  debug('hit route /api/note');
  Note.createNote(req.body)
  .then(note => res.json(note))
  .catch(err => next(err));
});

noteRouter.get('/api/note/:id', function(req, res, next){
  debug('hit route GET /api/note');
  Note.fetchNote(req.params.id)
  .then( note => res.json(note))
  .catch( err => next(err));
});

noteRouter.get('/api/note', function(req, res, next) {
  Note.fetchIDs()
  .then( ids => res.json(ids))
  .catch(next);
});

noteRouter.put('/api/note', jsonParser, function(req, res, next){
  debug('hit route PUT /api/note');

  Note.updateNote(req.query.id, req.body)
  .then(note => res.json(note))
  .catch(next);
});

module.exports = noteRouter;
