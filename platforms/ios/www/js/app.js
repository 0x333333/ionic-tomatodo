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

.controller('TodoCtrl', function($scope, $timeout, $ionicModal, Projects) {

  // A utility function for creating a new project
  // with the given projectTitle
  var createProject = function(projectTitle) {
    var newProject = Projects.newProject(projectTitle);
    $scope.projects.push(newProject);
    Projects.save($scope.projects);
    $scope.selectProject(newProject, $scope.projects.length-1);
  }


  // Load or initialize projects
  $scope.projects = Projects.all();
  $scope.showDeleteBtn = false;

  $scope.changeBtnStatus = function() {
    $scope.showDeleteBtn = !$scope.showDeleteBtn;
  }

  // Grab the last active, or the first project
  $scope.activeProject = $scope.projects[Projects.getLastActiveIndex()];

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
    };
  };

  $scope.completionChanged = function() {
    Projects.save($scope.projects);
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
    };
  };




  // Create our modal
  $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    focusFirstInput: false,
    scope: $scope
  });



  // Initialize option button
  $scope.itemButtons = [
    {
      text: 'Edit',
      type: 'button-assertive',
      onTap: function(item) {
        alert('Edit Item: ' + item.id);
      }
    },
    {
      text: 'Share',
      type: 'button-calm',
      onTap: function(item) {
        alert('Share Item: ' + item.id);
      }
    }
  ];

  $scope.createTask = function(task) {
    if(!$scope.activeProject) {
      return;
    }
    $scope.activeProject.tasks.push({
      title: task.title
    });
    $scope.taskModal.hide();

    // Inefficient, but save all the projects
    Projects.save($scope.projects);

    task.title = "";
  };

  $scope.newTask = function() {
    $scope.taskModal.show();
  };

  $scope.closeNewTask = function() {
    $scope.taskModal.hide();  
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

