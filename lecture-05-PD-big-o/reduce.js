Array.prototype.reduce = function(callback, initial){
  initial = initial || 0;
  for (var i=0; i< this.length; i++) {
    initial = callback(initial, this[i], i, this);
  }
  return  initial;
}

//wat = new Array(1,2,3,4);
wat = [1,2, 3, 4]

console.log(wat);
console.log(wat.reduce( (p, c) => p + c));
