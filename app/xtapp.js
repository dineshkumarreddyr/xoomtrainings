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
    sendLink:"A password change link has been sent to your registered email address. Please check your inbox",
    noPassmatch:"Password and confirm are not same.Please verify your password."
});

// Configure angular routing
xtApp.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$cryptoProvider',
    function ($locationProvider, $stateProvider, $urlRouterProvider, $cryptoProvider) {
        $cryptoProvider.setCryptographyKey('xoom!090');
    //$locationProvider.html5Mode(true);
    //$urlRouterProvider.when('/', '/offerings');
    // Actual routing
    $stateProvider.state('home', {
        url: "/home",
        templateUrl: "app/templates/home.html",
        controller: 'homeController'
    }).state('home.forgotpassword',{
        url:'/forgotpassword',
        templateUrl:'app/templates/inner/forgotpassword.html',
        controller:'forgotPasswordController'
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
    });

    $urlRouterProvider.otherwise("/home/offerings");
    $locationProvider.html5Mode(true).hashPrefix('!');
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

//Directive for Alert messages
xtApp.directive('alert',function(){
    return{
        restrict:'AEC',
        scope:{
            property:'=values'
        },
        template:"<div class='{{property.class}}'>{{property.message}}</div>"
    }
});

// Directive for Close Modal
xtApp.directive('signupModal', function() {
   return {
     restrict: 'A',
     link: function(scope, element, attr) {
       scope.dismiss = function() {
           element.modal('hide');
       };
   }
} 
});

// Service for Spinner
xtApp.service('SpinnerService', [function () {
    var isSpinnerOn;
    this.busyOn = function () {
        if (!isSpinnerOn) {
            var spinnerImage = $('<div></div>').css({
                height: 60,
                width: 60,
                background: 'url(app/assets/images/busy.GIF)',
                'margin-top': 15,
                'margin-left': 20,
                'background-size':'cover'
            });

            var spinnerText = $('<div>Loading...</div>').css({
                'margin-left': 72,
                'margin-top': 35
            });

            var spinnerBusy = $('<div></div')
            .attr({
                id: 'busySpinner'
            })
            .css({
                height: 100,
                width: 100,
                'background-color': '#fff',
                position: 'fixed',
                top: (window.innerHeight - 200) / 2,
                left: (window.innerWidth - 100) / 2,
                'z-index': 99999,
                'border-radius':'50%'
            });

            spinnerImage.appendTo(spinnerBusy);
                //spinnerText.appendTo(spinnerBusy);
                spinnerBusy.appendTo(document.body);

                $('<div></div>').attr({
                    id: 'busy',
                    fade_opacity: 500,
                    speed: 0.5
                }).css({
                    background: '#000',
                    height: $(document).height(),
                    left: '0px',
                    position: 'fixed',
                    top: '0px',
                    width: '100%',
                    zIndex: 9999
                    //height:'100vh'
                }).appendTo(document.body).fadeTo(500, 0.8);

                $(window).bind('resize', function () {
                    $('#busy').css('height', $(document).height());
                    spinnerBusy.css({
                        top: (window.innerHeight - 200) / 2,
                        left: (window.innerWidth - 200) / 2
                    });
                });
                isSpinnerOn = true;
            }
        },

        this.busyOff = function () {
            $('#busy').remove();
            if ($('#busySpinner')) {
                $.when(
                    $('#busySpinner').remove()
                    ).done(function () {
                        isSpinnerOn = false;
                    });
                }
            //isSpinnerOn = false;
            $('[rel="tooltip"]').tooltip();
        };

    }]);
