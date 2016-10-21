'use strict';

const Node = require('./node.js');

const LinkedList = module.exports = function LinkedList(){
  this.head = null;
};

LinkedList.prototype.findMiddle = function(){
  let current = this.head;
  let lag = this.head;
  let count = 0;

  while(current){
    count++;
    if (count % 2 === 0) lag = lag.next;
    current = current.next;
  }

  return lag;
};

LinkedList.prototype.thirdToLastPointer = function(num){
  let current = this.head;
  let lag = this.head;
  let count = 0;

  while(current){
    count++;
    if (count > num) lag = lag.next;
    current = current.next;
  }

  return (count < num) ? null : lag;
};

LinkedList.prototype.thirdToLast = function(){
  let last = this.head; 
  let second = null;
  let third = null;

  while (last){
    if (!last.next) return third;
    if (second) third = second;
    if (last) second = last;
    last = last.next;
  }

  return null;
};

LinkedList.prototype.prependNodeWithValue = function(value){
  // pass in a value
  // create node 
  // add that node to the beginning of the list
  let node = new Node(value);
  if (!this.head) {
    this.head = node;
    return this;
  }

  node.next = this.head;
  this.head = node;
  return this;
};

LinkedList.prototype.appendNodeWithValue = function(value){
  // pass in a value
  // create node 
  // add that node to the end of the list
  let node = new Node(value);
  let lastNode = null;
  if (!this.head) {
    this.head = node;
    return this;
  }

  _setLastNode(this.head);
  lastNode.next = node;
  return this;

  function _setLastNode(node){
    if(!node) return;
    lastNode = node;
    _setLastNode(node.next);
  }
};

