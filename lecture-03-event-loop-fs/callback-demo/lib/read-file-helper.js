'use strict';

const fs = require('fs');

module.exports = function(callback){
  fs.readFile(`${__dirname}/../data/hello.txt`, function(err, data){
    callback(data.toString());
  });
};

