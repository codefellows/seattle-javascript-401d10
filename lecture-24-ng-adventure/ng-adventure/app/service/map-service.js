'use strict';

const angular = require('angular');
const ngAdventure = angular.module('ngAdventure');

ngAdventure.factory('mapService', ['$log', mapService]);
function mapService($log){
  $log.debug('init mapService');
  // setup service
  let service = {};
  // add features to service 
  service.mapData = {
    A: {
      desc: 'You are in room A. there are two paths leaving this room. the lights are dim',
      south: 'C',
      east: 'B',
    },
    B: {
      desc: 'You are in room B. you cant see anything', 
      west: 'A',
      south: 'D',
    },
    C: {
      desc: 'You are in room C. there is a path to the north. where you see some light', 
      north: 'A',
      east: 'D',
    },
    D: {
      desc: 'You are in room D, you here crazy sounds to the south',
      items: ['lamp'],
      north: 'B',
      west: 'C',
      south: 'X',
    },
    X: {
      desc: 'you are stuck in quick sand',
      south: 'X',
      north: 'X',
      east: 'X',
      west: 'A',
    },
  };
  // return service
  return service;
}
