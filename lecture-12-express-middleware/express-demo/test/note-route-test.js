'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Note = require('../model/note.js');
const url = 'http://localhost:3000';

// start server
require('../server.js');

const exampleNote = {
  name: 'example',
  content: 'demo text',
};

describe('testing note route', function(){
  describe('testing GET requiests to /api/note', function(){
    describe('with valid id', function(){
      // mock the note for the test
      before(done => {
        Note.createNote(exampleNote)
        .then(note => {
          this.tempNote = note;
          done();
        })
        .catch(err => done(err));
      });

      // clean up the mocked note
      after(done => {
        Note.deleteNote(this.tempNote.id)
        .then(() => done())
        .catch(err => done(err));
      });

      it('should return a note', done => {
        request.get(`${url}/api/note/${this.tempNote.id}`)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempNote.id);
          expect(res.body.name).to.equal(this.tempNote.name);
          expect(res.body.content).to.equal(this.tempNote.content);
          done();
        });
      });
    });

    describe('with invalid id', function(){
      it('should respond with 404', done => {
        request.get(`${url}/api/note/1234`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });

    describe('with no id', function(){
    });
  });


  describe('testing POST requiests to /api/note', function(){
    describe('with a valid body', function(){
      after( done => {
        if (this.tempNote) {
          Note.deleteNote(this.tempNote.id)
          .then(() => done())
          .catch(err => done(err));
        }
      });

      it('should return a note', done => {
        request.post(`${url}/api/note`)
        .send(exampleNote)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(!!res.body.id).to.equal(true);
          expect(res.body.name).to.equal(exampleNote.name);
          expect(res.body.content).to.equal(exampleNote.content);
          this.tempNote = res.body;
          done();
        });
      });
    });

  });

  describe('testing PUT requests to /api/note', function(){
    describe('valid id and body', function(){
      before(done => {
        Note.createNote(exampleNote)
        .then( note => {
          this.tempNote = note;
          done();
        })
        .catch(err => done(err));
      });

      after(done => {
        if (this.tempNote) {
          Note.deleteNote(this.tempNote.id)
          .then(() => done())
          .catch(done);
        }
      });

      it('should return an note', done => {
        let updateData = {name: 'up date', content: 'fizzbuzz'};
        request.put(`${url}/api/note?id=${this.tempNote.id}`)
        .send(updateData)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempNote.id);
          for (var key in updateData) {
            expect(res.body[key]).to.equal(updateData[key]);
          }
          done();
        });
      });
    });
  });
});
