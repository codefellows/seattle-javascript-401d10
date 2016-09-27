'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('note:note');
const storage = require('../lib/storage.js');

const Note = module.exports = function(name, content){
  debug('instatiate note');
  if (!name) throw createError(400, 'expected name');
  if (!content) throw createError(400, 'expected content');

  this.id = uuid.v1()
  this.name = name;
  this.content = content;
};

Note.createNote = function(_note) {
  debug('createNote');
    try {
      let note = new Note(_note.name, _note.content);
      return storage.createItem('note', note)
    } catch (err) {
      return Promise.reject(err);
    }
};

Note.fetchNote = function(id){
  debug('fetchNote');
  return storage.fetchItem('note', id);
};

Note.updateNote = function(id, _note){
  debug('fetchNote');
  return storage.fetchItem('note', id)
  .catch( err => Promise.reject(createError(404, err.message)))
  .then( note => {
    for (var key in note){
      if (key === 'id') continue;
      if (_note[key]) note[key] = _note[key];
    }
    return storage.createItem('note', note);
  });
};

Note.deleteNote = function(id){
  debug('deleteNote');
  return storage.deleteItem('note', id);
};


Note.fetchIDs = function(){
  debug('fetchIDs');
  return storage.availIDs('note');
};



