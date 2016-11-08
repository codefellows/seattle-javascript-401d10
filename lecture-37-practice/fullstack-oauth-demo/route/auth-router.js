'use strict'

const request = require('superagent');
const Router = require('express').Router
const createError = require('http-errors')
const jsonParser = require('body-parser').json()
const debug = require('debug')('slugram:auth-router')
const basicAuth = require('../lib/basic-auth-middleware.js')
const User = require('../model/user.js')

// module constants
const authRouter = module.exports = Router()

authRouter.post('/api/signup', jsonParser, function(req, res, next){
  debug('POST /api/signup')

  let password = req.body.password
  delete req.body.password
  let user = new User(req.body)

  // checkfor password before running generatePasswordHash
  if (!password) 
    return next(createError(400, 'requires password'))
  if (password.length < 8) 
    return next(createError(400, 'password must be 8 characters'))

  user.generatePasswordHash(password)
  .then( user => user.save()) // check for unique username with mongoose unique
  .then( user => user.generateToken())
  .then( token => res.send(token))
  .catch(next)
})

authRouter.get('/api/login', basicAuth, function(req, res, next){
  debug('GET /api/login')

  User.findOne({username: req.auth.username})
  .then( user => user.comparePasswordHash(req.auth.password))
  .catch(err => Promise.reject(createError(401, err.message)))
  .then( user => user.generateToken())
  .then( token => res.send(token))
  .catch(next)
})


authRouter.get('/api/auth/oauth_callback', function(req, res, next){
  let url = 'https://www.googleapis.com/oauth2/v4/token';
  let ttl, refreshToken, accessToken;
  request.post('https://www.googleapis.com/oauth2/v4/token')
  .type('form')
  .send({
    code: req.query.code,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: `${process.env.API_URL}/api/auth/oauth_callback`,
    grant_type: 'authorization_code',
  })
  .then( response => {
    ttl = response.body.expires_in;
    refreshToken = response.body.refresh_token;
    accessToken = response.body.access_token;
    let url = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
    return request.get(url)
    .set('Authorization', `Bearer ${accessToken}`)
  })
  .then( response => {
    let googleID = response.body.sub;
    let googleEmail = response.body.email;
    let userData = {
      username: googleEmail,
      email: googleEmail,
      google: {
        googleID,
        refreshToken,
        ttl,
        accessToken,
        tokenTimeStamp: Date.now(),
      },
    };
    // check if user allready exists 
    return User.findOne({email: googleEmail})
    .catch(() => {
      console.log('userData', userData);
      return new User(userData).save()
    })
    .then(user =>  user.generateToken())
    
    // if so gen token and respond
    // otherwise create new user
  })
  .then(token => {
    res.redirect(`/#/home?token=${token}`)
  })
  .catch(err => {
    console.error (err)
    return next(err)
  })

});





