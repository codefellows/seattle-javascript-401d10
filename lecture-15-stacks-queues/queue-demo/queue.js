'use strict';

function Queue(){
  this.length = 0;
}

Queue.prototype.enqueue = function(value){
  this[this.length] = value;
  this.length++;
}

Queue.prototype.dequeue = function(){
  if(this.length === 0) return;
  var result = this[0];
  for (var i =1; i < this.length; i++){
    this[i - 1] = this[i];
  };
  delete this[this.length -1];
  this.length--;
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



