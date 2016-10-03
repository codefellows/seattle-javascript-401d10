'use strict';

function Stack(){
  this.length = 0;
}

Stack.prototype.push = function(value){
  this[this.length] = value;
  this.length++;
};

Stack.prototype.pop = function(){
  if (this.length === 0) return;
  var result = this[this.length -1]; 
  delete this[this.length -1]; 
  this.length--;
  return result;
};

let numStack = new Stack();
// {length: 0}
console.log(numStack);

numStack.push(33);
// {length: 1, 0: 33}
console.log(numStack);

numStack.push(100);
// {length: 2, 0: 33, 1: 100}
console.log(numStack);

console.log('result', numStack.pop());
console.log(numStack);
// result == 100
// numstack == {length: 1, 0: 33}

console.log('result', numStack.pop());
console.log(numStack);
console.log('result', numStack.pop());
console.log(numStack);
