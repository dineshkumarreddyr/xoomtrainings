//Controller for course list in home screen
xtApp.controller('courselistController', ['$scope', '$http', 'xtApp.config', 'xtApp.variables', '$stateParams','SpinnerService','$timeout',
    function ($scope, $http, $xtAppConfig, $xtAppVariables, $stateParams,$SpinnerService,$timeout) {

        //Default array for course list
        $scope.allCourses = [];

        // Default Spinner On for loading Data
        $SpinnerService.busyOn();

        //Default bindings for course list
        $http.get($xtAppConfig.apiUrl + 'courselist').success(function (res, status, headers, conf) {
            if (res != undefined && res.status != undefined && res.status.indexOf('success') > -1) {
                $scope.allCourses = res.records;
                $timeout(function(){
                    $SpinnerService.busyOff();
                },500);
            }
        }).error(function (res, status, headers, conf) {
            $scope.allCourses = [];
            $SpinnerService.busyOff();
        });
    }]);