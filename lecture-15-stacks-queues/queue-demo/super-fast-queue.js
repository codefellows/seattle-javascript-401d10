'use strict';

function Queue(){
  this.next = null;
  this.length = 0;
}

Queue.prototype.enqueue = function(value){
  this[this.length] = value;
  if (!this.next) this.next = 0;
  this.length++;
}

Queue.prototype.dequeue = function(){
  let result = this[this.next];
  delete this[this.next];
  this.next++;
  return result;
}

let charQueue = new Queue();
charQueue.enqueue('A');
console.log(charQueue);
charQueue.enqueue('B');
console.log(charQueue);
charQueue.enqueue('C');
console.log(charQueue);
charQueue.dequeue();
console.log(charQueue);
charQueue.dequeue();
console.log(charQueue);
charQueue.dequeue();
console.log(charQueue);
charQueue.enqueue('D');
console.log(charQueue);
charQueue.enqueue('E');
console.log(charQueue);
charQueue.enqueue('F');
console.log(charQueue);
charQueue.dequeue();
console.log(charQueue);
charQueue.dequeue();
console.log(charQueue);
charQueue.dequeue();
console.log(charQueue);
