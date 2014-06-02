angular.module('starter.controller_charts', [])

.controller('ChartsCtrl', function($scope, $window, ProjectService) {
	console.log('-- ChartsCtrl');	

	$scope.back = function() {
		window.history.back();
	};

	$scope.projects = ProjectService.all();
	$scope.numTask  = 0;
	$scope.completed= 0;

	$scope.projects.forEach(function(p) {
		$scope.numTask = $scope.numTask + p.tasks.length;
		p.tasks.forEach(function(t) {
			if (t.isComplete) {
				$scope.completed ++;
			}
		});
	});
})

.controller('NewCtrl', function($scope, $window, ProjectService) {
	console.log('-- NewCtrl');

	_scope_charts = $scope;

	$scope.back = function() {
	window.history.back();
	};

	$scope.history  = ProjectService.getHistory();
	$scope.projects = ProjectService.all();
	$scope.data     = [];
	$scope.series   = [];

	// Get last 7 days.
	for (var i = 6; i >= 0; i--) {
		var dateObj = new Date();
		dateObj.setDate(dateObj.getDate() - i);

		var dd    = dateObj.getDate();
		var mm    = dateObj.getMonth() + 1;  // January is 0!
		dd = (dd < 10) ? '0' + dd : dd;
		mm = (mm < 10) ? '0' + mm : mm;
		
		$scope.data.push({
			date: mm + '/' + dd
		});
	}

	// Initialize projects in each day
	$scope.data.forEach(function(day) {
		for (var i = 0; i < $scope.projects.length; i++) {
			day[$scope.projects[i].title] = 0;
		}
	});

	// Assign number of tasks for each project
	$scope.history.forEach(function(h) {
		if (h.type === 0) {
			$scope.data.forEach(function(d) {
				// console.log(h, d);
				if (d.date === h.date) {
					d[h.project] ++;
				}
			});
		}
	});

	// Initialize series
	$scope.projects.forEach(function(p) {
		$scope.series.push({
			valueField: p.title,
			name      : p.title
		});
	});

	console.log($scope.data);

	(function () {
		$("#chartContainer").dxChart({
			dataSource: $scope.data,
			commonSeriesSettings: {
				argumentField: "date",
				type: "stackedLine"
			},
			series: $scope.series,
			title: "New tasks for last week",
			legend: {
				verticalAlignment: "bottom",
				horizontalAlignment: "center"
			},
			commonPaneSettings: {
				border: {
					visible: true            
				}
			},
			commonAxisSettings: {
				grid: {
					visible: true
				}
			},
		});
	})();

})

.controller('FinishedCtrl', function($scope, $window, ProjectService) {
	console.log('-- FinishedCtrl');

	_scope_charts = $scope;

	$scope.back = function() {
		window.history.back();
	};

	$scope.history  = ProjectService.getHistory();
	$scope.projects = ProjectService.all();
	$scope.data     = [];
	$scope.series   = [];

	// Get last 7 days.
	for (var i = 6; i >= 0; i--) {
		var dateObj = new Date();
		dateObj.setDate(dateObj.getDate() - i);

		var dd    = dateObj.getDate();
		var mm    = dateObj.getMonth() + 1;  // January is 0!
		dd = (dd < 10) ? '0' + dd : dd;
		mm = (mm < 10) ? '0' + mm : mm;
		
		$scope.data.push({
			date: mm + '/' + dd
		});
	}

	// Initialize projects in each day
	$scope.data.forEach(function(day) {
		for (var i = 0; i < $scope.projects.length; i++) {
			day[$scope.projects[i].title] = 0;
		}
	});

	// Assign number of tasks for each project
	$scope.history.forEach(function(h) {
		if (h.type === 1) {
			$scope.data.forEach(function(d) {
				// console.log(h, d);
				if (d.date === h.date) {
					d[h.project] ++;
				}
			});
		}
	});

	// Initialize series
	$scope.projects.forEach(function(p) {
		$scope.series.push({
			valueField: p.title,
			name      : p.title
		});
	});

	console.log($scope.data);

	(function () {
		$("#chartContainer2").dxChart({
			dataSource: $scope.data,
			commonSeriesSettings: {
				argumentField: "date",
				type: "stackedLine"
			},
			series: $scope.series,
			title: "Production of last week",
			legend: {
				verticalAlignment: "bottom",
				horizontalAlignment: "center"
			},
			commonPaneSettings: {
				border: {
					visible: true            
				}
			},
			commonAxisSettings: {
				grid: {
					visible: true
				}
			},
		});
	})();

});