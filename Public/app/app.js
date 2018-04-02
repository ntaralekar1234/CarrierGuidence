angular.module('userApp', ['appRoutes','mainController','DashboardCtrl','ClgServices','authController','AuthService','HomeCtrl','featureCtrl','CompareCtrl'])

.config(function($httpProvider){
		$httpProvider.interceptors.push('AuthInterceptors');
});

