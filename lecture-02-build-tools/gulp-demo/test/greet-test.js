'use strict';

const greet = require('../lib/greet.js');
const assert = require('assert'); 

describe('testing greet module', function(){
  it('should return hello slug neo', function(){
    var result = greet('slug neo');
    assert.equal(result, 'hello slug neo', 'expected "hello slug neo"');
  });
});

