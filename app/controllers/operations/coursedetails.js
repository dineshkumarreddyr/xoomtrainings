﻿//Controller for course details
xtApp.controller('coursedetailController', ['$scope', '$http', '$xoomConfig', 'xtApp.variables', '$stateParams', '$state','$filter',
    function ($scope, $http, $xtAppConfig, $xtAppVariables, $stateParams, $state, $filter) {

        console.log($stateParams.courseId);

        if ($stateParams.courseId != undefined && $stateParams.courseId != null) {
            $http.post($xtAppConfig.apiUrl + 'details', { "courseid": $stateParams.courseId }).success(function (res, status, headers, conf) {
                if (res != undefined && res.status != undefined && res.status.indexOf('success') > -1) {
                    $scope.coursename = res.records[0].xtcoursename;
                    $scope.coursedescp = res.records[0].xtcoursedescription;
                    $scope.coursestartdate = res.records[0].xtcoursestartdate;
                    $scope.courseduration = res.records[0].xtcourseduration + ' ' + res.records[0].xtcoursedurationtype;
                    $scope.coursedays = res.records[0].xtcoursedays;
                    $scope.coursetiming = res.records[0].xtcoursestarttime + ' - ' + res.records[0].xtcourseendtime;
                }
                else if (res != undefined && res.status != undefined && res.status.indexOf('error') > -1) {
                    switch (res.ecode) {
                        case 'e2':
                        $state.go('home.offerings');
                        break;
                    }
                }
            }).error(function (res, status, headers, conf) {
            });

        // Call to get the course lite details
        $http.post($xtAppConfig.apiUrl+'courselite',{"courseid":$stateParams.courseId}).success(function(res,status,headers,conf){
            if(res!=undefined && res.status!=undefined && res.status.indexOf('success')>-1){
                $scope.courseUrl = res.records[0].xtcourseimg;
                $scope.litecoursename = res.records[0].xtcoursename;
                $scope.litecourseprice = res.records[0].xtinrprice;
                $scope.liteusprice = res.records[0].xtusprice;
                $scope.liteduration = res.records[0].xtcourseduration;
            }
        }).error(function(res,status,headers,conf){

        });
}

}]);