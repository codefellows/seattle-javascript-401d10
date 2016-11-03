'use strict';

describe('testing auth-service', function(){

  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject(( $rootScope, authService, $window, $httpBackend) => {
      this.$window = $window;
      this.$rootScope = $rootScope;
      this.authService = authService;
      this.$httpBackend = $httpBackend;
    });
  });

  describe('testing #getToken()', () => {
    it('should return a token', () => {
      this.authService.token = 'hello world token';

      this.authService.getToken()
      .then( token => {
        expect(token).toEqual('hello world token');
      })

      this.$rootScope.$apply();
    });
  });

  describe('testing #getToken()', () => {
    it('should return a token', () => {
      this.authService.token = null;
      this.$window.localStorage.setItem('token', 'hello world token two');

      this.authService.getToken()
      .then( token => {
        console.log('get Twoken two');
        expect(token).toEqual('hello world token two');
      })
      .catch( err => {
        expect(err).toEqual(null);
      })

      this.$rootScope.$apply();
    });
  });

});
