'use strict';

module.exports = {
  controllerAs: 'uploadPicCtrl',
  template: require('./upload-pic.html'),
  controller: ['$log', 'picService', UploadPicController],
  bindings: {
    gallery: '<',
  },
};

function UploadPicController($log, picService){
  $log.debug('init uploadPicCtrl');
  this.pic = {},
  this.uploadPic = function(){
    picService.uploadGalleryPic(this.gallery, this.pic)
    .then(() => {
      this.pic.name = null;
      this.pic.desc = null;
      this.pic.file = null;
    })
  }
}
