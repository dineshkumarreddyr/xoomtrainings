//Controller for course details
xtApp.controller('coursedetailController', ['$scope', '$http', '$xoomConfig', 'xtApp.variables', '$stateParams', '$state', '$filter',
    function ($scope, $http, $xtAppConfig, $xtAppVariables, $stateParams, $state, $filter) {

        $scope.courseDetail = [];

        //Course Enrolled Disabled
        $scope.isEnrollDisabled = false;

        if ($stateParams.courseId != undefined && $stateParams.courseId != null) {
            $http.post($xtAppConfig.apiUrl + 'details', { "courseid": $stateParams.courseId }).success(function (res, status, headers, conf) {
                if (res != undefined && res.status != undefined && res.status.indexOf('success') > -1) {
                    $scope.coursename = res.records[0].coursename;
                    $scope.coursedescp = res.records[0].coursedesciption;
                    $scope.coursestartdate = res.records[0].coursestartdate;
                    $scope.courseduration = res.records[0].courseduration + ' ' + res.records[0].coursedurationtype;
                    $scope.coursedays = res.records[0].coursedays;
                    $scope.coursetiming = res.records[0].coursestarttime + ' - ' + res.records[0].courseendtime;
                    $scope.isEnrollDisabled = res.records[0].enrollstatus != undefined && res.records[0].enrollstatus != null ? true : false;
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
            $http.post($xtAppConfig.apiUrl + 'courselite', { "courseid": $stateParams.courseId }).success(function (res, status, headers, conf) {
                if (res != undefined && res.status != undefined && res.status.indexOf('success') > -1) {
                    $scope.courseUrl = res.records[0].courseimglocation;
                    $scope.litecoursename = res.records[0].coursename;
                    $scope.litecourseprice = res.records[0].indianprice;
                    $scope.liteusprice = res.records[0].usprice;
                    $scope.liteduration = res.records[0].courseduration;
                    $scope.litelearners = res.records[0].learners;
                    $scope.literating = res.records[0].rating;
                    $scope.aboutcourse = res.records[0].aboutcourse;
                    $scope.curriculum = res.records[0].curriculum;

                    $scope.courseDetail = res.records;
                }
            }).error(function (res, status, headers, conf) {

            });
        }

        $scope.enrollCourse = function () {
            var data = {};
            try {
                data.courseid = $stateParams.courseId;
                data.userid = $xtAppConfig.userid;
                data.username = $xtAppConfig.email;
                data.enrollstatus = 'saved';

                $http.post($xtAppConfig.apiUrl + 'savecart', data).success(function (res, status, headers, conf) {
                    if (res != undefined && res.status != undefined && res.status.indexOf('success') > -1) {
                        $scope.$parent.updateCartItems(res.records[0].cartItemsCount);
                        $scope.isEnrollDisabled = true;
                    }
                }).error(function (res, status, headers, conf) {
                    console.log(res);
                });
            }
            catch (e) {
                console.log(e.message);
            }
        }

    }]);