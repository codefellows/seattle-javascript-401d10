'use strict';

const assert = require('assert');
const readFileHelper = require('../lib/read-file-helper.js');

describe('testing readFileHelper', function(){
  it('should return the right string', function(done){
    readFileHelper(function(text){
      assert.equal(text, 'hello world\n');
      done();
    });
  });
});
