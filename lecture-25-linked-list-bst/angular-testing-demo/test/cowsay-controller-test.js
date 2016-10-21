'use strict';

const cowsay = require('cowsay-browser');

describe('testing cowsayCtrl', function(){
  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject($controller => {
      this.cowsayCtrl = new $controller('CowsayController');
    });
  });

  describe('testing initial properties', () => {
    it('title should equal Moooooo', () => {
      expect(this.cowsayCtrl.title).toBe('Moooooo');
    });

    it('history should be empty array', () => {
      expect(Array.isArray(this.cowsayCtrl.history)).toBe(true);
    });

    it('cowfiles should be same as cowsay.list', () => {
      cowsay.list((err, list) => {
        expect(this.cowsayCtrl.cowfiles).toEqual(list);
        expect(this.cowsayCtrl.currentCow).toEqual(list[0]);
      });
    });
  });

  describe('testing #updateCow()', () => {
    it('should return a bevis.zen hello', () => {
      let expectedResult = '\n' + cowsay.say({text: 'hello', f: this.cowsayCtrl.currentCow});
      let result = this.cowsayCtrl.updateCow('hello'); 
      expect(result).toEqual(expectedResult);
    });
  });

  describe('testing #speak()', () => {
    it('should return a bevis.zen hello', () => {
      let expectedResult = '\n' + cowsay.say({text: 'hello', f: this.cowsayCtrl.currentCow});
      this.cowsayCtrl.speak('hello'); 
      expect(this.cowsayCtrl.spoken).toEqual(expectedResult);
      expect(this.cowsayCtrl.history[0]).toEqual(expectedResult);
    });
  });

  describe('testing #undo()', () => {
    it('should return a bevis.zen hello', () => {
      let expectedResult = '\n' + cowsay.say({text: 'hello', f: this.cowsayCtrl.currentCow});
      this.cowsayCtrl.speak('hello');  // undo back to
      this.cowsayCtrl.speak('lulwat'); // undo from
      this.cowsayCtrl.undo(); 
      expect(this.cowsayCtrl.spoken).toEqual(expectedResult);
      expect(this.cowsayCtrl.history.length).toEqual(0);
    });
  });

});
