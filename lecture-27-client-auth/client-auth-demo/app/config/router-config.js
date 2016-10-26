'use strict';

module.exports = ['$stateProvider', '$urlRouterProvider', routerConfig];

function routerConfig($stateProvider, $urlRouterProvider){
  //$urlRouterProvider.when('' , '/');
  //$urlRouterProvider.when('/' , '/signup');

  let states = [
    {
      name: 'home',
      url: '/home',
      controllerAs: 'homeCtrl',
      controller: 'HomeController',
      template: require('../view/home/home.html'),
    },
    {
      name: 'Welcome',
      url: '/',
      controllerAs: 'landingCtrl',
      controller: 'LandingController',
      template: require('../view/landing/landing.html'),
    },
  ];

  states.forEach(state => {
    $stateProvider.state(state);
  });
}
