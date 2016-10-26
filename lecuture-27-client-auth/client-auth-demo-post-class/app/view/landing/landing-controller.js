'use strict';

require('./_landing.scss');

module.exports = ['$log', '$location', 'authService', LandingController];

function LandingController($log, $location, authService ){
  let url = $location.url();
  this.showSignup = url === '/join#signup' || url === '/join';
}
