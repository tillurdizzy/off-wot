'use strict';

APP.directive('googleTimeline', function () {
    return {
    	restrict: 'A',
    	link: function($scope, elm, attrs) {
    		var chart = new google.visualization.Timeline(elm[0]);
			var options = {
				height:700,
				width:900,
				timeline: { singleColor: '#2d352a' }
			};
    		chart.draw($scope.dataTable);
      		$scope.$watch('currentTimelineData', function() {
      			chart.clearChart();
				chart.draw($scope.dataTable,options);
      		});	
  		}
  	};
});