angular.module('starter.controller_charts', [])

.controller('ChartsCtrl', function($scope, $window, ProjectService) {
	console.log('-- ChartsCtrl');	

	_scope_charts = $scope;

	$scope.dataTheme = {
		theme: ProjectService.getTheme()
	};

	$scope.back = function() {
		window.history.back();
	};

	$scope.history  = ProjectService.getHistory();
	$scope.projects = ProjectService.all();
	$scope.numProj  = $scope.projects.length;
	$scope.numTask  = 0;
	$scope.completed= 0;


	$scope.data1    = [];
	$scope.data2    = [];
	$scope.series   = [];


	$scope.projects.forEach(function(p) {
		$scope.data1.push({
			projectName: p.title,
			numTask    : p.tasks.length
		});
	});

	$("#chartContainer1").dxPieChart({
			dataSource: $scope.data1,
			palette: "Soft Pastel",
			legend: {
					horizontalAlignment: "right",
					verticalAlignment: "top",
					margin: 0
			},
			pointClick: function(point) {
					point.select();
			},
			series: [{
				type: "doughnut",
				argumentField: "projectName",
				valueField: "numTask",
				hoverStyle: {
					color: "#ffd700" 
				},
				// label: {
    //       visible: true,
    //       connector: {
    //         visible: true,
    //         width: 1
    //       },
    //       customizeText: function(arg) {
    //         return arg.valueText + " tasks (" + arg.percentText + ")";
    //       }
    //     }
			}]
	});

	$scope.projects.forEach(function(p) {
		$scope.numTask = $scope.numTask + p.tasks.length;
		p.tasks.forEach(function(t) {
			if (t.isComplete) {
				$scope.completed ++;
			}
		});
	});

	// Get last 7 days.
	for (var i = 6; i >= 0; i--) {
		var dateObj = new Date();
		dateObj.setDate(dateObj.getDate() - i);

		var dd    = dateObj.getDate();
		var mm    = dateObj.getMonth() + 1;  // January is 0!
		dd = (dd < 10) ? '0' + dd : dd;
		mm = (mm < 10) ? '0' + mm : mm;
		
		$scope.data2.push({
			date: mm + '/' + dd
		});
	}

	// Initialize projects in each day
	$scope.data2.forEach(function(day) {
		for (var i = 0; i < $scope.projects.length; i++) {
			day[$scope.projects[i].title] = 0;
		}
	});

	// Assign number of tasks for each project
	$scope.history.forEach(function(h) {
		if (h.type === 1) {
			$scope.data2.forEach(function(d) {
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

	console.log($scope.data2);

	$(function () {
		$("#chartContainer2").dxChart({
			dataSource: $scope.data2,
			palette: "Soft Pastel",
			commonSeriesSettings: {
				argumentField: "date",
				type: "stackedLine"
			},
			series: $scope.series,
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
			argumentAxis: {
				label: {
					visible: false
				}
			},
		});
	});

	


});