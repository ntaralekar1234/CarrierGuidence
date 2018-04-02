angular.module('CompareCtrl', ['ClgServices'])

.controller('compareCtrl', function(Clg,$location,$rootScope, $scope, $http,$window,$route,$timeout)
{
	var clg1 = $window.localStorage.getItem("college1");
	var clg2 = $window.localStorage.getItem("college2");

	var College =
	{
		college1 : clg1,
		college2 : clg2
	}

	Clg.compareClg(College).then(function(data)
	{
		if(data.data.success)
		{
			$scope.college1 = data.data.clg1;
			$scope.college2 = data.data.clg2;
		}
		else
		{
			console.log(data.data.message);
		}
	})

	$scope.getClg = function(clg_id)
	{
		$window.localStorage.setItem("clgid", clg_id);
		$location.path('/collegeview');
	}
})