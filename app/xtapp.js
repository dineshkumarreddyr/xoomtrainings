

var xtApp = angular.module('xtApp', ["ui.router"])
    xtApp.config(function($stateProvider, $urlRouterProvider){
      

      // For any unmatched url, send to /route1
      $urlRouterProvider.otherwise("/home")
      
      $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "app/templates/home.html",
            controller:"AccessController",
        })
		
		.state('coursesList', {
            url: "/coursesList",
            templateUrl: "app/templates/coursesList.html",
            controller:"coursesListController",
        });
    })
         