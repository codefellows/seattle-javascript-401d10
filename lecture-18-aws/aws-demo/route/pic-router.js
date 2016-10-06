'use strict'

// node module
const fs = require('fs')
const path = require('path')

// npm module
const AWS = require('aws-sdk')
const multer = require('multer')
const createError = require('http-errors')
const debug = require('debug')('sulgram:pic-router')

// app module
const Pic = require('../model/pic.js')
const Gallery = require('../model/gallery.js')
const bearerAuth = require('../lib/bearer-auth-middleware.js')

// module config
AWS.config.setPromisesDependency(require('bluebird'))

// module constants
const s3 = new AWS.S3()
const upload = multer({dest: `${__dirname}/../data`})
const picRouter = module.exports = require('express').Router()


picRouter.post('/api/gallery/:galleryID/pic', bearerAuth, upload.single('image'), function(req, res, next){
  debug('POST /api/gallery/:galleryID/pic')
  if(!req.file) 
    return next(createError(400, 'no file found'))
  if(!req.file.path) 
    return next(createError(500, 'file was not saved'))

  let ext = path.extname(req.file.originalname) // '.png'
 
  let params = {
    ACL: 'public-read',
    Bucket: 'slugram-assets',
    Key: `${req.file.filename}${ext}`,
    Body: fs.createReadStream(req.file.path),
  }
  
  s3.upload(params, function(err, s3data){
    if(err) return next(err)
    // create a picture
    Gallery.findById(req.params.galleryID)
    .then(gallery => {
      let picData = {
        name: req.body.name,
        desc: req.body.desc,
        userID: req.user._id,
        galleryID: gallery._id,
        imageURI: s3data.Location,
        filename: s3data.Key,
      }
      return new Pic(picData).save()
    })
    .then( pic => res.json(pic))
    .catch(next)
  })
})

picRouter.delete('/api/gallery/:galleryID/pic/:picID', bearerAuth, function(req, res, next){
  debug('DELETE /api/gallery/:galleryID/pic/:picID')

  Pic.findById(req.params.picID)
  .catch( err => Promise.reject(createError(404, err.message))) // 404 if not able to find the Pic
  .then(pic => {
    if (pic.galleryID.toString() !== req.params.galleryID)
      return Promise.reject(createError(400, 'bad request bad gallery id'))
    if (pic.userID.toString() !== req.user._id.toString())
      return Promise.reject(createError(401, 'user not authorized to delete this picture'))

    let params = {
      Bucket: 'slugram-assets',
      Key: pic.filename,
    }
    return s3.deleteObject(params).promise() // status code 500 if it fails
  })
  .then(() => Pic.findByIdAndRemove(req.params.id))
  .then(() => res.sendStatus(204))
  .catch(next)
})
