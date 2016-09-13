'use strict';

// types passed by value
//   - number
//   - string
//   - boolean

const bigNum = 1;

logNum(bigNum)
console.log('bigNum', bigNum);

function logNum(num){
  num += 1;
  console.log('logNum', num);
}


