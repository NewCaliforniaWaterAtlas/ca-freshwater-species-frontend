'use strict';

/* jasmine specs for controllers go here */

describe('fsfApp controllers', function() {

  describe('TaxonomicGroupListCtrl', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(module('fsfApp'));
    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('data/taxonomic_groups.json').respond([
        {"name":"All species","count":4769},
        {"name":"Insects","count":3239},
        {"name":"Plants","count":826},
        {"name":"Mollusks","count":215},
        {"name":"Crustaceans","count":188},
        {"name":"Fishes","count":130},
        {"name":"Birds","count":105},
        {"name":"Herps","count":60},
        {"name":"Mammals","count":6}
      ]);
      scope = $rootScope.$new();
      ctrl = $controller('TaxonomicGroupListCtrl', {$scope: scope});
    }));

    it('should make an http request to populate scope when no localStorage is found', function() {
      localStorage.clear();
      expect(scope.taxonomic_groups).toBeUndefined();
      $httpBackend.flush();
      expect(scope.taxonomic_groups).toEqual([
        {"name":"All species","count":4769,"className":"all-species"},
        {"name":"Insects","count":3239,"className":"insects"},
        {"name":"Plants","count":826,"className":"plants"},
        {"name":"Mollusks","count":215,"className":"mollusks"},
        {"name":"Crustaceans","count":188,"className":"crustaceans"},
        {"name":"Fishes","count":130,"className":"fishes"},
        {"name":"Birds","count":105,"className":"birds"},
        {"name":"Herps","count":60,"className":"herps"},
        {"name":"Mammals","count":6,"className":"mammals"}
        ]);
    });

    it('should find scope populated at all times unless localStorage is explicitly cleared', function() {
      expect(scope.taxonomic_groups).toBeDefined();
    });

  });
});
