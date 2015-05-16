

var xtApp = angular.module('xtApp', ["ui.router"])
xtApp.config(function($stateProvider, $urlRouterProvider){


      // For any unmatched url, send to /route1
      // $urlRouterProvider.otherwise("/home")
      
      $stateProvider
      .state('home', {
        url: "/home",
        templateUrl: "app/templates/home.html"
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
    })
})
