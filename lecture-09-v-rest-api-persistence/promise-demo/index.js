'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

fs.readFileProm('./dont-exists')
.then( data => data.fill('a'))
.then( aBuf => fs.writeFileProm('lulwat.txt', aBuf))
.then( () => console.log('done'))
.catch( err => console.error(err))

//Promise.resolve([1,2,3,4,5,6])
//.then( nums => {
  //console.log('nums before', nums); 
  //return Promise.reject(nums.map(v => v * 2))
//})
//.then( big => console.log('nums after', big))
//.catch( err => console.error('err', err))
