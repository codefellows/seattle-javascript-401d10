'use strict';

function goodOrBad( truthy , callback){
  if (!truthy) return callback(new Error('not true'));
  callback(null, 'good');
};

goodOrBad(false, function(err, data){
  if (err) return console.error(err);
  console.log(data);
  goodOrBad(false, function(err, data){
    if (err) return console.error(err);
    console.log(data);
  goodOrBad(false, function(err, data){
    if (err) return console.error(err);
    console.log(data);
  });
  });
});

function goodOrBadProm(truthy) {
  return new Promise((resolve, reject) => {
    if (!truthy) return reject(new Error('not true'));
    resolve('good');
  });
}


Promise.all([
  goodOrBadProm(),
  goodOrBadProm('goo'),
  goodOrBad('bad'),
])
.then( dataArray => console.log('dataArray', dataArray))
.then( dataArray => console.log('dataArray', dataArray))
.then( dataArray => console.log('dataArray', dataArray))
.then( dataArray => console.log('dataArray', dataArray))
.then( dataArray => console.log('dataArray', dataArray))
.then( dataArray => console.log('dataArray', dataArray))
.catch(err => console.error('err', err));

goodOrBadProm('good')
.then(data => {
  console.log(data);
  console.log(data);
  console.log(data);
})
.catch( err => console.error(err);); 






