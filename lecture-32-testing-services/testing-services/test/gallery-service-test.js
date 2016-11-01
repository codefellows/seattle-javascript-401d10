'use strict';

describe('testing gallery service', function(){

  // beforeEach mocks the demoApp module
  //            mocks the service

  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject((authService, galleryService, $httpBackend) => {
      this.authService = authService;
      authService.setToken('1234');

      this.galleryService = galleryService;
      this.$httpBackend = $httpBackend;
    })
  })

  describe('testing galleryService.createGallery', () => {
    it('should return a gallery', () => {
      let galleryData = {
        name: 'exampleGallery',
        desc: 'memories from my beach adventure',
      };

      let headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer 1234',
      };

      this.$httpBackend.expectPOST('http://localhost:3000/api/gallery', galleryData, headers)
      .respond(200, {_id: '5678', username: 'slugbyte',  name: galleryData.name, desc: galleryData.desc, pics: []});

      this.galleryService.createGallery(galleryData);
      this.$httpBackend.flush();
    })
  })

  describe('testing galleryService.deleteGallery(galleryID)', () => {
    it('should succed in deleting a gallery', () => {
      // mock the request
      let galleryID = 'helloworld';
      let headers = {
        Authorization: 'Bearer 1234',
        Accept: "application/json, text/plain, */*",
      };

      // mock the server route
      this.$httpBackend.expectDELETE('http://localhost:3000/api/gallery/helloworld', headers)
      .respond(204);

      // make the reuset
      this.galleryService.deleteGallery(galleryID);

      // flush the server mock
      this.$httpBackend.flush();
    })

    it('should respond with a 404', () => {
      let headers = {
        Authorization: 'Bearer 1234',
        Accept: "application/json, text/plain, */*",
      };

      this.$httpBackend.whenDELETE('http://localhost:3000/api/gallery/:galleryID', headers)
      .respond(function(method, url, data, headers, params) {
        if (params.galleryID !== '1234'){
          return [404, 'NotFoundError'];
        }
        return [204]
      })

      this.galleryService.deleteGallery('helloworld')
      .catch(err => {
        console.log('err');
        expect(err.status).toBe(404);
      })

      this.$httpBackend.flush();
    });
  })


});

