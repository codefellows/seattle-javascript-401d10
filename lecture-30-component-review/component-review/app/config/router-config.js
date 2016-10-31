'use strict';

module.exports = ['$stateProvider', '$urlRouterProvider', routerConfig];

function routerConfig($stateProvider, $urlRouterProvider){
  $urlRouterProvider.when('', '/home');
  $urlRouterProvider.when('/login', '/home#login');
  $urlRouterProvider.when('/logout', '/home#logout');

  let states = [
    {
      name: 'home',
      url: '/home',
      controllerAs: 'homeCtrl',
      controller: 'HomeController',
      template: require('../view/home/home.html'),
    },
  ];

  states.forEach(state => {
    $stateProvider.state(state);
  });
}
