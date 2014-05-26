angular.module('starter', ['ionic', 'starter.services', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    templateUrl: "templates/home.html",
    controller: 'AppCtrl'
  });

  // .state('app.home', {
  //   url: "/home",
  //   views: {
  //     'menuContent': {
  //       templateUrl: "templates/home.html",
  //       controller: 'HomeCtrl'
  //     }
  //   }
  // });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app');
});

