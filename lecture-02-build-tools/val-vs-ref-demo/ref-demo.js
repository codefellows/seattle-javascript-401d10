'use strict';

const a = {name: 'slugneo', age: Infinity};
logSlug(a);
console.log('a', a);

function logSlug(b){
  b.name = 'hello'
  console.log('logSLug', b);
}


