/* Created by Dinesh Kumar 22-05-2015 */
xtApp.controller('forgotPasswordController', ['$scope','$http','xtApp.config','xtApp.variables',
	function($scope,$http,$xtAppConfig,$xtAppVariables){

		// Default alert message
		$scope.alertPassword = {alertDisplay:false,class:'alert alert-success',message:''}

		$scope.sendEmail = function(){
			if($scope.isValid()){
				$http.post($xtAppConfig.apiUrl+'fpassword',{"email":$scope.emailaddress})
				.success(function(res,status,headers,conf){
					if(res!=undefined && res.status!=undefined && res.status.indexOf('success')>-1){
						$scope.alertPassword = {alertDisplay:true,class:'alert alert-success',message:$xtAppVariables.sendLink}
					}
					else if(res!=undefined && res.status!=undefined && res.status.indexOf('error')>-1){
						switch(res.ecode){
							case 'e2':
							$scope.alertPassword = {alertDisplay:true,class:'alert alert-danger',message:$xtAppVariables.noEmail}
							break;
							case 'e3':
							$scope.alertPassword = {alertDisplay:true,class:'alert alert-danger',message:$xtAppVariables.apiFail}
							break;
						}
					}
				}).error(function(res,status,headers,conf){
					$scope.alertPassword = {alertDisplay:true,class:'alert alert-danger',message:$xtAppVariables.apiFail}
				});
			}
			else{
				$scope.alertPassword = {alertDisplay:true,class:'alert alert-danger',message:$xtAppVariables.accountMandatory}
				return
			}
		}
		// Validate form
		$scope.isValid = function(){
			if($scope.emailaddress!=undefined && $scope.emailaddress!=null)
				return true;
			return false;
		}
	}]);