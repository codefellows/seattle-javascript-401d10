'use strict';

module.exports = function(){
  return {
    restrict: 'EAC',
    template: require('./navbar.html'),
    controller: ['$log', NavbarController],
    bindToController: true,
    controllerAs: 'navbarCtrl',
    scope: {
      title: '@',
    },
  };
};

function NavbarController(){
}
