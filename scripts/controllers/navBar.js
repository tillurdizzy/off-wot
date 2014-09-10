'use strict';


 APP.controller('NavCtrl',['$scope','$location', function ($scope,$location) {
 	$scope.sectiontitle = "Welcome";

    $scope.isCurrentPath = function (path) {
    $scope.sectiontitle = path;
      return $location.path() == path;
    };
    
 }]);