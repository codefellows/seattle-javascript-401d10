'use strict'

require('./lib/aws-mocks.js')

// npm
const expect = require('chai').expect
const request = require('superagent')
const mongoose = require('mongoose')
const Promise = require('bluebird')

// app
const server = require('../server.js')
const User = require('../model/user.js')
const Gallery = require('../model/gallery.js')

// const
const url = `http://localhost:${process.env.PORT}`
  const exampleUser = {
  username: 'slugbyte',
  password: '1234',
  email: 'slug@slug.slug',
}

const exampleGallery = {
  name: 'beach adventure',
  desc: 'not enough sun screan ouch'
}

// config
mongoose.Promise = Promise

describe('test /api/gallery', function(){
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


  afterEach(done => {
    Promise.all([
      User.remove({}),
      Gallery.remove({}),
    ])
    .then( () => done())
    .catch(done)
  })

  describe('testing POST to /api/gallery', () => {
    before(done => {
      console.log('create user')
      new User(exampleUser)
      .generatePasswordHash(exampleUser.password)
      .then( user => user.save())
      .then( user => {
        this.tempUser = user
        return user.generateToken()
      })
      .then( token => {
        this.tempToken = token
        done()
      })
      .catch(done)
    })

    it('should return a gallery', done => {
      request.post(`${url}/api/gallery`)
      .send(exampleGallery)
      .set({
        Authorization: `Bearer ${this.tempToken}`,
      })
      .end((err, res) => {
        if (err) return done(err)
          expect(res.body.name).to.equal(exampleGallery.name)
        expect(res.body.desc).to.equal(exampleGallery.desc)
        expect(res.body.userID).to.equal(this.tempUser._id.toString())
        let date = new Date(res.body.created).toString()
        expect(date).to.not.equal('Invalid Date')
        done()
      })
    })
  })

  describe('testing GET to /api/gallery/:id', () => {
    before(done => {
      console.log('create user')
      new User(exampleUser)
      .generatePasswordHash(exampleUser.password)
      .then( user => user.save())
      .then( user => {
        this.tempUser = user
        return user.generateToken()
      })
      .then( token => {
        this.tempToken = token
        done()
      })
      .catch(done)
    })

    before( done => {
      console.log('create gallery')
      exampleGallery.userID = this.tempUser._id.toString()
      new Gallery(exampleGallery).save()
      .then( gallery => {
        this.tempGallery = gallery
        done()
      })
      .catch(done)
    })

    after(() => {
      delete exampleGallery.userID
    })

    it('should return a gallery', done => {
      request.get(`${url}/api/gallery/${this.tempGallery._id}`)
      .set({
        Authorization: `Bearer ${this.tempToken}`,
      })
      .end((err, res) => {
        if (err) return done(err)
          expect(res.body.name).to.equal(exampleGallery.name)
        expect(res.body.desc).to.equal(exampleGallery.desc)
        expect(res.body.userID).to.equal(this.tempUser._id.toString())
        let date = new Date(res.body.created).toString()
        expect(date).to.not.equal('Invalid Date')
        done()
      })
    })
  })
})
