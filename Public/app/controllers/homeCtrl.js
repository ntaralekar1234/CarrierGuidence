angular.module('HomeCtrl', ['ClgServices'])

.controller('homeCtrl', function(Clg,$location,$rootScope, $scope, $http,$window,$route,$timeout)
{
	

	Clg.getAllCollege().then(function(data)
	{
		if(data.data.success)
		{
			$scope.Colleges = data.data.clgs;

			//console.log($scope.Colleges);
		}
		else
		{
			$scope.ClgMsg = data.data.message;
		}
	})

	$scope.findClg = function(clg_id)
	{
		$window.localStorage.setItem("clgid", clg_id);
		$location.path('/collegeview');
		//console.log($rootScope.clgid);
	}

	$scope.feature = function(feature)
	{
		//console.log(feature);
		$window.localStorage.setItem("feature", feature);
		$location.path('/features');

	}
	

	$scope.setCol1 = function(clg_data)
	{
		//console.log(clg_data);
		$scope.Clg1hide = true;
		$scope.compareerrmsg =false;
		$scope.searchClg1 = clg_data.College_Name;
		$scope.Clg1 = clg_data;

	}

	$scope.setCol2 = function(clg_data)
	{
		//console.log(clg_data);
		$scope.Clg2hide = true;
		$scope.compareerrmsg =false;
		$scope.searchClg2 = clg_data.College_Name;
		$scope.Clg2 = clg_data;



	}

	$scope.compare = function()
	{
		//console.log($scope.searchClg2._id);
		//console.log($scope.searchClg1._id);
		$scope.compareerrmsg =false;

		if($scope.searchClg2 == null || $scope.searchClg1 == null)
		{
			//console.log("in if");
			if($scope.searchClg1 == null)
			{
				$scope.compareerrmsg = "Plz Enter First College Name";
			}
			else if($scope.searchClg2 == null)
			{
				$scope.compareerrmsg = "Plz Enter Second College Name";
			}
			$location.path('/');
			
		}
		else
		{
			
			$window.localStorage.setItem("college1", $scope.Clg1._id);
			$window.localStorage.setItem("college2", $scope.Clg2._id);
			$location.path('/compare');
		}
	}

	$scope.sendmessage = function()
	{
		// console.log($scope.userName);
		// console.log($scope.userEmail);
		// console.log($scope.subject);
		// console.log($scope.userMessage);

		var sendMessage = 
		{
			UserName : $scope.userName,
			UserEmailId : $scope.userEmail,
			Subject :  $scope.subject,
			Message : $scope.userMessage
		}

		Clg.sendMessage(sendMessage).then(function (data) {
			
			if(data.data.success)
			{
				$scope.successmessage = data.data.message;

				
			}
			else
			{
				$scope.successmessage = data.data.message;

				console.log(data.data.message);
			}
		})


	}

})

.controller('clgCtrl',function(Clg,$location,$rootScope, $scope, $http,$window,$route,$timeout,$filter)
{
	$rootScope.currentpath = $location.path();

	var clg = $window.localStorage.getItem("clgid");
	var clgId =
	{
		clgId : clg
	}

	//console.log(clgId);
	
	Clg.getClg(clgId).then(function(data)
	{
		if(data.data.success)
		{
			
			$scope.AllGallary = [];
			for(var i=0;i<data.data.clg.Campus_Gallary.length;i++)
			{
				if($scope.AllGallary.indexOf(data.data.clg.Campus_Gallary[i].Campus_path) === -1)
				{
					$scope.AllGallary.push(data.data.clg.Campus_Gallary[i].Campus_path);
				}
				
			}
			 for(var i=0;i<data.data.clg.Classroom_Gallary.length;i++)
			{
				if($scope.AllGallary.indexOf(data.data.clg.Classroom_Gallary[i].Classroom_path) === -1)
				{
					$scope.AllGallary.push(data.data.clg.Classroom_Gallary[i].Classroom_path);
				}
				
			}
			for(var i=0;i<data.data.clg.Labs_Gallary.length;i++)
			{
				if($scope.AllGallary.indexOf(data.data.clg.Labs_Gallary[i].Lab_path) === -1)
				{
					$scope.AllGallary.push(data.data.clg.Labs_Gallary[i].Lab_path);
				}
				
			}
			for(var i=0;i<data.data.clg.Annual_Function_Gallary.length;i++)
			{
				if($scope.AllGallary.indexOf(data.data.clg.Annual_Function_Gallary[i].Annual_Function_path)=== -1)
				{
					$scope.AllGallary.push(data.data.clg.Annual_Function_Gallary[i].Annual_Function_path);
				}
				
			}

			//console.log(data.data.clg);
			

			$scope.clgInfo = data.data.clg;

			$scope.clgyear	=  $filter('date')(data.data.clg.Date_Of_Establish, "yyyy");

			$scope.currentyear	=	$filter('date')(new Date(),"yyyy");

			$scope.year	= $scope.currentyear - $scope.clgyear;

			$scope.College_Courses = data.data.clg.College_Degree_Courses.length + data.data.clg.College_Diploma_Courses.length;
			//console.log($scope.clgyear);
			
		}
	})

})