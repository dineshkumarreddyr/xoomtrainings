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

	});
})();
}])