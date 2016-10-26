'use strict';

module.exports = ['$q', '$log', '$http', 'authService', galleryService];

function galleryService($q, $log, $http, authService){
  $log.debug('init galleryService');
  let service = {};

  service.galleries = [];

  service.createGallery = function(gallery){
    $log.debug('galleryService.createGallery()');
    
    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      return $http.post(url, gallery, config);
    })
    .then( res => {
      $log.log('successful create gallery');
      let gallery = res.data;
      service.galleries.unshift(gallery);
      return gallery;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deleteGallerys = function (galleryID, galleryData){ 
    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${galleryID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
    })
  };

  service.fetchGalleries = function(){
    $log.debug('galleryService.fetchGalleries()');
    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      return $http.get(url, config);
    })
    .then( res => {
      $log.log('successful fetch user galleries');
      service.galleries = res.data
      return service.galleries;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    })
  }

  return service;
}
