'use strict';

module.exports = ['$q', '$log', '$http', 'Upload', 'authService', picService];

function picService($q, $log, $http, Upload, authService){
  $log.debug('init picService');
  let service = {};

  service.uploadGalleryPic = function(galleryData, picData){
    $log.debug('picService.uploadGalleryPic()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${galleryData._id}/pic`;
      let headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      };

      return Upload.upload({
        url,
        headers,
        method: 'POST',
        data: {
          name: picData.name,
          desc: picData.desc,
          file: picData.file,
        },
      });
    })
    .then(res => {
      galleryData.pics.unshift(res.data);
      $log.log('success\n', res.data);
      return res.data;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    })
  }


  service.deleteGalleryPic = function(galleryData, picData){
    // TODO: log the deleteGalleryPic method name
    // TODO: get a token from the auth service
    // TODO: set the url to __API_URL__/api/gallery/:galleryID/pic/:picID
    // TODO: set config for http headers 
    //       set authorization header
    // TODO: make $http.delete request to url with config 
    // TODO: on success you splice the pic out of the galleryData.pics array
    //       resolve undefined
    // TODO: on error log error and reject error
  }

  return service;
}
