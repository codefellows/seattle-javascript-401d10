'use strict';

// webpack assets
require('./scss/main.scss');
// npm modules
// require in angular
const angular = require('angular');
// require in angular modules
// create our angular module
angular.module('ngAdventure', []);

// servicecs
require('./service/map-service.js');
require('./service/player-service.js');
// components
require('./component/game-pad/game-pad.js');
require('./component/player-info/player-info.js');
require('./component/game-history/game-history.js');
