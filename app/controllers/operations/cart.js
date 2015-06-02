//Controller for Cart Screen
xtApp.controller('cartController', ['$scope', '$http', '$xoomConfig', 'xtApp.variables', '$stateParams', '$state', '$filter', '$log',
    function ($scope, $http, $xtAppConfig, $xtAppVariables, $stateParams, $state, $filter, $log) {


        $scope.cartDetail = [];

        //Get Cart details
        $http.post($xtAppConfig.apiUrl + 'cartdetails', { userid: $xtAppConfig.userid }).success(function (res, status, headers, conf) {
            if (res != undefined && res.status != undefined && res.status.indexOf('success') > -1) {
                $scope.cartDetail = res.records;
            }
        }).error(function (res, status, headers, conf) {
            $log.error(res);
        });


        //Remove cart item
        $scope.removeCartItem = function (index,id) {
            var data = {};
            try {
                data.userid = $xtAppConfig.userid;
                data.cartid = id;
                $http.post($xtAppConfig.apiUrl + 'removeitem', data).success(function (res, status, headers, conf) {
                    if (res != undefined && res.status != undefined && res.status.indexOf('success') > -1) {
                        $scope.cartDetail.splice(index, 1);
                    }
                }).error(function (res, status, headers, conf) {

                });
            }
            catch (e) {
                $log.error(e.message);
            }
        }

    }]);