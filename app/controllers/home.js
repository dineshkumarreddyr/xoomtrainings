/* Created by Dinesh 16-05-2015 */
xtApp.controller('homeController', ['$scope', '$http', 'xtApp.config', 'xtApp.variables', '$cookieStore', 'managecookies',
    function ($scope, $http, $xtAppConfig, $xtAppVariable, $cookies, $managecookies) {
        (function () {
            "use strict";

            //Defining the alert messages
            $scope.accountShow = false;
            $scope.msgClass = "alert alert-success";


            // Declaring the default array for country
            $scope.countryitems = [];

            // Get call to get the list of countries
            $http.get($xtAppConfig.apiUrl + 'countrylist').success(function (res, status, headers, conf) {
                if (res != undefined && res.status != undefined && res.status.indexOf('success') > -1) {
                    $scope.countryitems = res.records;
                }
            }).error(function (res, status, headers, conf) {
                console.log(res);
            });

            //Get the login details
            var fnUseraction = function () {
                if ($xtAppConfig.fullname != undefined && $xtAppConfig.fullname != null && $xtAppConfig.fullname != '') {
                    $scope.userloggedin = true;
                    $scope.fullname = $xtAppConfig.fullname;
                }
            }
            fnUseraction();

            // Sign up validation
            $scope.isSignupValid = function () {
                if ($scope.firstName != undefined && $scope.firstName != null &&
                    $scope.LastName != undefined && $scope.LastName != null &&
                    $scope.emailAddress != null && $scope.emailAddress != undefined &&
                    $scope.userPassword != undefined && $scope.userPassword != null &&
                    $scope.mobileNumber != undefined && $scope.mobileNumber != null &&
                    $scope.usercountry != undefined && $scope.usercountry != null)
                    return true;
                return false;
            }
            var validatePassword = function () {
                if ($scope.userPassword === $scope.confirmPassword)
                    return true;
                return false;
            }

            // Sign up user form
            $scope.signup = function () {
                var data = {};
                try {
                    if ($scope.isSignupValid()) {
                        if (!validatePassword()) {
                            console.log("Password and confirm password are not same");
                            return;
                        }
                        data.firstname = $scope.firstName;
                        data.lastname = $scope.LastName;
                        data.email = $scope.emailAddress;
                        data.userpassword = $scope.userPassword;
                        data.phonenumber = $scope.mobileNumber;
                        if ($scope.countryitems.length > 0) {
                            var item = _.filter($scope.countryitems, function (e) {
                                return e.countryid == $scope.usercountry;
                            });
                            if (item != undefined)
                                data.country = item[0].countryname;
                        }
                        else
                            data.country = $scope.usercountry;
                        if (data.country != null && data.country.indexOf('India') > -1)
                            data.userindian = 1;
                        else
                            data.userindian = 0;
                        data.username = $scope.emailAddress;
                        $http.post($xtAppConfig.apiUrl + 'signup', data).success(function (res, status, headers, config) {
                            if (res != undefined && res.status != undefined && res.status.indexOf('success') > -1) {
                                $scope.accountShow = true;
                                $scope.msgClass = 'alert alert-success';
                                $scope.alertMsg = $xtAppVariable.accountSuccess;
                            }
                            else if (res != undefined && res.status != undefined && res.status.indexOf('error') > -1) {
                                switch (res.ecode) {
                                    case 'e1':
                                        $scope.accountShow = true;
                                        $scope.msgClass = 'alert alert-danger';
                                        $scope.alertMsg = $xtAppVariable.accountExists;
                                        break;
                                }
                            }
                        }).error(function (res, status, headers, config) {
                            $scope.accountShow = true;
                            $scope.msgClass = 'alert alert-danger';
                            $scope.alertMsg = $xtAppVariable.apiFail;
                        });
                    }
                    else {
                        $scope.accountShow = true;
                        $scope.msgClass = 'alert alert-danger';
                        $scope.alertMsg = $xtAppVariable.accountMandatory;
                    }
                }
                catch (e) {
                    $scope.accountShow = true;
                    $scope.msgClass = 'alert alert-danger';
                    $scope.alertMsg = $xtAppVariable.apiFail;
                }
            }

            // Sign In user
            $scope.signin = function () {
                var data = {};
                try {
                    if ($scope.isLoginValid()) {
                        data.username = $scope.loginUserName;
                        data.userpassword = $scope.loginPassword;
                        //API Call
                        $http.post($xtAppConfig.apiUrl + 'signin', data).success(function (res, status, headers, conf) {
                            if (res != undefined && res.status != undefined && res.status.indexOf('success') > -1) {
                                //Storing the values to $cookies (user session management)
                                $cookies.put('fullname', res.records[0].xtfullname);
                                $cookies.put('email', res.records[0].xtuseremail);
                                $cookies.put('country', res.records[0].xtusercountry);
                                //Storing the data to local variables
                                $managecookies.bind();
                                //Sign in Fn
                                fnUseraction();
                            }

                        }).error(function (res, status, headers, conf) {

                        });
                    }
                } catch (exception) {
                    console.log(exception.message);
                }
            }

            //Validation for login form
            $scope.isLoginValid = function () {
                if ($scope.loginUserName != undefined && $scope.loginUserName != null && $scope.loginPassword != undefined && $scope.loginPassword != null)
                    return true;
                return false;
            }
        })();
    }])