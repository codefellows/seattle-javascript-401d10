'use strict';

const FormData = require('form-data')
const Promise = require('bluebird')
const debug = require('debug')('slugram:form-request')

module.exports = function(url, token, params){
  debug()
  console.log('url', url)
  console.log('token', token)

  return new Promise((resolve, reject) => {
    let form = new FormData()
    let options = {
      header: `Authorization: Bearer ${token}`,
    }

    for (var key in params){
      form.append(key, params[key])
    }

    form.submit(url, function(err, res){
      if (err) 
        return reject(err)
      let json = ''
      res.on('data', data => json += data.toString())
      res.on('end', () => {
        try {
          res.body = JSON.parse(json)
          resolve(res)
        } catch(err){
          reject(err)
        }
      })
    })
  })
}

