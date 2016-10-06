'use strict'

require('./lib/aws-mocks.js')
const expect = require('chai').expect
const request = require('superagent')
const Promise = require('bluebird')
const mongoose = require('mongoose')
const User = require('../model/user.js')

mongoose.Promise = Promise

const server = require('../server.js')
const url = `http://localhost:${process.env.PORT}`
const exampleUser = {
  username: 'slug',
  password: '1234',
  email: 'slug@slug.slime',
}

describe('testing auth-router', function(){

  before(done => {
    if (!server.isRunning){
      server.listen(process.env.PORT, () => {
        server.isRunning = true
        console.log('server up')
        done()
      })
      return
    }
    done()
  })

  after(done => {
    if(server.isRunning){
      server.close(err => {
        if (err) return done(err)
        server.isRunning = false
        console.log('server down')
        done()
      })
      return
    }
    done()
  })

  
  describe('testing POST /api/signup', function(){
    describe('with valid body', function(){
      after( done => {
        User.remove({})
        .then( () => done())
        .catch(done)
      })

      it('should return a token', (done) => {
        request.post(`${url}/api/signup`)
        .send(exampleUser)
        .end((err, res) => {
          if (err) return done(err)
          console.log('res.text', res.text)
          expect(res.status).to.equal(200)
          expect(!!res.text).to.equal(true)
          done()
        })
      })
    })
  })

  describe('testing GET /api/signup', function(){
    describe('with valid body', function(){
      before( done => {
        let user  =  new User(exampleUser)
        user.generatePasswordHash(exampleUser.password)
        .then(user => user.save())
        .then(user =>  done())
        .catch(done)
      })

      after( done => {
        User.remove({})
        .then( () => done())
        .catch(done)
      })

      it('should return a token', (done) => {
        request.get(`${url}/api/login`)
        .auth('slug', '1234')
        .end((err, res) => {
          if (err) return done(err)
          console.log('res.text', res.text)
          expect(res.status).to.equal(200)
          expect(!!res.text).to.equal(true)
          done()
        })
      })
    })
  })
})
