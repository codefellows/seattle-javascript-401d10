'use strict';

module.exports = ['$stateProvider', '$urlRouterProvider', routerConfig];

function routerConfig($stateProvider, $urlRouterProvider){
  $urlRouterProvider.when('/', '/home');
  $urlRouterProvider.when('/hello', '/home');
  
  let routes = [
    {
      name: 'home',
      url: '/home',
      template: require('../view/home/home.html'),
      controller: 'HomeController',
      controllerAs: 'homeCtrl',
    },
    {
      name: 'signup',
      url: '/signup',
      template: require('../view/signup/signup.html'),
      controller: 'SignupController',
      controllerAs: 'signupCtrl',
    },
  ];

  routes.forEach( route => {
    $stateProvider.state(route);
  });
}


// view
//   home
//      home.html
//      home.js
//      home.scss
//   profile 
//      profile.html
//      profile.scss
//      profile.js
