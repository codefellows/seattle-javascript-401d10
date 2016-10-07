'use strict'

require('./lib/aws-mocks.js')
const expect = require('chai').expect
const request = require('superagent')
const Promise = require('bluebird')
const mongoose = require('mongoose')
const serverCtrl = require('./lib/server-ctrl.js')
const cleanDB = require('./lib/clean-db.js')
const mockUser = require('./lib/user-mock.js')

mongoose.Promise = Promise

const server = require('../server.js')
const url = `http://localhost:${process.env.PORT}`

const exampleUser = {
  username: 'slugbyte',
  password: '1234',
  email: 'slug@slug.slime',
}

describe('testing auth-router', function(){
  // start server at for this test file
  before(done => serverCtrl.serverUp(server, done))
  // stop server after this test file
  after(done => serverCtrl.serverDown(server, done))
  // clean all models from db after each test
  afterEach(done => cleanDB(done))

  describe('testing POST /api/signup', function(){
    describe('with valid body', function(){
      it('should return a token', (done) => {
        request.post(`${url}/api/signup`)
        .send(exampleUser)
        .end((err, res) => {
          if (err)
            return done(err)
          expect(res.status).to.equal(200)
          expect(!!res.text).to.equal(true)
          done()
        })
      })
    })

    describe('with no username', function(){
      it('should respond with status 400', (done) => {
        request.post(`${url}/api/signup`)
        .send({
          password: exampleUser.password,
          email: exampleUser.email,
        })
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(!!res.text).to.equal(true)
          done()
        })
      })
    })

    describe('with no email', function(){
      it('should respond with status 400', (done) => {
        request.post(`${url}/api/signup`)
        .send({
          username: exampleUser.username,
          password: exampleUser.password,
        })
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(!!res.text).to.equal(true)
          done()
        })
      })
    })

    describe('with no password', function(){
      it('should respond with status 400', (done) => {
        request.post(`${url}/api/signup`)
        .send({
          email: exampleUser.email,
          username: exampleUser.username,
        })
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(!!res.text).to.equal(true)
          done()
        })
      })
    })
  })

  describe('testing GET /api/signup', function(){
    describe('with valid body', function(){
      before(done => mockUser.call(this, done))

      it('should return a token', (done) => {
        request.get(`${url}/api/login`)
        // this has to be the same user and pass from mockUser
        .auth('slugbyte', '1234')
        .end((err, res) => {
          if (err)
            return done(err)
          expect(res.status).to.equal(200)
          expect(!!res.text).to.equal(true)
          done()
        })
      })
    })
  })
})
