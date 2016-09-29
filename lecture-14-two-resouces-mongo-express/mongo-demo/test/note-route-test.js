'use strict';

const PORT = process.env.PORT || 3000;
process.env.MONGODB_URI = 'mongodb://localhost/notetest';

const expect = require('chai').expect;
const request = require('superagent');
const List = require('../model/list.js');
const Note = require('../model/note.js');

require('../server.js');

const url = `http://localhost:${PORT}`;
  const exampleNote = {
  name: 'lulwat',
  content: 'hello world',
};

const exampleList = {
  name: 'lulwat',
  timestamp: new Date(),
};

describe('testing note routes', function(){
  describe('testing post requests', function(){
    describe('with valid list id and noteBody', () => {
      before(done => {
        new List(exampleList).save()
        .then( list => {
          this.tempList = list;
          done();
        })
        .catch(done);
      });

      after(done => {
        Promise.all([
          List.remove({}),
          Note.remove({}),
        ])
        .then(() => done())
        .catch(done);
      });

      it('should return a note', done => {
        request.post(`${url}/api/list/${this.tempList.id}/note`)
        .send(exampleNote)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.body.name).to.equal(exampleNote.name);
          expect(res.body.listID).to.equal(this.tempList._id.toString());
          done();
        });
      });
    });
  });
});


