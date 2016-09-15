'use strict'

const EE = require('events');
const ee = new EE();
const fs = require('fs');

ee.on('first', function(){
  console.log('gurrr');
});

ee.on('first', function(){
  console.log('boooya');
});

ee.on('second', function(data){
  console.log('got it :-p,', data);
  fs.readdir('./' , function(err, data){
    if (err) return ee.emit('error', err);
    ee.emit('second', data);
  });
});

ee.on('third', function(data){
  console.log('got it :-p,', data);
});

ee.on('error', function(err){
  console.error('gawt error', err); 
});

ee.emit('first');
