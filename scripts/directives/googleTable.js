'use strict';

myApp.directive('googleChart', function () {
    return {
      restrict: 'A',
      link: function($scope, elm, attrs) {
         
              chartType.draw($scope.chart.data, $scope.chart.options);
            };
          }); 
      }
    };
});