'use strict';

const PORT = process.env.PORT || 3000;
process.env.MONGODB_URI = 'mongodb://localhost/notetest';

const expect = require('chai').expect;
const request = require('superagent');
const List = require('../model/list.js');

require('../server.js');

const url = `http://localhost:${PORT}`;
const exampleList = {
  name: 'lulwat',
};

describe('testing route /api/list', function(){
  describe('testing POST requests', function(){
    describe('with valid body', function(){
      after( done => {
        if(this.tempList){
          List.remove({})
          .then(() => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a list', done => {
        request.post(`${url}/api/list`)
        .send(exampleList)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('lulwat');
          this.tempList = res.body;
          done();
        });
      });
    });
  });

  describe('testing GET requests', function(){
    describe('with valid body', function(){
      before( done => {
        exampleList.timestamp = new Date();
        new List(exampleList).save()
        .then( list => {
          this.tempList = list;
          done();
        })
        .catch(done);
      });

      after( done => {
        delete exampleList.timestamp;
        if(this.tempList){
          List.remove({})
          .then(() => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a list', done => {
        request.get(`${url}/api/list/${this.tempList._id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('lulwat');
          done();
        });
      });
    });
  });
});

