//Controller for Cart Screen
xtApp.controller('myAccountController', ['$scope', '$http', '$xoomConfig', 'xtApp.variables', '$stateParams', '$state', '$filter', '$log','managecookies',
	function ($scope, $http, $xtAppConfig, $xtAppVariables, $stateParams, $state, $filter, $log,$manageCookies) {

// Setting up the User name
$scope.fullname = $xtAppConfig.fullname;

$scope.myProfile = {};

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

}
}]);