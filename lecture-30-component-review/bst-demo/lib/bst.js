'use strict';

const Node = require('./node.js');

const BST = module.exports = function BST(){
  this.root = null;
};

BST.prototype.addNodeWithValue = function(value){
  if(!this.root){
    this.root = new Node(value);
    return this;
  }
  this.root.addNodeWithValue(value);
  return this;
};

BST.prototype.depthFirstTraversal = function(){
  if (!this.root) return console.log('EMPTY BST');
  _depthFirstTraversal(this.root, 'root', '');

  function _depthFirstTraversal(node, direction, pad){
    console.log(`${pad}${direction}: ${node.value}`);
    if (node.left) _depthFirstTraversal(node.left, 'left',  pad + ' ');
    if (node.right) _depthFirstTraversal(node.right, 'right', pad + ' ');
  }
};

BST.prototype.breadthFirstTraversal = function(){
  if (!this.root) return console.log('EMPTY BST');
  let queue = [];
  _breadthFirstTraversal(this.root);

  function _breadthFirstTraversal(node){
    console.log(`${node.value}`);
    if (node.left) queue.unshift(node.left);
    if (node.right) queue.unshift(node.right);

    if (queue.length){
      _breadthFirstTraversal(queue.pop());
    }
  }
};
