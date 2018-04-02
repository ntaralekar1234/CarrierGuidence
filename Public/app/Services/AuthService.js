angular.module('AuthService', [])

.factory('AuthToken',function($window)
{

	var authTokenFactory = {};

	//AuthToken.setToken(token);
	authTokenFactory.setToken = function(token) {
		if(token){

			$window.localStorage.setItem('token' , token);
		} else{

			$window.localStorage.removeItem('token');
		}
		
	};

	authTokenFactory.getToken = function(){

		return $window.localStorage.getItem('token');
	};

	
	return authTokenFactory;
})

.factory('AuthInterceptors',function(AuthToken){

	var authInterceptorsFactory = {};

	 authInterceptorsFactory.request = function(config) {

		var token = AuthToken.getToken();

			if(token) config.headers['x-access-token']  = token;
		return config;
	};

	return authInterceptorsFactory;
})