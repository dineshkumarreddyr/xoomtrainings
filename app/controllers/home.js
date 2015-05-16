/* Created by Dinesh 16-05-2015 */
xtApp.controller('homeController',['$scope','$http','xtApp.config',function($scope,$http,$xtAppConfig){
	(function(){
		"use strict";

	// Declaring the default array for country
	$scope.countryitems = [];
	// Get call to get the list of countries
	$http.get($xtAppConfig.apiUrl+'countrylist').success(function(res,status,headers,conf){
		if(res!=undefined && res.status!=undefined && res.status.indexOf('success')>-1){
			$scope.countryitems = res.records;
		}
	}).error(function(res,status,headers,conf){
		console.log(res);
	});

	// Sign up validation
	$scope.isSignupValid = function(){
		if($scope.firstName!=undefined && $scope.firstName!=null && 
			$scope.LastName!=undefined && $scope.LastName!=null && 
			$scope.emailAddress!=null && $scope.emailAddress!=undefined && 
			$scope.userPassword!=undefined && $scope.userPassword!=null && 
			$scope.mobileNumber!=undefined && $scope.mobileNumber!=null && 
			$scope.usercountry!=undefined && $scope.usercountry!=null)
			return true;
		return false;
	}
	var validatePassword = function(){
		if($scope.userPassword===$scope.confirmPassword)
			return true;
		return false;
	}

	// Sign up user form
	$scope.signup = function(){
		var data = {};
		try{
			if($scope.isSignupValid()){
				if(!validatePassword())
				{
					console.log("Password and confirm password are not same");
					return;
				}
				data.firstname = $scope.firstName;
				data.lastname = $scope.LastName;
				data.email = $scope.emailAddress;
				data.userpassword = $scope.userPassword;
				data.phonenumber = $scope.mobileNumber;
				if($scope.countryitems.length>0)
				{
					var item = _.filter($scope.countryitems,function(e){
						return e.countryid==$scope.usercountry;
					});
					if(item!=undefined)
						data.country = item[0].countryname;
				}
				else
					data.country = $scope.usercountry;
				if($scope.usercountry===1)
					data.userindian = 1;
				else
					data.userindian = 0;
				data.username = $scope.emailAddress;
				$http.post($xtAppConfig.apiUrl+'signup',data).success(function(res,status,headers,config){
					if(res!=undefined && res.status!=undefined && res.status.indexOf('success')>-1){
						console.log('Account created successfully');
					}
				}).error(function(res,status,headers,config){

				});
			}
		} 
		catch(e){
			console.log(e.message);
		}
	}
})();
}])