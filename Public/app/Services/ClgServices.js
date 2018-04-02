angular.module('ClgServices', ['AuthService'])

.factory('Clg', function($http,AuthToken)
{
	clgFactory = {};
	clgFactory.create = function (regData) 
	{
		return $http.post('/clgapi/clgs', regData);
	};
	clgFactory.login = function (logData) 
	{
		//console.log("in college factory" +logData);
		return $http.post('/clgapi/clgauthenticate',logData).then(function(data)
		{
			AuthToken.setToken(data.data.token);
			return data;

		});
	};
	clgFactory.isLoggedIn = function(){
		if(AuthToken.getToken())
		{
			return true;
		} else 
		{

			return false;
		}
	};

	clgFactory.getInfo = function(){

		if(AuthToken.getToken()){
			return $http.post('/clgapi/me');
		} else{

			$q.reject({message : 'User has no Token' });
		}
	};

	clgFactory.getAllCollege = function()
	{
		return $http.get('/clgapi/allClg');
	};

	clgFactory.getClg = function(clgId)
	{
		return $http.post('/clgapi/getClg',clgId);
	};

	clgFactory.getFeatureClg = function(feature)
	{
		return $http.post('/clgapi/getfeatureClg',feature);
	};
	clgFactory.compareClg = function(College)
	{
		return $http.post('/clgapi/compareClg',College);
	};

	//Auth.logout
	clgFactory.logout = function()
	{
		AuthToken.setToken();
	};

	clgFactory.update = function(newData)
	{
		return $http.put('/clgapi/updateInfo',newData).then(function(data)
			{
				if(data.data.email)
				{
					var email = 
					{
						ClgEmail : data.data.email
					}

					return $http.post('/clgapi/newtoken',email).then(function(data)
					{
							AuthToken.setToken();
							AuthToken.setToken(data.data.token);
							return data;
					});
				}
				else
				{
					return data;
				}
				

			});
	};

	clgFactory.campusGallary = function(data)
	{
		//console.log("data" + data);
		return $http.post('/clgapi/campusGallary',data);
	};

	clgFactory.classroomGallary = function(data)
	{
		//console.log("data" + data);
		return $http.post('/clgapi/classroomGallary',data);
	};

	clgFactory.clgLabGallary = function(data)
	{
		//console.log("data" + data);
		return $http.post('/clgapi/clgLabGallary',data);
	};

	clgFactory.annualFunGallary = function(data)
	{
		//console.log("data" + data);
		return $http.post('/clgapi/annualFunGallary',data);
	};

	clgFactory.getCampusGallary = function(data)
	{
		return $http.post('/clgapi/getCampusGallary',data);
	}

	clgFactory.CheckOldPass =function(oldpass)
	{
		return $http.post('/clgapi/CheckOldPass',oldpass);
	}
	clgFactory.changePass = function(newPass)
	{
		return $http.post('/clgapi/changePass',newPass);
	}
	clgFactory.sendMessage = function(sendMessage)
	{
		return $http.post('/clgapi/sendMessage',sendMessage);
	}
	return clgFactory;
})