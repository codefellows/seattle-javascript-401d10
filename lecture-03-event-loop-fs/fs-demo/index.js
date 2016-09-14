'use strict';

// node modules
const fs = require('fs');
// npm modules
// app modules 
// module constants
// module logic

console.log(__dirname);

fs.readFile(`${__dirname}/data/1.txt`, function(err, data){
  if (err) throw err;
  console.log(data.toString());

  fs.writeFile(`${__dirname}/data/1.nuu.txt`, data, function(err, data){
    if (err) throw err;
    console.log('done son');
  });
});

