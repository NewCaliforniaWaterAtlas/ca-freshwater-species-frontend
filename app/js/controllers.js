'use strict';

/* Controllers */

var fsfApp = angular.module('fsfApp', ['LocalStorageModule'])
  .config(function (localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('fsfApp')
      .setStorageType('localStorage')
  });

fsfApp.controller('TaxonomicGroupListCtrl', ['$scope', '$http', 'localStorageService', function($scope, $http, localStorageService) {
  var taxonomic_groups;
  if (localStorageService.keys().indexOf('taxonomic_groups') >= 0) {
    $scope.taxonomic_groups = localStorageService.get('taxonomic_groups');
  } else {
    $http.get('data/taxonomic_groups.json').success(function(data) {
      taxonomic_groups = data;
      for (var i = 0; i < taxonomic_groups.length; i++) {
        if (taxonomic_groups[i]['name'].match('^Insects')) {
          taxonomic_groups[i]['name'] = 'Insects';
        }
        taxonomic_groups[i]['className'] = taxonomic_groups[i]['name'].toLowerCase().replace(/\s/g, '-');
      }
      localStorageService.set('taxonomic_groups', taxonomic_groups);
      $scope.taxonomic_groups = taxonomic_groups;
    })
  }

}]);

fsfApp.controller('SpeciesListCtrl', ['$scope', '$http', 'localStorageService', function($scope, $http, localStorageService) {
  var species;
  if (localStorageService.keys().indexOf('species') >= 0) {
    $scope.species = localStorageService.get('species');
  } else {
    $http.get('http://localhost:5010/species/').success(function(data) {
      species = data.species;
      var holder = {}, speciesId;
      for (var i = 0; i < species.length; i++ ) {
        speciesId = Object.keys(species[i]);
        holder[speciesId] = species[i][speciesId];
      }
      species = holder;
      localStorageService.set('species', species);
      console.log('post loop species: ', species);
      $scope.species = species;
    })
  }

}]);
