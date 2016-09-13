'use strict';

module.exports = exports = {};

exports.sayHello = function(name){
  if (arguments.length === 0) 
    throw new Error('missing a name');
  return 'hello ' + name;
};

exports.sayGoodbye = function(){
  console.log('Seeya');
};
