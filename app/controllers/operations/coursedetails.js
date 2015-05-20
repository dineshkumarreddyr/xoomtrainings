//Controller for course details
xtApp.controller('coursedetailController', ['$scope', '$http', 'xtApp.config', 'xtApp.variables', '$stateParams',
    function ($scope, $http, $xtAppConfig, $xtAppVariables, $stateParams) {

        console.log($stateParams.courseId);

    }]);