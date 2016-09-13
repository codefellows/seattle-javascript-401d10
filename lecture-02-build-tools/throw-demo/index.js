'use strict';

var count = 0;

while (!false) {
  count++;
  console.log('hello world');
  try {
    if (count === 5) throw new Error('abort mission');
  } catch (err) {
    console.error(err);
    if (err.message === 'abort mission')
      console.log('game over') ;
    break;

  }
}
