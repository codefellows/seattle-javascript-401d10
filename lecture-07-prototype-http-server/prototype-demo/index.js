


const Note = module.exports = function (name, content){
  this.name = name;
  this.content = content;
};

Note.prototype.secret  = 'hello world';
Note.prototype.describe = function(){
  console.log('this.name', this.name);
};

const GroceryNote = function(name, content, items){
  Note.call(this, name, content);
  this.items = items;
};

GroceryNote.prototype = Object.create(Note.prototype);
GroceryNote.prototype.printList = function({
  console.log(this.list);
}

GroceryNote.helo = function(){
};


var g = new GroceryNote('notethret', 'sldkfjsldfj', ['broc', 'soap']);

// g
{
  name: 'noethret',
  content: 'slfkjlsdfkjdslfj', 
  __proto__: { // Grocery
    helo: function(){},
    __proto__: { // Note
      describe: ...
      secret: ...
      __proto__: { // Objects Prototype
      }
    }
  } 
}












//console.log('noteOne.name', noteOne.name);
//console.log('noteOne.proto...', noteOne.__proto__.secret);
//console.log('noteTwo.name', noteTwo.name);
//console.log('noteTwo.proto...', noteTwo.__proto__.secret);
