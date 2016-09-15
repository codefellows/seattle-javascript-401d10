'use strict';

const fs = require('fs');

const buf = fs.readFileSync('./rand.txt');

console.log('buf', buf);

const part = buf.slice(0, 20);
part.write('lulwat');
console.log('original' , buf.toString('utf8', 0, 20));
console.log('part', part.toString());
