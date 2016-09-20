'use strict';

//var wat = [1,2,3].push('goo');

//Array.prototype.push = function(value){
  //this[this.length] = value;
  //this.length++;
//}

var fakeArray = {'0': 'lulwat', '1': 'goo', length: 2};

Array.prototype.push.apply(fakeArray, ['bar', 'lul']);
Array.prototype.push.call(fakeArray, 'chunk');


fakeArray.push('bar', 'lul');

  
