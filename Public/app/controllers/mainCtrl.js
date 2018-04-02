angular.module('mainController', ['ClgServices'])


.controller('mainCtrl', function(Clg,$location,$rootScope, $scope, $http,$window,$route,$timeout) {
	$scope.isLoggedIn=false;

	//$rootScope.currentpath = $location.path();
	$scope.formData={};
	
	$scope.clgProg=[];
	$scope.degreeCourse=[];
	$scope.diplomaCourse=[];
	$scope.clgfacility=[];


	$scope.clgProgram =[
	{name:'Degree'},
	{name:'Diploma'},
	
	]; 

	$scope.clgCourses =[
	{name:'Mechanical Engineering'},
	{name:'Computer Engineering'},
	{name:'Civil Engineering'},
	{name:'E & Tc Engineering'},
	{name:'Electric Engineering'},
	{name:'Electronic Engineering'},
	{name:'IT Engineering'},
	{name:'Instrumentation Engineering'},
	];

	$scope.clgFacility=[
		{name:'Wifi Campus'},
		{name:'Library'},
		{name:'College Bus'},
		{name:'Canteen'},
		{name:'A/c Classrooms'},
		{name:'Boys Hostel'},
		{name:'Girls Hostel'},
		{name:'Lunch/Dinner mess'},
		{name:'ARC Center'},
		{name:'Gym'},
		{name:'Playground'},
		{name:'Parking'},
		{name:'College Store'}

	]; 

	if(Clg.isLoggedIn())
	{
		$scope.isLoggedIn=true;
		$location.path('/Dashboard');

		Clg.getInfo().then(function(data)
		{
			$scope.ClgId = data.data.id;
			$scope.ClgName = data.data.College_Name;
			$scope.ClgEmail = data.data.Email;
		})
	}
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

	$scope.showClg = function(clg_id)
	{
		//console.log(clg_id);

		$window.localStorage.setItem("clgid", clg_id);
		$location.path('/collegeview');

	}
	$scope.logout = function()
	{
		//console.log("logout function");
		
		Clg.logout();


		$timeout(function()
		{

			$location.path('/');
			location.reload();
		},2000);
	}

	 $scope.filesChangerd = function(ele)
		{
			$scope.CRerrorMsg="";
				    $scope.filess=ele.files[0];
				    $scope.files=ele.files;
				    
    				var reader = new FileReader();

    				reader.onload =function(ele)
    				{
    					var output = document.getElementById('output');
    					
    					output.src=URL.createObjectURL($scope.filess);
    					$scope.$apply(function($scope)
    					{
   							 $scope.filess = ele.files;
    					});
    					
    				}
    				reader.readAsDataURL(ele.files[0]);
                    
		}

	

	

	$scope.ClgRegister = function()
	{
                           
        if($scope.files)
        {
         	var fd = new FormData()
        	angular.forEach($scope.files,function(file){ fd.append('file',file) });

        	$http.post('/image',fd,
        	{
            	transformRequest:angular.identity,headers:{'Content-type':undefined}
       		 }).then(function(d)
        	{
        		if($scope.formData.clgType != 'Autonomous')
        		{
        			
        			if($scope.formData.UniName != "" && $scope.formData.UniName != null)
        			{
        				
        				var clgData = 
	        			{
							clgInfo:$scope.formData,
							clgProg:$scope.clgProg,
							degreeCourse:$scope.degreeCourse,
							diplomaCourse:$scope.diplomaCourse,
							clgfacility:$scope.clgfacility,
							clgProfile:d.data
						}
						Clg.create(clgData).then(function(data)
						{
							if (data.data.success) 
							{
							
								$scope.CRsuccessMsg = data.data.message;
								
								$timeout(function()
								 {
									window.location= "index.html";
								 }, 8000);
							}
							else
							{
								$scope.CRerrorMsg =  data.data.message;
							}
						});
        			}
        			else
        			{
        				$scope.CRerrorMsg ="Plz Enter University Name";
        			}
        			 	
        		}
        		else
        		{
        				var clgData = 
	        			{
							clgInfo:$scope.formData,
							clgProg:$scope.clgProg,
							degreeCourse:$scope.degreeCourse,
							diplomaCourse:$scope.diplomaCourse,
							clgfacility:$scope.clgfacility,
							clgProfile:d.data
						}
						Clg.create(clgData).then(function(data)
						{
							if (data.data.success) 
							{
							
								$scope.CRsuccessMsg = data.data.message;
								
								$timeout(function()
								 {
									window.location= "index.html";
								 }, 8000);
							}
							else
							{
								$scope.CRerrorMsg =  data.data.message;
							}
						});
        		}
        

        		                    
        	});
        }  
        else
        {
        	$scope.CRerrorMsg =  "Plz Select Image";
        }                
		
	}

	$scope.exist = function(item)
	{
		return $scope.clgProg.indexOf(item) > -1;
	}
	$scope.toggleSelection = function(item)
	{
		var idx = $scope.clgProg.indexOf(item);
		//console.log(idx);

		if(idx > -1)
		{	
			if(item.name == 'Degree')
			{
				$scope.clgProg.splice(idx,1);
				$scope.degree = false;
				$scope.degreeCourse=[];
				console.log($scope.degreeCourse);
			}
			else
			{
				$scope.clgProg.splice(idx,1);
				$scope.diploma = false;
				$scope.diplomaCourse=[];
				console.log($scope.diplomaCourse);
			}
			
		}
		else
		{
			if(item.name == 'Degree')
			{
				$scope.clgProg.push(item);
				$scope.degree = true;
			}
			else
			{
				$scope.clgProg.push(item);
				$scope.diploma = true;
			}
		}
	}

	$scope.degreecourse = function(item)
	{
		return $scope.degreeCourse.indexOf(item) > -1;
	}

	$scope.toggledegreeCourseSelection = function(item)
	{
		var idx = $scope.degreeCourse.indexOf(item);

		if(idx > -1)
		{
			$scope.degreeCourse.splice(idx,1);
			console.log($scope.degreeCourse);
		}
		else
		{
			$scope.degreeCourse.push(item);
			console.log($scope.degreeCourse);
		}	
	}

	$scope.diplomacourse = function(item)
	{
		return $scope.diplomaCourse.indexOf(item) > -1;
	}

	$scope.togglediplomaCourseSelection = function(item)
	{
		var idx = $scope.diplomaCourse.indexOf(item);

		if(idx > -1)
		{
			$scope.diplomaCourse.splice(idx,1);
		}
		else
		{
			$scope.diplomaCourse.push(item);
		}	
	}

	$scope.cfacility = function(item)
	{
		return $scope.clgfacility.indexOf(item) > -1;
	}

	$scope.toggleFacilitySelection = function(item)
	{
		var idx = $scope.clgfacility.indexOf(item);

		if(idx > -1)
		{
			$scope.clgfacility.splice(idx,1);
		}
		else
		{
			$scope.clgfacility.push(item);
		}		
	}




	
})

