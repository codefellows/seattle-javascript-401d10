'use strict';

function main(){
  console.log('first');
  process.nextTick(function lulwat(){
    console.log('hello world');
  });
  console.log('second');
  console.log('third');
  console.log('fourth');
};

main();
