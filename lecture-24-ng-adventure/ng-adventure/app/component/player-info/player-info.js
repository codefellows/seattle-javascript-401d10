'use strict';

// inport the sass
require('./_player-info.scss');

const angular = require('angular');
const ngAdventure = angular.module('ngAdventure');

ngAdventure.component('playerInfo', { /// this sets the tag to be <player-info> </player-info>
  template: require('./player-info.html'),
  controller: 'PlayerInfoController',
  controllerAs: 'playerInfoCtrl',
});

ngAdventure.controller('PlayerInfoController', ['$log', 'playerService', PlayerInfoController]);

function PlayerInfoController($log, playerService){
  this.player = playerService.player;
}
