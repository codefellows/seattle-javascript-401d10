'use strict'

const angular = require('angular');
const ngAdventure = angular.module('ngAdventure');

ngAdventure.component('gamePad', { // sets tagname to <game-pad> </game-pad>
  template: require('./game-pad.html'),
  controller: 'GamePadController',
  controllerAs: 'gamePadCtrl',
});

ngAdventure.controller('GamePadController', ['$log', 'playerService', GamePadController]);

function GamePadController($log, playerService){
  $log.debug('init gamePadCtrl');

  this.directions = ['north', 'south', 'east', 'west'];
  this.moveDirection = this.directions[0];

  this.movePlayer = function(){
    playerService.movePlayer(this.moveDirection)
    .then( location => {
      $log.log(`player at new location: ${location}`);
    })
    .catch(err => {
      $log.error(err);
    });
  };
}

