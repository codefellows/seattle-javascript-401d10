'use strict';

// npm modules
const expect = require('chai').expect;

// app modules
const Node = require('../lib/node.js');
const LinkedList = require('../lib/linked-list.js');

describe('testing module linked-list.js', function(){
  describe('testing #prependNodeWithValue', function (){
    it('should add node to the head of the LL', function(){
      let ll = new LinkedList();
      expect(!!ll.head).to.equal(false);
      ll.prependNodeWithValue('hello');
      expect(ll.head.constructor).to.equal(Node);
      expect(ll.head.value).to.equal('hello');
    });

    it('should add node to the head of the LL', function(){
      let ll = new LinkedList();
      expect(!!ll.head).to.equal(false);
      ll.prependNodeWithValue('hello');
      ll.prependNodeWithValue('goodbyte');
      expect(ll.head.constructor).to.equal(Node);
      expect(ll.head.value).to.equal('goodbyte');
      expect(ll.head.next.constructor).to.equal(Node);
      expect(ll.head.next.value).to.equal('hello');
    });
  });

  describe('testing #appendNodeWithValue', function (){
    it('should add node to the tail of the LL', function(){
      let ll = new LinkedList();
      expect(!!ll.head).to.equal(false);
      ll.appendNodeWithValue('hello');
      expect(ll.head.constructor).to.equal(Node);
      expect(ll.head.value).to.equal('hello');
    });

    it('should add node to the head of the LL', function(){
      let ll = new LinkedList();
      expect(!!ll.head).to.equal(false);
      ll.appendNodeWithValue('hello');
      ll.appendNodeWithValue('goodbyte');
      expect(ll.head.constructor).to.equal(Node);
      expect(ll.head.value).to.equal('hello');
      expect(ll.head.next.constructor).to.equal(Node);
      expect(ll.head.next.value).to.equal('goodbyte');
    });
  });


  describe('testing #thirdToLast', function(){
    it('should return 4', function(){
      let ll = new LinkedList();
      expect(ll.head).to.equal(null);
      ll.appendNodeWithValue(0);
      ll.appendNodeWithValue(1);
      ll.appendNodeWithValue(2);
      ll.appendNodeWithValue(3);
      ll.appendNodeWithValue(4);
      ll.appendNodeWithValue(5);
      ll.appendNodeWithValue(6);
      
      let result = ll.thirdToLast();
      expect(result.value).to.equal(4);
    });

    it('should return 2', function(){
      let ll = new LinkedList();
      expect(ll.head).to.equal(null);
      ll.appendNodeWithValue(0);
      ll.appendNodeWithValue(1);
      ll.appendNodeWithValue(2);
      ll.appendNodeWithValue(3);
      ll.appendNodeWithValue(4);
      
      let result = ll.thirdToLast();
      expect(result.value).to.equal(2);
    });

    it('should return null', function(){
      let ll = new LinkedList();
      expect(ll.head).to.equal(null);
      let result = ll.thirdToLast();
      expect(result).to.equal(null);
    });

  });

  describe('thirdToLastPointer', function(){
    it('should return null', function(){
      let ll = new LinkedList();
      expect(ll.head).to.equal(null);
      let result = ll.thirdToLastPointer(3);
      expect(result).to.equal(null);
    });

    it('should return 2', function(){
      let ll = new LinkedList();
      expect(ll.head).to.equal(null);
      ll.appendNodeWithValue(0);
      ll.appendNodeWithValue(1);
      ll.appendNodeWithValue(2);
      ll.appendNodeWithValue(3);
      ll.appendNodeWithValue(4);
      
      let result = ll.thirdToLastPointer(3);
      expect(result.value).to.equal(2);
    });

    it('should return 3', function(){
      let ll = new LinkedList();
      expect(ll.head).to.equal(null);
      ll.appendNodeWithValue(0);
      ll.appendNodeWithValue(1);
      ll.appendNodeWithValue(2);
      ll.appendNodeWithValue(3);
      ll.appendNodeWithValue(4);
      
      let result = ll.thirdToLastPointer(2);
      expect(result.value).to.equal(3);
    });
  });

  describe('#findMiddle', function(){
    it('should return 2', function(){
      let ll = new LinkedList();
      expect(ll.head).to.equal(null);
      ll.appendNodeWithValue(0);
      ll.appendNodeWithValue(1);
      ll.appendNodeWithValue(2);
      ll.appendNodeWithValue(3);
      ll.appendNodeWithValue(4);
      
      let result = ll.findMiddle();
      expect(result.value).to.equal(2);
    });

    it('should return 1', function(){
      let ll = new LinkedList();
      expect(ll.head).to.equal(null);
      ll.appendNodeWithValue(0);
      ll.appendNodeWithValue(1);
      ll.appendNodeWithValue(2);
      ll.appendNodeWithValue(3);
      
      let result = ll.findMiddle();
      expect(result.value).to.equal(2);
    });

    //it('should return 0', function(){
      //let ll = new LinkedList();
      //expect(ll.head).to.equal(null);
      //ll.appendNodeWithValue(0);
      //ll.appendNodeWithValue(1);
      
      //let result = ll.findMiddle();
      //expect(result.value).to.equal(0);
    //});
  });
});

