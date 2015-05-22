var xtApp = angular.module('xtApp', ['ui.router', 'ngCookies', 'mdo-angular-cryptography']);
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
    apiFail: "OOPS! Something went wrong. Sorry for inconvenience.",
    noLogin:"Login Failed. Please check username and password.",
    noEmail:"Provided email address not registed with us. Please check and re-enter the registered email address",
    sendLink:"A password change link has been sent to your registered email address. Please check your inbox"
});

// Configure angular routing
xtApp.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$cryptoProvider',
    function ($locationProvider, $stateProvider, $urlRouterProvider, $cryptoProvider) {

        $locationProvider.html5Mode(true).hashPrefix('!');

        $cryptoProvider.setCryptographyKey('xoom!090');
    //$locationProvider.html5Mode(true);
    //$urlRouterProvider.when('/', '/offerings');
    // Actual routing
    $stateProvider.state('home', {
        url: "/home",
        templateUrl: "app/templates/home.html",
        controller: 'homeController'
    }).state('home.offerings', {
        url: '/offerings',
        templateUrl: "app/templates/inner/offerings.html",
        controller: 'courselistController'
    }).state('home.list', {
        url: '/courselist',
        templateUrl: 'app/templates/inner/list.html'
    }).state('home.detail', {
        url: '/details/:courseId',
        templateUrl: 'app/templates/inner/detail.html',
        controller: 'coursedetailController',
        resolve: {
            courseId: function ($stateParams, $crypto) {
                return $crypto.encrypt($stateParams.courseId);
            }
        }
    }).state('home.forgotpassword',{
        url:'/forgotpassword',
        templateUrl:'app/templates/inner/forgotpassword.html'
    });

    $urlRouterProvider.otherwise("/home/offerings");
}]);

//Route verification
xtApp.run(['$rootScope', '$location', '$state', '$timeout', '$cookieStore', 'xtApp.config', 'managecookies',
    function ($rootScope, $location, $state, $timeout, $cookies, $xtConfig, $manageCookies) {
        var isSessionExist = false;
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            if (!$manageCookies.bind() && toState.name.toLowerCase() !== 'home.offerings' && 
                toState.name.toLowerCase()!=='home.forgotpassword')
                $timeout(function () {
                    $state.go('home.offerings');
                });
        });
    }]);

//Cookie service
xtApp.factory('managecookies', ['$http', '$cookieStore', 'xtApp.config', function ($http, $cookies, $xtAppConfig) {
    return {
        bind: function () {
            if ($cookies.get('email') != undefined && $cookies.get('email') != null) {
                $xtAppConfig.fullname = $cookies.get('fullname');
                $xtAppConfig.email = $cookies.get('email');
                $xtAppConfig.country = $cookies.get('country');
                return true;
            }
            return false;
        }
    }
}]);

