

var xtApp = angular.module('xtApp', ['ui.router']);
// Declaring global variables
xtApp.value('xtApp.config', {
    apiUrl: 'http://localhost:9545/',
    fullname: '',
    email: '',
    country: ''
});

//Declaring the constants
xtApp.constant('xtApp.variables', {
    accountSuccess: "An email verification mail has been sent to your provided address. Please check your inbox",
    accountExists: "User already registered with the provided email address. Please try sign in",
    accountMandatory: "Please fill all the mandatory fields",
    apiFail: "OOPS! Something went wrong. Sorry for inconvenience."
});

// Configure angular routing
xtApp.config(['$locationProvider', '$stateProvider', '$urlRouterProvider',
  function ($locationProvider, $stateProvider, $urlRouterProvider) {
      //$locationProvider.html5Mode(true);
      // Default routing
      //$urlRouterProvider.otherwise("/login");
      $urlRouterProvider.when('/', '/offerings');
      // Actual routing
      $stateProvider.state('home', {
          url: "/home",
          templateUrl: "app/templates/home.html",
          controller: 'homeController'
      }).state('home.offerings', {
          url: '/offerings',
          templateUrl: "app/templates/inner/offerings.html",
          controller: 'accessController'
      }).state('home.list', {
          url: '/courselist',
          templateUrl: 'app/templates/inner/list.html'
      }).state('home.detail', {
          url: '/details',
          templateUrl: 'app/templates/inner/detail.html'
      });
  }]);

