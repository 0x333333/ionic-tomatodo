angular.module('todo', ['ionic'])

.factory('Projects', function() {
  return {
    all: function() {
      var projectString = window.localStorage.projects;
      if(projectString) {
        return angular.fromJson(projectString);
      }
      return [];
    },
    save: function(projects) {
      console.log("Save!");
      console.log("Projects:" + angular.toJson(projects));
      window.localStorage.projects = angular.toJson(projects);
    },
    newProject: function(projectTitle) {
      // Add a new project
      return {
        title: projectTitle,
        tasks: []
      };
    },
    getLastActiveIndex: function() {
      return parseInt(window.localStorage.lastActiveProject) || 0;
    },
    setLastActiveIndex: function(index) {
      window.localStorage.lastActiveProject = index;
    }
  };
})


.controller('TodoCtrl', function($scope, $timeout, $ionicModal, $ionicActionSheet, Projects) {

  // Initialize search bar content
  $scope.query = '';
  _scope = $scope;

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

  // Called to search tasks in current active project
  $scope.search = function() {
    console.log($scope.query);
  };

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


  // Task click function
  $scope.taskClick = function(task, $event) {
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
            var indexofSelectedTask = $scope.activeProject.tasks.indexOf($scope.activeTask);
            $scope.oldTask = $scope.activeProject.tasks[indexofSelectedTask];
            console.log($scope.oldTask);
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
    if ($scope.projects.length === 0) {
      $scope.showDeleteBtn = false;
    }
  };




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

    $scope.NewTaskModal.hide();

    // Inefficient, but save all the projects
    Projects.save($scope.projects);

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
    Projects.save($scope.projects);

    task.title    = "";
    task.content  = "";
    task.deadline = "";
    task.tags     = "";
  };

  $scope.newTask = function() {
    $scope.NewTaskModal.show();
  };

  $scope.closeNewTask = function() {
    $scope.NewTaskModal.hide();  
  };

  $scope.closeEditTask = function() {
    $scope.EditTaskModal.hide();  
  };

  $scope.toggleProjects = function() {
    $scope.sideMenuController.toggleLeft();
    $scope.showDeleteBtn = false;
  };


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

});

