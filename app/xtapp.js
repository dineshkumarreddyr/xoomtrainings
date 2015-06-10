var xtApp = angular.module('xtApp', ['ui.router', 'ngCookies', 'mdo-angular-cryptography', 'xoom.config', 'xoom.config', 'ui.bootstrap']);

xtApp.value('$anchorScroll', angular.noop);

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
        }).state('home.forgotpassword', {
            url: '/forgotpassword',
            templateUrl: 'app/templates/inner/forgotpassword.html',
            controller: 'forgotPasswordController'
        }).state('home.offerings', {
            url: '/offerings',
            templateUrl: "app/templates/inner/offerings.html",
            controller: 'courselistController'
        }).state('home.list', {
            url: '/courselist',
            templateUrl: 'app/templates/inner/list.html'
        }).state('home.checkout', {
            url: '/checkout',
            templateUrl: 'app/templates/inner/checkout.html',
            controller: 'cartController'
        }).state('home.detail', {
            url: '/details/:courseId',
            templateUrl: 'app/templates/inner/detail.html',
            controller: 'coursedetailController',
            resolve: {
                courseId: function ($stateParams, $crypto) {
                    return $crypto.encrypt($stateParams.courseId);
                }
            }
        }).state('home.mydetails',{
            url:'/myprofile',
            templateUrl:'app/templates/inner/myaccount.html',
            controller:'myAccountController'
        });

        $urlRouterProvider.otherwise("/home/offerings");
        $locationProvider.html5Mode(true).hashPrefix('!');
    }]);

//Route verification
xtApp.run(['$rootScope', '$location', '$state', '$timeout', '$cookieStore', '$xoomConfig', 'managecookies',
    function ($rootScope, $location, $state, $timeout, $cookies, $xtConfig, $manageCookies) {
        var isSessionExist = false;
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            if (!$manageCookies.bind() && toState.name.toLowerCase() !== 'home.offerings' &&
                toState.name.toLowerCase() !== 'home.forgotpassword')
                $timeout(function () {
                    $state.go('home.offerings');
                });
        });
        // For Setting up scroll position to top
        $rootScope.$on('$stateChangeSuccess', function () {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        });
    }]);

//Cookie service
xtApp.factory('managecookies', ['$http', '$cookieStore', '$xoomConfig', function ($http, $cookies, $xtAppConfig) {
    return {
        bind: function () {
            if ($cookies.get('email') != undefined && $cookies.get('email') != null) {
                $xtAppConfig.fullname = $cookies.get('fullname');
                $xtAppConfig.email = $cookies.get('email');
                $xtAppConfig.country = $cookies.get('country');
                $xtAppConfig.userid = $cookies.get('userid');
                $xtAppConfig.cartitemCount = $cookies.get('cartitems');
                return true;
            }
            return false;
        },
        remove: function () {
            if ($cookies.get('email') != undefined && $cookies.get('email') != null) {
                $cookies.remove('fullname');
                $cookies.remove('email');
                $cookies.remove('country');
                $cookies.remove('cartitems');
                $cookies.remove('userid')
                $xtAppConfig.fullname = null;
                $xtAppConfig.email = null;
                $xtAppConfig.country = null;
                $xtAppConfig.cartitemCount = 0;
                $xtAppConfig.userid = 0;
            }
        },
        zeroCartItems:function(){
            if($cookies.get('cartitems')!=undefined && $cookies.get('cartitems')!=null){
                $cookies.remove('cartitems');
                $xtAppConfig.cartitemCount = 0;
            }
        }
    };
}]);

//Directive for Alert messages
xtApp.directive('xtAlert', function () {
    return {
        restrict: 'AEC',
        scope: {
            property: '=values'
        },
        template: "<div class='{{property.class}}'>{{property.message}}</div>"
    }
});

// Directive for Close Modal
xtApp.directive('signupModal', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            scope.dismiss = function () {
                element.modal('hide');
            };

            scope.toggle = function () {
                element.modal('show');
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
                'background-size': 'cover'
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
                'border-radius': '50%'
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
