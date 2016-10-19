'use strict';

require('./lib/test-setup.js');

const angular = require('angular');
let cowsay = require('cowsay-browser');

describe('testing HomeController', function(){
  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject(($controller) => {
      this.cowsayCtrl = new $controller('CowsayController');
    });
  });

  describe('testing default properties', () => {
    it('title should equal "Moooooo"', () => {
      expect(this.cowsayCtrl.title).toBe('Moooooo');
    });

    it('history should be empty array', () => {
      expect(Array.isArray(this.cowsayCtrl.history)).toBe(true);
      expect(this.cowsayCtrl.history.length).toBe(0);
    });

    it('currentCow to equal beavis.zen', () => {
      expect(this.cowsayCtrl.currentCow).toBe('beavis.zen');
    });

    it('should have a default cowfiles list', () => {
      cowsay.list((err, list) => {
        expect(this.cowsayCtrl.cowfiles).toEqual(list);
      });
    });
  });

  describe('testing #updateCow()', () => {
    it('should return a hello baevis.zen', () => {
      let mockResult = '\n' + cowsay.say({text: 'hello', f: this.cowsayCtrl.currentCow});
      let result = this.cowsayCtrl.updateCow('hello');
      expect(result).toBe(mockResult);
    });

    it('should return hello default cow', () => {
      this.cowsayCtrl.currentCow = 'default';
      let mockResult = '\n' + cowsay.say({text: 'hello', f: 'default'});
      let result = this.cowsayCtrl.updateCow('hello');
      expect(result).toBe(mockResult);
    });
  });

  describe('testing #speak()', () => {
    it('should set this.spoken to a beavis.zen hello', () => {
      let mockResult = '\n' + cowsay.say({text: 'hello', f: this.cowsayCtrl.currentCow});
      this.cowsayCtrl.speak('hello');
      expect(this.cowsayCtrl.spoken).toBe(mockResult);
    });

    it('should set this.spoken to a default hello', () => {
      this.cowsayCtrl.currentCow = 'default';
      let mockResult = '\n' + cowsay.say({text: 'hello', f: 'default'});
      this.cowsayCtrl.speak('hello');
      expect(this.cowsayCtrl.spoken).toBe(mockResult);
      expect(this.cowsayCtrl.history.length).toBe(1);
    });
  });

  describe('testing #undo()', () => {
    it('with two history', () => {
      let mockResult = '\n' + cowsay.say({text: 'hello', f: this.cowsayCtrl.currentCow});
      this.cowsayCtrl.speak('hello');// undo should roll back to this 
      this.cowsayCtrl.speak('wat'); // make a second thing to undo from
      this.cowsayCtrl.undo();
      expect(this.cowsayCtrl.spoken).toBe(mockResult);
      expect(this.cowsayCtrl.history.length).toBe(0);
    });

    it('with three history', () => {
      let mockResult = '\n' + cowsay.say({text: 'hello', f: this.cowsayCtrl.currentCow});
      this.cowsayCtrl.speak('hello');// make first history
      this.cowsayCtrl.speak('hello');// undo should roll back to this 
      this.cowsayCtrl.speak('wat'); // make a third thing to undo from
      this.cowsayCtrl.undo();
      expect(this.cowsayCtrl.spoken).toBe(mockResult);
      expect(this.cowsayCtrl.history.length).toBe(1);
    });

    it('with only one history', () => {
      this.cowsayCtrl.speak('hello');// undo should roll back to this 
      this.cowsayCtrl.undo();
      expect(this.cowsayCtrl.spoken).toBe('');
      expect(this.cowsayCtrl.history.length).toBe(0);
    });

    it('with empty history', () => {
      this.cowsayCtrl.undo();
      expect(this.cowsayCtrl.spoken).toBe('');
      expect(this.cowsayCtrl.history.length).toBe(0);
    });
  });
});

