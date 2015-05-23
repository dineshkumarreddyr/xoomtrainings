/* Created by Dinesh Kumar 22-05-2015 */
xtApp.controller('forgotPasswordController', ['$scope','$http','xtApp.config','xtApp.variables',
	function($scope,$http,$xtAppConfig,$xtAppVariables){

		// Default alert message
		$scope.accountShow = false;

		$scope.sendEmail = function(){
			$http.post($xtAppConfig.apiUrl+'fpassword',{"email":$scope.emailaddress})
			.success(function(res,status,headers,conf){
				if(res!=undefined && res.status!=undefined && res.status.indexOf('success')>-1){
					$scope.accountShow = true;
					$scope.msgClass = 'alert alert-success';
					$scope.alertMsg = $xtAppVariables.sendLink;
				}
				else if(res!=undefined && res.status!=undefined && res.status.indexOf('error')>-1){
					switch(res.ecode){
						case 'e2':
						$scope.accountShow = true;
						$scope.msgClass = 'alert alert-danger';
						$scope.alertMsg = $xtAppVariables.noEmail;
						break;
						case 'e3':
						$scope.accountShow = true;
						$scope.msgClass='alert alertMsg';
						$scope.alertMsg = $xtAppVariables.apiFail;
						break;
					}
				}
			}).error(function(res,status,headers,conf){

			});
		}
	}]);