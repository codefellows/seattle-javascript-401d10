'use strict';

const angular = require('angular');
const ngAdventure = angular.module('ngAdventure');

ngAdventure.factory('playerService', ['$q', '$log', 'mapService', playerService]);

function playerService($q, $log, mapService){
  $log.debug('init playerService');

  // setup service
  let service = {};
  // add service features 

  let turn = 0;
  let player = service.player = {
    name: 'slugneo',
    location: 'A',
    hp: 16,
  };

  let history = service.history = [ 
    {
      turn,
      desc: 'welcome to the game',
      location: 'A',
      hp: player.hp,
    },
  ];

  service.movePlayer = function(direction){
    return new $q((resolve, reject) => {
      turn++;
      let currentLocation = player.location;
      let newLocation = mapService.mapData[currentLocation][direction];
      if (!newLocation) {
        history.unshift({
          turn,
          desc: 'you hit a wall',
          location: player.location,
          hp: player.hp,
        });
        console.log('history', history);
        return reject('no room in that direction');
      }

      history.unshift({
        turn,
        location: player.location,
        desc: mapService.mapData[newLocation].desc,
        hp: player.hp,
      });
      console.log('history', history);
      player.location = newLocation;
      return resolve(player.location);
    });
  };

  // return service
  return service;
}
