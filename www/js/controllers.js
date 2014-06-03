angular.module('starter.controllers', ['starter.controller_charts', 'starter.controller_themes'])

.controller('Ctrl', function($scope, ProjectService) {
	// Set global theme
	$scope.data    = {
		theme: ProjectService.getTheme()
	};
})

.controller('AppCtrl', function($scope, $timeout, $ionicModal, $ionicActionSheet, $window, ProjectService) {

	////////////////////////   Parameters   ////////////////////////
	_scope         = $scope;
	$scope.query   = '';
	$scope.history = ProjectService.getHistory();


	////////////////////////   Project   ////////////////////////

	$scope.projects      = ProjectService.all();
	$scope.showDeleteBtn = false;
	$scope.activeProject = $scope.projects[ProjectService.getLastActiveIndex()];


	// Called to create a new project with project title
	var createProject = function(projectTitle) {
		var newProject = ProjectService.newProject(projectTitle);
	$scope.projects.push(newProject);
	ProjectService.save($scope.projects);
	$scope.selectProject(newProject, $scope.projects.length-1);
	};

	// Called to create a new project
	$scope.newProject = function() {
		var projectTitle = prompt('Project name');
		if(projectTitle) {
			var newProject = ProjectService.newProject(projectTitle);
			$scope.projects.push(newProject);
			ProjectService.save($scope.projects);
			$scope.selectProject(newProject, $scope.projects.length-1);
		}
	};

	// Called to deleted selected project
	$scope.deleteProject = function(project) {
		console.log('delete project:' + project);
		// Set active project to null
		$scope.activeProject = $scope.projects[-1];
		ProjectService.setLastActiveIndex(-1);
		// Delete selected project
		$scope.projects.splice($scope.projects.indexOf(project), 1);
		// Save to local storage
		ProjectService.save($scope.projects);
		// If all project list is empty, disable delete button
		if ($scope.projects.length === 0) {
			$scope.showDeleteBtn = false;
		}
	};

	// Called to select the given project
	$scope.selectProject = function(project, index) {
		$scope.activeProject = project;
		ProjectService.setLastActiveIndex(index);
	};


	////////////////////////   Task   ////////////////////////

	$scope.activeTask = null;

	var getCurrentDate = function () {
		var today = new Date();
		var dd    = today.getDate();
		var mm    = today.getMonth() + 1;  // January is 0!

		dd = (dd < 10) ? '0' + dd : dd;
		mm = (mm < 10) ? '0' + mm : mm;

		return mm + '/' + dd;
	};

	// Called when task is complete
	$scope.completionChanged = function(task) {
		task.isComplete = ! task.isComplete;
		ProjectService.save($scope.projects);
	};

	$scope.createTask = function(task) {
		if(!$scope.activeProject) {
			return;
		}

		$scope.activeProject.tasks.push({
			title   : task.title,
			content : task.content,
			deadline: task.deadline,
			tags    : task.tags
		});

		$scope.history.push({
			date    : getCurrentDate(),
			project : $scope.activeProject.title,
			type    : 0
		});

		$scope.NewTaskModal.hide();

		// Inefficient, but save all the projects
		ProjectService.save($scope.projects);
		ProjectService.saveHistory($scope.history);

		task.title    = "";
		task.content  = "";
		task.deadline = "";
		task.tags     = "";
	};

	$scope.modifyTask = function(task) {
		if(!$scope.activeProject) {
			return;
		}
		// Get the index of selected task
		var indexofSelectedTask = $scope.activeProject.tasks.indexOf($scope.activeTask);
		// Set the new name to selected task
		$scope.activeProject.tasks[indexofSelectedTask].title    = task.title;
		$scope.activeProject.tasks[indexofSelectedTask].content  = task.content;
		$scope.activeProject.tasks[indexofSelectedTask].deadline = task.deadline;
		$scope.activeProject.tasks[indexofSelectedTask].tags     = task.tags;
		// Close dialog
		$scope.EditTaskModal.hide();

		// Inefficient, but save all the projects
		ProjectService.save($scope.projects);

		task.title    = "";
		task.content  = "";
		task.deadline = "";
		task.tags     = "";
	};

	// Called when task is clicked
	$scope.taskClick = function(task) {
		console.log(task.$$hashKey);
		$scope.activeTask = task;
		
		// Show the action sheet
		$ionicActionSheet.show({

			// The various non-destructive button choices
			buttons: [
				{ text: task.isComplete ? 'Restart':'Complete' },
				{ text: 'Move Top' },
				{ text: 'Edit Task' },
				{ text: 'Share To SNS' },
			],

			// The text of the red destructive button
			destructiveText: 'Delete',

			// The title text at the top
			titleText: 'Menu',

			// The text of the cancel button
			cancelText: 'Cancel',

			// Called when the sheet is cancelled, either from triggering the
			// cancel button, or tapping the backdrop, or using escape on the keyboard
			cancel: function() {
			},

			// Called when one of the non-destructive buttons is clicked, with
			// the index of the button that was clicked. Return
			// "true" to tell the action sheet to close. Return false to not close.
			buttonClicked: function(index) {
				if (index === 0) {
					task.isComplete = !task.isComplete;
					if (task.isComplete) {
						$scope.history.push({
							date    : getCurrentDate(),
							project : $scope.activeProject.title,
							type    : 1
						});
					ProjectService.save($scope.projects);
					ProjectService.saveHistory($scope.history);
					}
				} else if (index === 1) {
					// Move task up 
					var indexOfActiveProject = $scope.projects.indexOf($scope.activeProject);
					var indexOfTask = $scope.activeProject.tasks.indexOf(task);
					console.log('index of task:' + indexOfTask);
					$scope.projects[indexOfActiveProject].tasks.splice(indexOfTask, 1);
					$scope.projects[indexOfActiveProject].tasks.unshift(task);
					ProjectService.save($scope.projects);
				} else if (index === 2) {
					// Edit task
					$scope.EditTaskModal.show();
					var indexofSelectedTask = $scope.activeProject.tasks.indexOf($scope.activeTask);
					$scope.oldTask = $scope.activeProject.tasks[indexofSelectedTask];
					console.log($scope.oldTask);
				} else if (index === 3) {
					// Share to social networks
					$scope.snsClick(task);
				}
				return true;
			},

			// Called when the destructive button is clicked. Return true to close the
			// action sheet. False to keep it open
			destructiveButtonClicked: function() {
				var indexOfActiveProject = $scope.projects.indexOf($scope.activeProject);
				var indexOfTask = $scope.activeProject.tasks.indexOf(task);
				console.log('index of task:' + indexOfTask);
				$scope.projects[indexOfActiveProject].tasks.splice(indexOfTask, 1);
				ProjectService.save($scope.projects);
				return true;
			}
		});
	};

	// SNS click function
	$scope.snsClick = function(task) {
		$scope.activeTask = task;

		// Show the action sheet
		$ionicActionSheet.show({

			// The various non-destructive button choices
			buttons: [
				{ text: 'Facebook' },
				{ text: 'Twitter' },
			],

			// The title text at the top
			titleText: 'Share to',

			// The text of the cancel button
			cancelText: 'Cancel',

			// Called when the sheet is cancelled, either from triggering the
			// cancel button, or tapping the backdrop, or using escape on the keyboard
			cancel: function() {
				//
			},

			// Called when one of the non-destructive buttons is clicked, with
			// the index of the button that was clicked. Return
			// "true" to tell the action sheet to close. Return false to not close.
			buttonClicked: function(index) {
				if (index === 0) {
					// Move task up 
					console.log('Facebook');
					window.open('http://www.facebook.com/sharer.php?s=100&p[title]=TODO' + '&p[summary]=I\'m working on' + task.title + '&p[url]=http://todo.zhipengjiang.com', 'location=no,toolbar=0');
				} else if (index === 1) {
					// Edit task
					window.open('https://twitter.com/intent/tweet?text=I\'m working on '+task.title+' with&hashtags=TODO', '_blank', 'location=no,toolbar=yes');
					console.log('Twitter');
				}
				return true;
			},
		});
	};


	////////////////////////   Modals   ////////////////////////

	// Create new task modal
	$ionicModal.fromTemplateUrl('new-task.html', function(modal) {
		$scope.NewTaskModal = modal;
	}, {
		focusFirstInput: false,
		scope: $scope
	});

	// Modify task modal
	$ionicModal.fromTemplateUrl('edit-task.html', function(modal) {
		$scope.EditTaskModal = modal;
	}, {
		focusFirstInput: false,
		scope: $scope
	});


	////////////////////////   Right Menu   ////////////////////////

	// Contact me
	$scope.contactMe = function() {
	$window.open('https://mail.google.com/mail/?view=cm&fs=1&to=jesusjzp@gmail.com', '_blank', 'location=yes');
	};

	// Export data

	// Import data



	// Try to create the first project, make sure to defer
	// this by using $timeout so everything is initialized
	// properly
	$timeout(function() {
		if($scope.projects.length === 0) {
			while(true) {
				var projectTitle = prompt('Your first project title:');
				if(projectTitle) {
					createProject(projectTitle);
					break;
				}
			}
		}
	});

})

.controller('AboutCtrl', function($scope, $window) {
	$scope.back = function() {
	window.history.back();
  };
});