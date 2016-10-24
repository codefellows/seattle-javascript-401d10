'use strict';

// requore home.scss
require('./home.scss');

module.exports = ['$log', HomeController];

function HomeController($log){
  $log.debug('init homeCtrl');
}



