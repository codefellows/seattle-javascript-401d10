'use strict';

// require webpack assets
require('./scss/main.scss');

// npm modules
const cowsay = require('cowsay-browser');
const angular = require('angular');

// app modules

// angular module
const demoApp = angular.module('demoApp', []);

// angular constructus
demoApp.controller('CowsayController', [ '$log', CowsayController]);

function CowsayController($log){
  $log.debug('init cowsayCtrl');
  this.title = 'Moooooo';
  this.history = [];

  cowsay.list((err, cowfiles) => {
    this.cowfiles = cowfiles;
    this.currentCow = this.cowfiles[0];
  });

  this.updateCow = function(input){
    $log.debug('this.updateCow()');
    return '\n' + cowsay.say({text: input || 'gimme something to say', f: this.currentCow}); 
  };

  this.speak = function(input){
    $log.debug('this.updateCow()');
    this.spoken = this.updateCow(input);
    this.history.push(this.spoken);
  };

  this.undo = function(){
    $log.debug('this.undo()');
    this.history.pop(); // get rid of the current thing
    this.spoken = this.history.pop() || ''; // set the last thing
  };
}

demoApp.controller('NavController', ['$log', NavController]);
function NavController($log){
  $log.debug('inti navCtrl');
  this.routes = [
    {
      name: 'Home',
      url: '/home',
    },
    {
      name: 'About',
      url: '/about',
    },
  ];
}
