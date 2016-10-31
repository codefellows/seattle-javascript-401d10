'use strict';

const Node = module.exports = function Node(value){
  this.value = value || null;
  this.left = null;
  this.right = null;
};

Node.prototype.addNodeWithValue = function(value){
  // check if the value is the current value 
  // if so do nothing
  if (value === this.value) return this;
  // check if the value is less than the current value 
  // if the left node all ready exists pass the value into this.left.AddNodeWithValue
  // if the left node does not exist set the left node to a new node

  if (value < this.value){
    if (this.left) {
      return this.left.addNodeWithValue(value);
    }
    this.left = new Node(value);
    return this;
  }
  // check if the value is greater than the current value
  // if the right node all ready exists pass the value into this.right.AddNodeWithValue
  // if the right node does not exist set the right node to a new node
  if (this.right) {
    return this.right.addNodeWithValue(value);
  }

  this.right = new Node(value);
  return this;
};
