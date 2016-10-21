'use strict';

let c = {
  next: null,
  value: 7,
};

let b = {
  next: c,
  value: 8,
};

let a = {
  next: b,
  value: 9,
};

printLinkedList(a);

function printLinkedList(node){
  if(!node) return;
  console.log('node.value', node.value);
  printLinkedList(node.next);
}


let current = a;
while (current){
  console.log('current', current.value);
  current = current.next;
}

