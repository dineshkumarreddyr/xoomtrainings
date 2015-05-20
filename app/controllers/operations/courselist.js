//Controller for course list in home screen
xtApp.controller('courselistController', ['$scope', '$http', 'xtApp.config', 'xtApp.variables', '$stateParams',
    function ($scope, $http, $xtAppConfig, $xtAppVariables, $stateParams) {

        //Default array for course list
        $scope.allCourses = [];


        //Default bindings for course list
        $http.get($xtAppConfig.apiUrl + 'courselist').success(function (res, status, headers, conf) {
            if (res != undefined && res.status != undefined && res.status.indexOf('success') > -1) {
                $scope.allCourses = res.records;
            }
        }).error(function (res, status, headers, conf) {
            $scope.allCourses = [];
        });
    }]);