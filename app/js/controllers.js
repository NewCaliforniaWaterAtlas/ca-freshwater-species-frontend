'use strict';

/* Controllers */

var fsfApp = angular.module('fsfApp', []);

fsfApp.controller('TaxonomicGroupListCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('data/taxonomic_groups.json').success(function(data) {
    var taxonomic_groups = data;
    for (var i = 0; i < taxonomic_groups.length; i++) {
      if (taxonomic_groups[i]['name'].match('^Insects')) {
        taxonomic_groups[i]['name'] = 'Insects';
      }
      taxonomic_groups[i]['className'] = taxonomic_groups[i]['name'].toLowerCase().replace(/\s/g, '-');
    }
    $scope.taxonomic_groups = taxonomic_groups;
  })

}]);
