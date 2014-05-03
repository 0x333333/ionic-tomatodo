angular.module('todo', ['ionic'])

/**
 * The Projects factory handles saving and loading projects
 * from local storage, and also lets us save and load the
 * last active project index.
 */
.factory('Projects', function() {
  return {
    all: function() {
      var projectString = window.localStorage['projects'];
      if(projectString) {
        return angular.fromJson(projectString);
      }
      return [];
    },
    save: function(projects) {
      console.log("Save!");
      console.log("Projects:" + angular.toJson(projects));
      window.localStorage['projects'] = angular.toJson(projects);
    },
    newProject: function(projectTitle) {
      // Add a new project
      return {
        title: projectTitle,
        tasks: []
      };
    },
    getLastActiveIndex: function() {
      return parseInt(window.localStorage['lastActiveProject']) || 0;
    },
    setLastActiveIndex: function(index) {
      window.localStorage['lastActiveProject'] = index;
    }
  }
})

.controller('TodoCtrl', function($scope, $timeout, $ionicModal, $ionicActionSheet, Projects) {

  // A utility function for creating a new project
  // with the given projectTitle
  var createProject = function(projectTitle) {
    var newProject = Projects.newProject(projectTitle);
    $scope.projects.push(newProject);
    Projects.save($scope.projects);
    $scope.selectProject(newProject, $scope.projects.length-1);
  };


  // Load or initialize projects
  $scope.projects = Projects.all();
  $scope.showDeleteBtn = false;

  $scope.changeBtnStatus = function() {
    $scope.showDeleteBtn = !$scope.showDeleteBtn;
  };

  // Grab the last active, or the first project
  $scope.activeProject = $scope.projects[Projects.getLastActiveIndex()];
  // Set the active task to be modified
  $scope.activeTask = null;

  // Called to create a new project
  $scope.newProject = function() {
    var projectTitle = prompt('Project name');
    if(projectTitle) {
      createProject(projectTitle);
    }
  };

  // Called to select the given project
  $scope.selectProject = function(project, index) {
    console.log('showDeleteBtn:' + $scope.showDeleteBtn);
    if (!$scope.showDeleteBtn) {
      $scope.activeProject = project;
      Projects.setLastActiveIndex(index);
      $scope.sideMenuController.close();
    }
  };

  $scope.completionChanged = function(task) {
    task.isComplete = ! task.isComplete;
    Projects.save($scope.projects);
  };

  $scope.taskClick = function(task, $event) {
    // console.log('Task clicked:' + task.title);
    // console.log('Task clicked with event:' + $event.target);
    if ($event.target != "[object HTMLInputElement]") {
      console.log(task.$$hashKey);
      $scope.activeTask = task;
      

      // Show the action sheet
      $ionicActionSheet.show({

        // The various non-destructive button choices
        buttons: [
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
            // Move task up 
            var indexOfActiveProject = $scope.projects.indexOf($scope.activeProject);
            var indexOfTask = $scope.activeProject.tasks.indexOf(task);
            console.log('index of task:' + indexOfTask);
            $scope.projects[indexOfActiveProject].tasks.splice(indexOfTask, 1);
            $scope.projects[indexOfActiveProject].tasks.unshift(task);
            Projects.save($scope.projects);
          } else if (index === 1) {
            // Edit task
            $scope.EditTaskModal.show();
          } else if (index === 2) {
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
          Projects.save($scope.projects);
          return true;
        }
      });
    }
  };

  $scope.snsClick = function(task) {
    $scope.activeTask = task;

    // Show the action sheet
    $ionicActionSheet.show({

      // The various non-destructive button choices
      buttons: [
        { text: 'Facebook' },
        { text: 'Twitter' },
        { text: 'Google Plus' },
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
        } else if (index === 1) {
          // Edit task
          console.log('Twitter');
        } else if (index === 2) {
          // Share to social networks
          console.log('Google Plus');
        }
        return true;
      },
    });
  };

  // Called to deleted selected project
  $scope.onItemDelete = function(project) {
    console.log('project:' + project);
    var indexOfProject = $scope.projects.indexOf(project);
    console.log('index of project:' + indexOfProject);
    // Set the first project as active project
    $scope.activeProject = $scope.projects[-1];
    Projects.setLastActiveIndex(-1);
    // Delete selected project
    $scope.projects.splice($scope.projects.indexOf(project), 1);
    // Save to local storage
    Projects.save($scope.projects);
    if ($scope.projects.length == 0) {
      $scope.showDeleteBtn = false;
    }
  };




  // Create our modal
  $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
    $scope.NewTaskModal = modal;
  }, {
    focusFirstInput: false,
    scope: $scope
  });

  // Modify our modal
  $ionicModal.fromTemplateUrl('edit-task.html', function(modal) {
    $scope.EditTaskModal = modal;
  }, {
    focusFirstInput: false,
    scope: $scope
  });




  $scope.createTask = function(task) {
    if(!$scope.activeProject) {
      return;
    }
    $scope.activeProject.tasks.push({
      title: task.title
    });
    $scope.NewTaskModal.hide();

    // Inefficient, but save all the projects
    Projects.save($scope.projects);

    task.title = "";
  };

  $scope.modifyTask = function(task) {
    if(!$scope.activeProject) {
      return;
    }
    // Get the index of selected task
    var indexofSelectedTask = $scope.activeProject.tasks.indexOf($scope.activeTask);
    // Set the new name to selected task
    $scope.activeProject.tasks[indexofSelectedTask].title = task.title;
    // Close dialog
    $scope.EditTaskModal.hide();

    // Inefficient, but save all the projects
    Projects.save($scope.projects);

    task.title = "";
  };

  $scope.newTask = function() {
    $scope.NewTaskModal.show();
  };

  $scope.closeNewTask = function() {
    $scope.NewTaskModal.hide();  
  }

  $scope.closeEditTask = function() {
    $scope.EditTaskModal.hide();  
  }

  $scope.toggleProjects = function() {
    $scope.sideMenuController.toggleLeft();
    $scope.showDeleteBtn = false;
  };


  // Try to create the first project, make sure to defer
  // this by using $timeout so everything is initialized
  // properly
  $timeout(function() {
    if($scope.projects.length == 0) {
      while(true) {
        var projectTitle = prompt('Your first project title:');
        if(projectTitle) {
          createProject(projectTitle);
          break;
        }
      }
    }
  });

});

