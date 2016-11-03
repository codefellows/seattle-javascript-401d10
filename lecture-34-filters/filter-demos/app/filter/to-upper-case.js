'use strict'

module.exports = function(){
  return function(input, pre, punk){
    let prefix = pre || ''
    let punktuation = punk || '!!!'
    return prefix + input.toUpperCase() + punktuation;
  };
};
