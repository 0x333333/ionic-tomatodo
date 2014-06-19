angular.module('starter.controller_themes', [])

.controller('ThemesCtrl', function($scope, $window, ProjectService) {
	console.log('-- ThemesCtrl');	

	_scope_theme = $scope;

	$scope.back = function() {
		window.location = '';
	};

	$scope.data = {
		theme: ProjectService.getTheme()
	};

	$scope.colorChange = function(c) {
		console.log('change:', c);
		$scope.data.theme = c;
		ProjectService.saveTheme(c);
	};
});