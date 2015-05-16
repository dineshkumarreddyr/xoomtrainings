

var xtApp = angular.module('xtApp', ['ui.router']);
// Declaring global variables
xtApp.value('xtApp.config', {
  apiUrl:'http://localhost:9545/'
});

// Configure angular routing
xtApp.config(['$locationProvider','$stateProvider','$urlRouterProvider',
  function($locationProvider,$stateProvider,$urlRouterProvider){
    //$locationProvider.html5Mode(true);
    // Default routing
    //$urlRouterProvider.otherwise("/login");
    $urlRouterProvider.when('/','/offerings');
    // Actual routing
    $stateProvider.state('home', {
      url: "/home",
      templateUrl: "app/templates/home.html",
      controller:'homeController'
    }).state('home.offerings',{
      url:'/offerings',
      templateUrl:"app/templates/inner/offerings.html",
      controller:'accessController'
    }).state('home.list',{
      url:'/courselist',
      templateUrl:'app/templates/inner/list.html'
    }).state('home.detail',{
      url:'/details',
      templateUrl:'app/templates/inner/detail.html'
    });
  }]);

