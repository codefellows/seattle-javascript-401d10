'use stirct'

const AWS = require('aws-sdk-mock')

module.exports = exports = {}

exports.uploadMock = {
  ETag: '"ff7a7a"',
  Location: 'https://lulwat.com/1234.png',
  Key: '1234.png',
  key: '1234.png',
  Bucket: 'slugram-assets',
}

AWS.mock('S3', 'upload', function(params, callback){
  if (!params.ACL === 'public-read')
    return callback(new Error('ACL must be public-read'))
  if (!params.Bucket === 'slugram-assets')
    return callback(new Error('Bucket must be slugram-assets'))
  if (!params.Key)
    return callback(new Error('must have Key set'))
  if (!params.Body)
    return callback(new Error('must have body set'))
  callback(null, exports.uploadMock)
})

exports.deleteObjectMock = {
  DeleteMarker: 'true',
  VersionId: '1fgWT17K9XWFKsD2YW4Af80v9JkqqYSv',
}

AWS.mock('S3', 'deleteObject', function(params, callback){
  if (!params.Bucket === 'slugram-assets')
    return callback(new Error('Bucket must be slugram-assets'))
  if (!params.Key)
    return callback(new Error('Bucket must have a key'))
  callback(null, exports.deleteObjectMock)
})
