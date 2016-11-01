'use strict';

require('./_navbar.scss');

module.exports = {
  template: require('./navbar.html'),
  controller: ['$log', '$location', '$rootScope', 'authService', NavbarController],
  controllerAs: 'navbarCtrl',
  bindings: {
    appTitle: '@',
  },
};

function NavbarController($log, $location, $rootScope, authService) {
  $log.debug('init navbarCtrl');

  // nav logic specific to $location.path()
  this.checkPath = function(){
    let path = $location.path();
    if (path === '/join'){
      this.hideButtons = true;
      authService.getToken()
      .then(() => {
        $location.url('/home');
      })
    }

    if (path !== '/join'){
      this.hideButtons = false;
      authService.getToken()
      .catch(() => {
        $location.url('/join#login');
      })
    }
  }

  // on pageload call this.checkPath()
  this.checkPath();

  // on page success page change call this.checkPath()
  $rootScope.$on('$locationChangeSuccess', () => {
    this.checkPath();
  });


  this.logout = function(){
    $log.log('navbarCtrl.logout()')
    this.hideButtons = true;
    authService.logout()
    .then(() => {
      $location.url('/')
    })
  }
}
