angular.module('featureCtrl', ['ClgServices'])

.controller('FeatureCtrl', function(Clg,$location,$rootScope, $scope, $http,$window,$route,$timeout)
{
	var feature = $window.localStorage.getItem("feature");

	
	var featureData =
	{
		feature : feature
	}

	//console.log(featureData);

	Clg.getFeatureClg(featureData).then(function(data)
	{
		if(data.data.success)
		{
			$scope.FeatureClgs = data.data.clgs;
		}
		else
		{
			console.log(data.data.message);
		}
	})

	$scope.getClg = function(clg_id)
	{
		//console.log(clg_id);

		$window.localStorage.setItem("clgid", clg_id);
		$location.path('/collegeview');
	}
})