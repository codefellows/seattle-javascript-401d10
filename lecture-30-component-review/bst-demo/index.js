'use strict';

const BST = require('./lib/bst.js');

let myFirstBST = new BST();

myFirstBST
.addNodeWithValue(17)
.addNodeWithValue(11)
.addNodeWithValue(21)
.addNodeWithValue(9)
.addNodeWithValue(15)
.addNodeWithValue(19)
.addNodeWithValue(33);
//myFirstBST.depthFirstTraversal();

myFirstBST.breadthFirstTraversal();

//console.dir( myFirstBST, {depth: 100});
