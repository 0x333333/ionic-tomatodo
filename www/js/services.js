angular.module('starter.services', [])

.factory('ProjectService', function() {
  return {
    all: function() {
      var projectString = window.localStorage.projects;
      if(projectString) {
        return angular.fromJson(projectString);
      }
      return [];
    },

    getHistory: function() {
      var allHistory = window.localStorage.history;
      if (allHistory) {
        return angular.fromJson(allHistory);
      }
      return [];
    },

    save: function(projects) {
      console.log("Projects:" + angular.toJson(projects));
      window.localStorage.projects = angular.toJson(projects);
    },

    saveHistory: function(history) {
      window.localStorage.history = angular.toJson(history);
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
});