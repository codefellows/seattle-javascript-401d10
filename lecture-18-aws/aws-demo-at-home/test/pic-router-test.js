'use strict'

const awsMocks = require('./lib/aws-mocks.js')
// node modules
const fs = require('fs')

// npm modules
const expect = require('chai').expect
const request = require('superagent')
const debug = require('debug')('slugram:pic-router-test')

// app modules
const Pic = require('../model/pic.js')
const User = require('../model/user.js')
const Gallery = require('../model/gallery.js')
const serverCtrl = require('./lib/server-on-off.js')

// module constants
const server = require('../server.js')
const url = 'http://localhost:3000'
const exampleUser = {
  username: 'slugbyte',
  password: '1234',
  email: 'slug@slug.slug',
}

const exampleGallery = {
  name: 'beach adventure',
  desc: 'not enough sun screan ouch',
}

const examplePic = {
  name: 'sunburn',
  desc: 'owie no thank you',
  image: fs.createReadStream(`${__dirname}/data/shield.png`),
}

const examplePicModel = {
  name: 'lulwat', 
  desc: 'this is cool',
  imageURI: awsMocks.uploadMock.Location,
  filename: awsMocks.uploadMock.Key,
  created: new Date(),
}

describe('testing pic-router', function(){
  before(done => {
    serverCtrl.serverOn(server, done)
  })

  after(done => {
    serverCtrl.serverOff(server, done)
  })

  // remove any users, pics, and gallerys
  afterEach(done => {
    debug('clean up database')
    Promise.all([
      Pic.remove({}),
      User.remove({}),
      Gallery.remove({}),
    ])
    .then( () => done())
    .catch(done)
  })


  describe('testing post /api/gallery/:id/pic', function(){
    describe('with valid token and data', function(){
      before(done => {
        debug('create mock user')
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

      after(() => {
        debug('clean up userID from exampleGallery')
        delete exampleGallery.userID
      })

      before( done => {
        debug('create gallery')
        exampleGallery.userID = this.tempUser._id.toString()
        new Gallery(exampleGallery).save()
        .then( gallery => {
          this.tempGallery = gallery
          done()
        })
        .catch(done)
      })

      it('should return a pic', done => {
        request.post(`${url}/api/gallery/${this.tempGallery._id}/pic`)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .field('name', examplePic.name)
        .field('desc', examplePic.desc)
        .attach('image', `${__dirname}/data/shield.png`)
        .then( res => {
          expect(res.statusCode).to.equal(200)
          expect(res.body.name).to.equal(examplePic.name)
          expect(res.body.desc).to.equal(examplePic.desc)
          expect(res.body.galleryID).to.equal(this.tempGallery._id.toString())
          expect(res.body.imageURI).to.equal(awsMocks.uploadMock.Location)
          done()
        })
        .catch(done)
      })
    })
  })

  describe('testing delete request', function(){
    before(done => {
      debug('create mock user')
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
      debug('create mock gallery')
      exampleGallery.userID = this.tempUser._id.toString()
      new Gallery(exampleGallery).save()
      .then( gallery => {
        this.tempGallery = gallery
        done()
      })
      .catch(done)
    })

    before( done => {
      debug('create mock pic')
      examplePicModel.userID = this.tempUser._id.toString()
      examplePicModel.galleryID = this.tempGallery._id.toString()
      new Pic(examplePicModel).save()
      .then( pic => {
        this.tempPic = pic 
        done()
      })
      .catch(done)
    })

    after(() => {
      debug('clean up userID from exampleGallery')
      delete exampleGallery.userID
      delete examplePicModel.userID
      delete examplePicModel.galleryID
    })

    it('should respond with a 204', done => {
      request.delete(`${url}/api/gallery/${this.tempGallery._id}/pic/${this.tempPic._id}`)
      .set({
        Authorization: `Bearer ${this.tempToken}`,
      })
      .then( res => {
        expect(res.statusCode).to.equal(204)
        done()
      })
      .catch(done)
    })
  })


})
