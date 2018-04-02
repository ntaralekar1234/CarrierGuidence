angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
	$routeProvider

	.when('/', {
		templateUrl: 'app/views/pages/home.html',
		controller   : 'homeCtrl',
		controllerAs : 'Home',
	})
	.when('/compare', {
		templateUrl: 'app/views/pages/compare.html',
		controller   : 'compareCtrl',
		//controllerAs : 'Register',
	})

	.when('/collegeview', {
		templateUrl: 'app/views/pages/information.html',
		controller   : 'clgCtrl',
		controllerAs : 'collegeCtrl',
	})

	.when('/features', {
		templateUrl: 'app/views/pages/featureview.html',
		controller   : 'FeatureCtrl',
		//controllerAs : 'collegeCtrl',
	})

	.when('/Dashboard', {
		templateUrl: 'app/views/pages/Dashboard.html',
		controller   : 'DashCtrl',
		controllerAs : 'Dashboard',
	})

	.when('/EditInfo', {
		templateUrl: 'app/views/pages/EditInfo.html',
		controller   : 'DashCtrl',
		controllerAs : 'Dashboard',
	})

	.when('/Gallary', {
		templateUrl: 'app/views/pages/Gallary.html',
		controller   : 'DashCtrl',
		controllerAs : 'Dashboard',
	})

	.when('/ChangePass', {
		templateUrl: 'app/views/pages/ChangePass.html',
		controller   : 'DashCtrl',
		controllerAs : 'Dashboard',
	})
	
	

	.otherwise({ redirectTo: '/' });

	$locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});
});
	
