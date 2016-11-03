'use strict';

describe('testing edit-gallery controller', function(){

  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject(($rootScope, $componentController, $httpBackend, authService) => {
      authService.setToken('1234');

      this.authService = authService;
      this.$rootScope = $rootScope;
      this.$componentController = $componentController;
      this.$httpBackend = $httpBackend;
    })
  });

  afterEach(() => {
    this.authService.logout();
  });

  it('testing component bindings', () => {
    let mockBindings = {
      gallery: {
        name: 'lulwat',
        desc: 'my cool beach adventure',
      },
    };

    let editGalleryCtrl = this.$componentController('editGallery', null, mockBindings);
    expect(editGalleryCtrl.gallery.name).toEqual(mockBindings.gallery.name);
    expect(editGalleryCtrl.gallery.desc).toEqual(mockBindings.gallery.desc);
    this.$rootScope.$apply();
  })

  describe('testing #updateGallery', () => {

    it('should make a valid PUT request', () => {
      let url = 'http://localhost:3000/api/gallery/12345';
      let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer 1234',
      };

      this.$httpBackend.expectPUT(url, {_id: '12345', name: 'new name', desc: 'hello'}, headers)
      .respond(200);

      let mockBindings = {
        gallery: {
          _id: '12345',
          name: 'lulwat',
          desc: 'hello',
        },
      };

      let editGalleryCtrl = this.$componentController('editGallery', null, mockBindings);
      editGalleryCtrl.gallery.name = 'new name';

      editGalleryCtrl.updateGallery()

      this.$httpBackend.flush();
      this.$rootScope.$apply();

    });
  });
});

