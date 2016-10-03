'use strict';

function Stack(){
  Array.call(this);
}

Stack.prototype.push = function(){
  Array.prototype.push.apply(this, arguments);
};

Stack.prototype.pop = function(){
  Array.prototype.pop.apply(this, arguments);
}

let stringStack = new Stack();
stringStack.push('hello');
console.log(stringStack);
stringStack.push('world');
console.log(stringStack);
stringStack.pop();
console.log(stringStack);
stringStack.pop();
console.log(stringStack);

