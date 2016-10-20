'use strict';

// require sass
require('./_game-history.scss');

const angular = require('angular');
const ngAdventure = angular.module('ngAdventure');

ngAdventure.component('gameHistory', { // set the tag name to <game-history>
  template: require('./game-history.html'),
  controller: 'GameHistoryController',
  controllerAs: 'gameHistoryCtrl',
});

ngAdventure.controller('GameHistoryController', ['$log', 'playerService', GameHistoryController]);
function GameHistoryController($log, playerService){
  $log.debug('init gameHistoryCtrl');
  this.history = playerService.history;
}

