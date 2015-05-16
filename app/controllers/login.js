xtApp.controller('accessController',['$scope','$http','xtApp.config',function($scope,$http,$xtAppConfig){
	(function(){
		"use strict";

// Login CALL
$scope.login=function(){
	var data={};
	try{
		if($scope.isSigninValid())
		{
				// creating a data object
				data.username=$scope.loginUserName;
				data.password=$scope.loginPassword;
               // get methods to trigger data
               $http.get('app/data/successLogin.json').success(function(res,status,headers,config){
               	if(res!= udefined && res.status!= undefined && res.status.indexOf('success')>-1)
               		console.log(res.records);
               })
               .error(function(res,status,headers,config){
               	console.log(status);
               });
             }

           }catch(e){

            console.log(e.message);
          }
        }
// Sign in Validation
$scope.isSigninValid = function(){
	if($scope.loginUserName!=undefined && $scope.loginUserName!= null && $scope.loginPassword!=undefined && $scope.loginPassword!= null)
		return true;
	return false;
}

//SIgnup Calls

$scope.signup = function(){
 var data = {};
 try{
  if($scope.isSignupValid()){
   data.firstname = $scope.firstName;
   data.lastname = $scope.LastName;
   data.email = $scope.emailAddress;
   data.password = $scope.userPassword;
   data.password = $scope.userPassword;
   data.confirmpwd = $scope.confirmPassword;
   data.mobile = $scope.mobileNumber;
		// post methods to trigger data
		$http.post('url',data).success(function(res,status,headers,config){


		}).error(function(res,status,headers,config){

		});
  }

} catch(e){

};


};











})();
}]);




