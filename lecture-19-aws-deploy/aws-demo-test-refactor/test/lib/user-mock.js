
const debug = require('debug')('sulgram:user-mock')
const User = require('../../model/user.js')

module.exports = function(done){
  debug('create mock user')
  let exampleUser = {
    username: 'slugbyte',
    password: '1234',
    email: 'slug@slug.slug',
  }
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
}
