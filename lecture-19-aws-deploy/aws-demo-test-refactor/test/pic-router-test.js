'use strict'

// mock third party services
const awsMocks = require('./lib/aws-mocks.js')

// npm modules
const expect = require('chai').expect
const request = require('superagent')
const debug = require('debug')('slugram:pic-router-test')

// app modules
const picMock = require('./lib/pic-mock.js')
const cleanDB = require('./lib/clean-db.js')
const galleryMock = require('./lib/gallery-mock.js')
const serverCtrl = require('./lib/server-ctrl.js')

// module constants
const server = require('../server.js')
const url = `http://localhost:3000`

const examplePic = {
  name: 'sunburn',
  desc: 'owie no thank you',
  image: `${__dirname}/data/shield.png`,
}

describe('testing pic-router', function(){
  before( done => serverCtrl.serverUp(server, done))
  after(done => serverCtrl.serverDown(server, done))
  afterEach(done => cleanDB(done))


  describe('testing post /api/gallery/:id/pic', function(){
    describe('with valid token and data', function(){
      before(done => galleryMock.call(this, done))

      it('should return a pic', done => {
        request.post(`${url}/api/gallery/${this.tempGallery._id}/pic`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .field('name', examplePic.name)
        .field('desc', examplePic.desc)
        .attach('image', examplePic.image)
        .then( res => {
          expect(res.status).to.equal(200)
          expect(res.body.name).to.equal(examplePic.name)
          expect(res.body.desc).to.equal(examplePic.desc)
          expect(res.body.galleryID).to.equal(this.tempGallery._id.toString())
          expect(res.body.imageURI).to.equal(awsMocks.uploadMock.Location)
          expect(res.body.objectKey).to.equal(awsMocks.uploadMock.Key)
          done()
        })
        .catch(done)
      })
    })
  })

  describe('testing delete /api/gallery/:galleryID/pic/:picID', function(){
    describe('with valid token and data', function(){
      before(done => picMock.call(this, done) )

      it('should return a pic', done => {
        request.delete(`${url}/api/gallery/${this.tempGallery._id}/pic/${this.tempPic._id}`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .then( res => {
          expect(res.status).to.equal(204)
          done()
        })
        .catch(done)
      })
    })
  })
})
