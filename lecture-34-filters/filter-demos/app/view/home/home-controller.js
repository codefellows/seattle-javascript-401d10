'use strict';

require('./_home.scss');

module.exports = ['$log', '$rootScope', 'galleryService', HomeController ];

function HomeController($log, $rootScope, galleryService){
  $log.debug('init homeCtrl');

  this.today = new Date();
  
  this.galleries = [];

  this.fetchGalleries = function(){
    galleryService.fetchGalleries()
    .then( galleries => {
      this.galleries = galleries;
      this.currentGallery = galleries[0];
    })
  }

  this.galleryDeleteDone = function(gallery){
    $log.debug('homeCtrl.galleryDeleteDone()');
    if (this.currentGallery._id == gallery._id){
      this.currentGallery = null;
    }
  };

  // when the controller gets created fetchGalleries
  this.fetchGalleries();

  // when the locationChangeSuccess fetchGalleries
  $rootScope.$on('$locationChangeSuccess', () => {
    this.fetchGalleries();
  });

}
