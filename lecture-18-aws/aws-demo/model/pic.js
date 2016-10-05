'use strict'

const mongoose = require('mongoose')

const picSchema = mongoose.Schema({
  name: {type: String, required: true},
  desc: {type: String, required: true},
  galleryID: {type: mongoose.Schema.Types.ObjectId, required: true},
  imageURI: {type: String, required: true, unique: true},
  created: {type: Date, default: Date.now},
})

module.exports = mongoose.model('pic', picSchema)
