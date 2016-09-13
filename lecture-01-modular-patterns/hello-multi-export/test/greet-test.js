'use strict';

// import the the code we want to test 
const greetings = require('../lib/greet');
const assert = require('assert');

describe('testing module greet', function(){
  describe('testing #sayHello()', function(){
    it('should return hello dunc', function(){
      let result = greetings.sayHello('dunc');
      assert.ok(result === 'hello dunc', 'was not hello dunc');
    });

    it('should throw a missing a name error', function(){
      assert.throws(function(){
        greetings.sayHello();
      }, 'shoulda thrown dat err');
    });
  });
});
