angular.module('DashboardCtrl', ['ClgServices'])

.controller('DashCtrl', function(Clg,$location,$rootScope, $scope, $http,$window,$route,$timeout) {

	$scope.GallaryMsg ="";
	$scope.updateMsg="";

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
		$scope.aboutus = true;

		Clg.getInfo().then(function(data)
		{
			//console.log(" College Data = " + data);

			$scope.ClgId = data.data.id;
			$scope.ClgName = data.data.College_Name;
			$scope.ClgEmail = data.data.Email;
			$scope.College_Type = data.data.College_Type;
			$scope.University_Name = data.data.University_Name;
			$scope.Date_Of_Establish = new Date(data.data.Date_Of_Establish);
			$scope.Website = data.data.Website;
			$scope.Railway_station = data.data.Railway_station;
			$scope.Bus_station = data.data.Bus_station;
			$scope.phone_Number = data.data.phone_Number;
			$scope.Fax_Number = data.data.Fax_Number;
			$scope.College_Program = data.data.College_Program;
			$scope.profile = data.data.profile;
			$scope.College_Degree_Courses = data.data.College_Degree_Courses;
			$scope.College_Diploma_Courses = data.data.College_Diploma_Courses;
			$scope.College_Facility = data.data.College_Facility;
			$scope.College_AboutUs = data.data.College_AboutUs;
			$scope.College_Faculty = data.data.College_Faculty;
			$scope.College_Companies = data.data.College_Companies;
			$scope.Locality = data.data.Locality;
			$scope.Street = data.data.Street;
			$scope.Dist = data.data.Dist;
			$scope.Tal = data.data.Tal;
			$scope.State = data.data.State;
			$scope.Pincode = data.data.Pincode;
			$scope.Twitter = data.data.Twitter;
			$scope.facebook = data.data.Facebook;
			$scope.instagram =data.data.Instagram;
			$scope.google	= data.data.Google;
			console.log(data.data.Twitter);

			var clgId =
			{
				id : $scope.ClgId
			}
			//console.log(data.data.id);
			Clg.getCampusGallary(clgId).then(function(data)
			{
				if(data.data.success)
				{
					$scope.gallary = data.data.CampusGallary;
					$scope.Classroom_Gallary = data.data.Classroom_Gallary;
					$scope.Labs_Gallary = data.data.Labs_Gallary;
					$scope.Annual_Function_Gallary = data.data.Annual_Function_Gallary;
				
				}
			})
		})
			
	}
	else
	{
		$scope.isLoggedIn=false;
		$location.path('/');
	}

	$scope.Aboutus = function()
	{
		$scope.aboutus = true;
		$scope.Courses = false;
		$scope.Facility = false;
		$scope.Contactus = false;
 	}

 	$scope.Coures = function()
 	{
 		$scope.Courses = true;
 		$scope.aboutus = false;
 		$scope.Facility = false;
		$scope.Contactus = false;
 	}

 	$scope.facility = function()
 	{
 		$scope.Facility = true;
 		$scope.Courses = false;
 		$scope.aboutus = false;
 		$scope.Contactus = false;
 	}
 	$scope.ContactUs = function()
 	{
 		$scope.Contactus = true;
 		$scope.Facility = false;
 		$scope.Courses = false;
 		$scope.aboutus = false;
 	}

 	$scope.exist = function(item)
	{
		return $scope.College_Degree_Courses.map(function (e) {return e.name;}).indexOf(item) > -1;
	}
	$scope.toggleSelection = function(item)
	{
		var idx = $scope.College_Degree_Courses.map(function (e) {return e.name;}).indexOf(item.name);

		if(idx > -1)
		{
			$scope.College_Degree_Courses.splice(idx,1);
		}
		else
		{
			$scope.College_Degree_Courses.push(item);

			
		}
	}
	$scope.diplomaexist = function(item)
	{
		return $scope.College_Diploma_Courses.map(function (e) {return e.name;}).indexOf(item) > -1;
	}
	$scope.togglediplomaSelection = function(item)
	{
		var idx = $scope.College_Diploma_Courses.map(function (e) {return e.name;}).indexOf(item.name);

		if(idx > -1)
		{
			$scope.College_Diploma_Courses.splice(idx,1);
		}
		else
		{
			$scope.College_Diploma_Courses.push(item);

			
		}
	}
	$scope.facility = function(item)
	{
		return $scope.College_Facility.map(function (e) {return e.name;}).indexOf(item) > -1;
	}
	$scope.toggleFacilitySelection = function(item)
	{
		var idx = $scope.College_Facility.map(function (e) {return e.name;}).indexOf(item.name);

		if(idx > -1)
		{
			$scope.College_Facility.splice(idx,1);
		}
		else
		{
			$scope.College_Facility.push(item);

			
		}
	}
	
 	$scope.filesChanged = function(ele)
 	{
	    $scope.filess=ele.files[0];
	    $scope.files1=ele.files;
	    var reader = new FileReader();
	    reader.onload =function(ele){
	        var output = document.getElementById('profile');
	        output.src=URL.createObjectURL($scope.filess);
	      	$scope.$apply(function($scope){
	        $scope.filess = ele.files;
	    });
	    }
	    reader.readAsDataURL(ele.files[0]);
	}

 	$scope.update = function()
 	{
 		$scope.updateMsgErr = false;
 		if($scope.files1)
 		{
            var fd = new FormData()
            angular.forEach($scope.files1,function(file){ fd.append('file',file) });
            $http.post('/image',fd,
            {
             	transformRequest:angular.identity,headers:{'Content-type':undefined}
            }).then(function(d)
            {
            		var newData = 
            		{

            		College_Name : $scope.ClgName,	
					ClgEmail: $scope.ClgEmail,
					College_Type:$scope.College_Type,
					University_Name :$scope.University_Name,
					Date_Of_Establish : $scope.Date_Of_Establish,
					Website :$scope.Website,
					Railway_station : $scope.Railway_station,
					Bus_station : $scope.Bus_station,
					phone_Number : $scope.phone_Number,
					Fax_Number : $scope.Fax_Number,
					College_Program : $scope.College_Program,
					profile : d.data,
					College_Degree_Courses : $scope.College_Degree_Courses,
					College_Diploma_Courses : $scope.College_Diploma_Courses,
					College_Facility : $scope.College_Facility,
					College_AboutUs : $scope.College_AboutUs,
					College_Faculty : $scope.College_Faculty,
					College_Companies : $scope.College_Companies,
					Locality : $scope.Locality,
					Street : $scope.Street,
					Dist : $scope.Dist,
					Tal : $scope.Tal,
					State : $scope.State,
					Pincode : $scope.Pincode,
					Twitter : $scope.Twitter,
					Facebook : $scope.facebook,
					Instagram :$scope.instagram,
					Google	: $scope.google


    			
          		}
				Clg.update(newData).then(function(data)
				{

					if (data.data.success) 
					{

						$scope.updateMsg =data.data.message;
						$timeout(function()
					 	{
					 		$location.path('/Dashboard');
					 	}, 3000);
						
					}
					else
					{
						$scope.updateMsgErr =data.data.message;

					}
				});
			})
        }
        else
        {
        	var newData = 
        	{
					College_Name : $scope.ClgName,	
					ClgEmail: $scope.ClgEmail,
					College_Type:$scope.College_Type,
					University_Name :$scope.University_Name,
					Date_Of_Establish : $scope.Date_Of_Establish,
					Website :$scope.Website,
					Railway_station : $scope.Railway_station,
					Bus_station : $scope.Bus_station,
					phone_Number : $scope.phone_Number,
					Fax_Number : $scope.Fax_Number,
					College_Program : $scope.College_Program,
					profile : $scope.profile,
					College_Degree_Courses : $scope.College_Degree_Courses,
					College_Diploma_Courses : $scope.College_Diploma_Courses,
					College_Facility : $scope.College_Facility,
					College_AboutUs : $scope.College_AboutUs,
					College_Faculty : $scope.College_Faculty,
					College_Companies : $scope.College_Companies,
					Locality : $scope.Locality,
					Street : $scope.Street,
					Dist : $scope.Dist,
					Tal : $scope.Tal,
					State : $scope.State,
					Pincode : $scope.Pincode,
					Twitter : $scope.Twitter,
					Facebook : $scope.facebook,
					Instagram :$scope.instagram,
					Google	: $scope.google
			}

			Clg.update(newData).then(function(data){
				if (data.data.success) 
				{
					
					$scope.updateMsg =data.data.message;
					$timeout(function()
					{
					 	$location.path('/Dashboard');
					}, 3000);
				}
				else
				{
					$scope.updateMsgErr =data.data.message;
				}
		});
    }
   }
   
   $scope.campusFiles = function(ele)
 	{

	    $scope.filess=ele.files[0];
	    $scope.campusPic=ele.files;
	    var reader = new FileReader();
	    reader.onload =function(ele){
	        var output = document.getElementById('campusimg');
	        output.src=URL.createObjectURL($scope.filess);
	      	$scope.$apply(function($scope){
	        $scope.filess = ele.files;
	    });
	    }
	    reader.readAsDataURL(ele.files[0]);
	}
	 


	$scope.campus = function()
	{
			if($scope.campusPic)
			{
				var fd = new FormData()
            	angular.forEach($scope.campusPic,function(file){ fd.append('file',file) });
            	$http.post('/gallary',fd,
            	{
             		transformRequest:angular.identity,headers:{'Content-type':undefined}
            	}).then(function(data)
            	{
            		console.log(data.data);
            		var campusData = 
            		{
            			campusPic : data.data,
            			ClgId: $scope.ClgId
            		}

            		Clg.campusGallary(campusData).then(function(data)
            		{
            			if (data.data.success) 
						{
							$scope.GallaryMsg =data.data.message;
							$timeout(function()
							{
					 			$location.path('/Gallary');
					 			location.reload();
							}, 3000);
							
						}
            		})
            	})	
			}	
			
	}

	$scope.classroomFiles = function(ele)
 	{
 		//console.log("filesClass");
	    $scope.filess=ele.files[0];
	    $scope.classroomPic=ele.files;
	    var reader = new FileReader();
	    reader.onload =function(ele){
	        var output = document.getElementById('classroom');
	        output.src=URL.createObjectURL($scope.filess);
	      	$scope.$apply(function($scope){
	        $scope.filess = ele.files;
	    });
	    }
	    reader.readAsDataURL(ele.files[0]);
	}

	$scope.classroom= function()
	{
			if($scope.classroomPic)
			{
				var fd = new FormData()
            	angular.forEach($scope.classroomPic,function(file){ fd.append('file',file) });
            	$http.post('/gallary',fd,
            	{
             		transformRequest:angular.identity,headers:{'Content-type':undefined}
            	}).then(function(data)
            	{
            		//console.log(data.data);
            		var classroomPicData = 
            		{
            			classroomPic : data.data,
            			ClgId: $scope.ClgId
            		}

            		Clg.classroomGallary(classroomPicData).then(function(data)
            		{
            			if (data.data.success) 
						{
							$scope.classroomMsg =data.data.message;
							$timeout(function()
							{
					 			$location.path('/Gallary');
					 			location.reload();
							}, 3000);
						}
            		})
            	})	
			}	
			
	}

	$scope.labsFiles = function(ele)
 	{
 		//console.log("filesClass");
	    $scope.filess=ele.files[0];
	    $scope.labspic=ele.files;
	    var reader = new FileReader();
	    reader.onload =function(ele){
	        var output = document.getElementById('labspic');
	        output.src=URL.createObjectURL($scope.filess);
	      	$scope.$apply(function($scope){
	        $scope.filess = ele.files;
	    });
	    }
	    reader.readAsDataURL(ele.files[0]);
	}

	$scope.labs= function()
	{
			if($scope.labspic)
			{
				var fd = new FormData()
            	angular.forEach($scope.labspic,function(file){ fd.append('file',file) });
            	$http.post('/gallary',fd,
            	{
             		transformRequest:angular.identity,headers:{'Content-type':undefined}
            	}).then(function(data)
            	{
            		//console.log(data.data);
            		var labspicData = 
            		{
            			labspic : data.data,
            			ClgId: $scope.ClgId
            		}

            		Clg.clgLabGallary(labspicData).then(function(data)
            		{
            			if (data.data.success) 
						{
							$scope.labsMsg =data.data.message;
							$timeout(function()
							{
					 			$location.path('/Gallary');
					 			location.reload();
							}, 3000);
						}
            		})
            	})	
			}	
			
	}

	$scope.AnnualFiles = function(ele)
 	{
 		//console.log("filesClass");
	    $scope.filess=ele.files[0];
	    $scope.annualPic=ele.files;
	    var reader = new FileReader();
	    reader.onload =function(ele){
	        var output = document.getElementById('annualPic');
	        output.src=URL.createObjectURL($scope.filess);
	      	$scope.$apply(function($scope){
	        $scope.filess = ele.files;
	    });
	    }
	    reader.readAsDataURL(ele.files[0]);
	}

	$scope.annualFun= function()
	{
			if($scope.annualPic)
			{
				var fd = new FormData()
            	angular.forEach($scope.annualPic,function(file){ fd.append('file',file) });
            	$http.post('/gallary',fd,
            	{
             		transformRequest:angular.identity,headers:{'Content-type':undefined}
            	}).then(function(data)
            	{
            		//console.log(data.data);
            		var annualPicData = 
            		{
            			annualPic : data.data,
            			ClgId: $scope.ClgId
            		}

            		Clg.annualFunGallary(annualPicData).then(function(data)
            		{
            			if (data.data.success) 
						{
							$scope.annualFunMsg =data.data.message;
							$timeout(function()
							{
					 			$location.path('/Gallary');
					 			location.reload();
							}, 3000);
						}
            		})
            	})	
			}	
			
	}

	$scope.changePass = function(oldPass,newPass)
	{
		//console.log(oldPass);
		var oldPassword= 
		{
			oldPass : oldPass,
			ClgId: $scope.ClgId
		}
		//console.log(oldPassword);
		Clg.CheckOldPass(oldPassword).then(function(data)
		{
			if(data.data.success)
			{
				//console.log(data.data.message);
				var newPassword= 
				{
					newPass : newPass,
					ClgId: $scope.ClgId
				}
				Clg.changePass(newPassword).then(function(data)
				{
					if(data.data.success)
					{
						$scope.passchangesucc = data.data.message;
					}
					else
					{
						$scope.passChangeerr = data.data.message ;
						$timeout(function()
						{

							$location.path('/ChangePass');
							location.reload();
						},2000);
					}
				})

			}

			else
			{
				$scope.oldpasserr = data.data.message;
			}
		})

	}




})