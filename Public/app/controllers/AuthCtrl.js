angular.module('authController', ['ClgServices'])

.controller('clgAuthCtrl',function(Clg,$http, $location, $timeout, $window, $scope)
{
	$scope.LoggClg = function(logData)
	{
		if($scope.LoginForm.$valid)
		{
			
			$scope.CRerrorMsg = false;
			Clg.login(logData).then(function(data)
			{
				if(data.data.success)
				{
					$scope.CRsuccessMsg = data.data.message;
					//$location.path('/');
					$timeout(function()
						 {
						 	$scope.colReg1 = true;
							$location.path('/Dashboard');
							location.reload();
							
						 }, 5000);		
				}
			else
			{
				$scope.CRerrorMsg =  data.data.message;
				//console.log(data.data.message);
			}
		})
		}
		

		
	}

})

