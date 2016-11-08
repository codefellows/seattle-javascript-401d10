'use strict'

const Router = require('express').Router
const createError = require('http-errors')
const jsonParser = require('body-parser').json()
const debug = require('debug')('slugram:auth-router')
const basicAuth = require('../lib/basic-auth-middleware.js')
const googleOAUTH = require('../lib/google-oauth-middleware.js');
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

authRouter.get('/api/auth/oauth_callback', googleOAUTH, function(req, res){
  debug('GET /api/auth/oauth_callback');
  // should have either req.googleError or req.googleOAUTH
  console.log('googleError', req.googleError);
  console.log('googleOAUTH', req.googleOAUTH);

  // if googleError deal with google Error
  if(req.googleError){
    return res.redirect('/');
  }

  // check if user allreay exists
  User.findOne({email: req.googleOAUTH.email})
  .then(user => {
    if (!user) return Promise.reject(new Error('user not found'));
    return user;
  })
  .catch(err => {
    if (err.message === 'user not found'){
      let userData = {
        username: req.googleOAUTH.email,
        email: req.googleOAUTH.email,
        google: {
          googleID: req.googleOAUTH.googleID,
          tokenTTL: req.googleOAUTH.tokenTTL,
          tokenTimestamp: Date.now(),
          refreshToken: req.googleOAUTH.refreshToken,
          accessToken: req.googleOAUTH.accessToken,
        }
      }
      return new User(userData).save()
    }
    return Promise.reject(err);
  })
  .then(user => user.generateToken())
  .then(token => {
    res.redirect(`/?token=${token}`);
  })
  .catch(err => {
    console.error(err);
    console.log('user not found');
    res.redirect('/');
  })
  //res.send('lulwat');
  //return new User(userData).save();
  //})
  //.then(user => user.generateToken())
  //.then(token => {
  //res.send(token);
  //})
  //.catch((err) => {
  //console.error(err);
  //res.send('boo hoo')
  //});

});


