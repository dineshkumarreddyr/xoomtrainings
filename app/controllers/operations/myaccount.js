//Controller for Cart Screen
xtApp.controller('myAccountController', ['$scope', '$http', '$xoomConfig', 'xtApp.variables', '$stateParams', '$state', '$filter', '$log','managecookies',
	function ($scope, $http, $xtAppConfig, $xtAppVariables, $stateParams, $state, $filter, $log,$manageCookies) {

// Setting up the User name
$scope.fullname = $xtAppConfig.fullname;

$scope.myProfile = {};

$scope.userCourses = [];

// API Call to get the user courses
$http.post($xtAppConfig.apiUrl+'usercourses',{"userid":$xtAppConfig.userid}).success(function(res,status,headers,conf){
	if(res!=undefined && res.status!=undefined && res.status.indexOf('success')>-1){
		$scope.userCourses = res.records;
	}
	else
		$scope.userCourses = [];
}).error(function(res,status,headers,conf){
	$scope.userCourses = [];
});

// API Call to get the profile details
$http.post($xtAppConfig.apiUrl+'profile',{"userid":$xtAppConfig.userid}).success(function(res,status,headers,conf){
	if(res!=undefined && res.status!=undefined && res.status.indexOf('success')>-1){
		$scope.myProfile = res.records[0];
		$scope.country = 6;
	}
}).error(function(res,status,headers,conf){
	console.log(res);
});

// Update Profile
$scope.updateProfile = function(){
	var data = {};

	try{
		data.firstname = $scope.myProfile.firstname;
		data.lastname = $scope.myProfile.lastname;
		data.email = $scope.myProfile.email;
		data.userindian = 1;
		data.country = "India";
		data.mobile = $scope.myProfile.mobilenumber;
		data.userid = $xtAppConfig.userid;

		$http.post($xtAppConfig.apiUrl+'uprofile',data).success(function(res,status,headers,conf){
			if(res!=undefined && res.status!=undefined && res.status.indexOf('success')>-1){
				console.log('success');
			}
		}).error(function(res,status,headers,conf){
			console.log(res);
		});
	}
	catch(e){
		console.log(e.message);
	}
}


// Change Password Event
$scope.updatePassword = function(){
	var data = {};
	try{
		if(isUpdatePasswordValid()){
			if(confirmedPassword()){
				data.userid = $xtAppConfig.userid;
				data.oldpassword = $scope.useroldpassword;
				data.newpassword = $scope.usernewpassword;

				$http.post($xtAppConfig.apiUrl+'upass',data).success(function(res,status,headers,conf){
					if(res!=undefined && res.status!=undefined && res.status.indexOf('success')>-1){
						alert('Password updated successfully');
					}
					else if(res!=undefined && res.status!=undefined && res.status.indexOf('error')>-1){
						if(res.ecode!=undefined){
							switch(res.ecode){
								case 'e5':
								alert('Incorrect old password!!');
								break;
							}
						}
					}
				}).error(function(res,status,headers,conf){
					alert('Failure in API');
				});
			}
		}
	}
	catch(e){
		console.log(e.message);
	}
}

var isUpdatePasswordValid = function(){
	if($scope.useroldpassword!=undefined && $scope.useroldpassword!=null && $scope.usernewpassword!=undefined && 
		$scope.usernewpassword!=undefined && $scope.userretypenewpassword!=undefined && $scope.userretypenewpassword!=null)
		return true;
	return false;
}

var confirmedPassword = function(){
	if($scope.usernewpassword===$scope.userretypenewpassword)
		return true;
	return false;
}
}]);