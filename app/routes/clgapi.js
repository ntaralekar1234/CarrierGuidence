var Clg        = require('../models/college');
var jwt         = require('jsonwebtoken');
var secret      = 'magicwand';
var bcrypt = require('bcrypt-nodejs');
var nodemailer  = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

module.exports = function(router) 
{
	var options = {
				  auth: {
				    api_user: 'NikhilTaralekar',
				    api_key: 'nikhil1234'
				  }
				}

		var client = nodemailer.createTransport(sgTransport(options));

	router.post('/clgs', function(req, res)
	{
		var clg = new Clg();
		
	
		clg.College_Name = req.body.clgInfo.clgName;
		clg.College_Type = req.body.clgInfo.clgType;
		clg.Email = req.body.clgInfo.email;
		clg.University_Name = req.body.clgInfo.UniName;
		clg.Website = req.body.clgInfo.clgweb;
		clg.password = req.body.clgInfo.clgpass;
		clg.Confpassword = req.body.clgInfo.clgCnfpass;
		clg.Date_Of_Establish = req.body.clgInfo.clgdate;
		clg.Railway_station = req.body.clgInfo.Railway;
		clg.Bus_station = req.body.clgInfo.Bus;
		clg.phone_Number = req.body.clgInfo.Phone;
		clg.Fax_Number = req.body.clgInfo.fax;
		clg.College_Program = req.body.clgProg;
		clg.College_Degree_Courses = req.body.degreeCourse;
		clg.College_Diploma_Courses = req.body.diplomaCourse;
		clg.College_Facility = req.body.clgfacility;
		clg.profile= req.body.clgProfile;

		if (req.body.clgInfo.clgName == null || req.body.clgInfo.clgName == '') 
		{
			res.json({ success: false, message: 'Ensure College name were provided.' });
		}
		else if (req.body.clgInfo.clgType == null || req.body.clgInfo.clgType == '') 
		{
			res.json({ success: false, message: 'Ensure College Type were provided.' });
		}
		else if (req.body.clgInfo.email == null || req.body.clgInfo.email == '') 
		{
			res.json({ success: false, message: 'Ensure Email were provided.' });
		}
		
		else if (req.body.clgInfo.clgweb == null || req.body.clgInfo.clgweb == '') 
		{
			res.json({ success: false, message: 'Ensure college Website were provided.' });
		}
		else if (req.body.clgProg[0] == null || req.body.clgProg[0] == '') 
		{
			res.json({ success: false, message: 'Ensure College Program were provided.' });
		}

		else if (req.body.clgfacility[0] == null || req.body.clgfacility[0] == '') 
		{
			res.json({ success: false, message: 'Ensure College Facility were provided.' });
		}
		else if (req.body.clgInfo.clgpass == null || req.body.clgInfo.clgpass == '') 
		{
			res.json({ success: false, message: 'Ensure Password were provided.'});
		}
		else if (req.body.clgInfo.clgCnfpass == null || req.body.clgInfo.clgCnfpass == '') 
		{
			res.json({ success: false, message: 'Please Comfirm your Password.'});
		}	
		else if (req.body.clgInfo.clgpass!= req.body.clgInfo.clgCnfpass) 
		{
			res.json({ success: false, message: 'Password not matched.'});
		}

		else
		{
			clg.save(function(err)
		{
			if (err) 
			{
				res.json({ success: false, message: err});
			}
			else
			{

				
				res.json({ success: true, message: 'Registration Successfully'});
			}
		});
		}
	});

	router.post('/clgauthenticate',function(req,res)
	{
		Clg.findOne({Email: req.body.ClgEmail},function(err,college)
		{
			if(err)
			{
				console.log(err);
			}
			else if(!college)
			{
				res.json({ success: false, message: 'Could not authenticate College' });
			}
			else if(!college.Online)
			{
				res.json({ success: false, message: 'College account is not yet activated' });
			}
			else if(college)
			{
				if(req.body.ClgPass)
				{
					var validPassword = college.comparePassword(req.body.ClgPass);

					//console.log(validPassword);
				}
				else
				{
						res.json({success: false, message: 'Password not provided'});
				}
				if (!validPassword) 
				{
						res.json({success: false, message: 'Could not authenticate password'});
				}
				else
				{
					var token = jwt.sign({ 
							id:college._id,
							College_Name:college.College_Name, 
							Email:college.Email, 
							College_Type:college.College_Type, 
							University_Name:college.University_Name,
							Date_Of_Establish:college.Date_Of_Establish,
							Website:college.Website,
							Railway_station:college.Railway_station,
							Bus_station:college.Bus_station,
							phone_Number:college.phone_Number,
							Fax_Number:college.Fax_Number,
							College_Program:college.College_Program,	
							profile:college.profile,
							College_Diploma_Courses:college.College_Diploma_Courses,
							College_Degree_Courses:college.College_Degree_Courses,
							College_Facility:college.College_Facility,
							College_AboutUs : college.College_About_us,
							College_Faculty: college.College_Faculty,
							College_Companies: college.College_Companies,
							Locality: college.Locality,
							Street:college.Street,
							Dist:college.Dist,
							Tal:college.Tal,
							State:college.State,
							Pincode:college.Pincode,
							Twitter	: college.Twitter,
							Facebook : college.Facebook,
							Instagram : college.Instagram,
							Google : college.Google
							//joindate:college.JoinDate
						},secret, { expiresIn: '2h' });
					res.json({ success: true, message: ' Loading..',token : token});
				}
			}

		})	
	});

	router.put('/updateInfo',function(req,res)
	{
		if (req.body.College_Name == null || req.body.College_Name == '') 
		{
			res.json({ success: false, message: 'Ensure College name were provided.' });
		}
		else if (req.body.College_Type == null || req.body.College_Type == '') 
		{
			res.json({ success: false, message: 'Ensure College Type were provided.' });
		}
		else if (req.body.Website == null || req.body.Website == '') 
		{
			res.json({ success: false, message: 'Ensure College Website were provided.' });
		}
		else if (req.body.Date_Of_Establish == null || req.body.Date_Of_Establish == '') 
		{
			res.json({ success: false, message: 'Ensure Date_Of_Establish were provided.' });
		}
		else if (req.body.Railway_station == null || req.body.Railway_station == '') 
		{
			res.json({ success: false, message: 'Ensure near Railway station were provided.' });
		}
		else if (req.body.Bus_station == null || req.body.Bus_station == '') 
		{
			res.json({ success: false, message: 'Ensure near Bus station were provided.' });
		}
		else if (req.body.phone_Number == null || req.body.phone_Number == '' || isNaN(req.body.phone_Number)) 
		{
			res.json({ success: false, message: 'Ensure phone Number were provided or in correct format.' });
		}
		else if (req.body.Fax_Number == null || req.body.Fax_Number == '' || isNaN(req.body.Fax_Number)) 
		{
			res.json({ success: false, message: 'Ensure Fax Number were provided or in correct format.' });
		}
		else if (req.body.profile == null || req.body.profile == '') 
		{
			res.json({ success: false, message: 'Ensure College profile were provided.' });
		}
		else if (req.body.College_AboutUs == null || req.body.College_AboutUs == '') 
		{
			res.json({ success: false, message: 'Ensure College AboutUs were provided.' });
		}
		else if (req.body.College_Faculty == null || req.body.College_Faculty == '' || isNaN(req.body.College_Faculty)) 
		{
			res.json({ success: false, message: 'Ensure College Faculty were provided.' });
		}
		else if (req.body.College_Companies == null || req.body.College_Companies == '' || isNaN(req.body.College_Companies)) 
		{
			res.json({ success: false, message: 'Ensure College Companies were provided.' });
		}
		
		else if (req.body.Locality == null || req.body.Locality == '') 
		{
			res.json({ success: false, message: 'Ensure College Locality were provided.' });
		}
		else if (req.body.Street == null || req.body.Street == '') 
		{
			res.json({ success: false, message: 'Ensure College Street were provided.' });
		}
		else if (req.body.Dist == null || req.body.Dist == '') 
		{
			res.json({ success: false, message: 'Ensure College Dist were provided.' });
		}
		else if (req.body.Tal == null || req.body.Tal == '') 
		{
			res.json({ success: false, message: 'Ensure College Tal were provided.' });
		}
		else if (req.body.State == null || req.body.State == '') 
		{
			res.json({ success: false, message: 'Ensure College State were provided.' });
		}
		else if (req.body.Pincode == null || req.body.Pincode == '' || isNaN(req.body.Pincode)) 
		{
			res.json({ success: false, message: 'Ensure College Pincode were provided or in correct format.' });
		}
		else
		{
			Clg.update({Email: req.body.ClgEmail}, 
			{
				$set:{
			 	     	College_Name 		: req.body.College_Name,									
						College_Type		: req.body.College_Type,
						University_Name		: req.body.University_Name,
						Website 			: req.body.Website,
						Date_Of_Establish	: req.body.Date_Of_Establish,
						Railway_station		: req.body.Railway_station,
						Bus_station 		: req.body.Bus_station,
						phone_Number 		: req.body.phone_Number,
						Fax_Number 			: req.body.Fax_Number,
						College_Program 	: req.body.College_Program,
						College_Diploma_Courses:req.body.College_Diploma_Courses,
						College_Degree_Courses:req.body.College_Degree_Courses,
						College_Facility 	: req.body.College_Facility,
						profile 			: req.body.profile,
						College_About_us	: req.body.College_AboutUs,
						College_Faculty 	: req.body.College_Faculty,
						College_Companies 	: req.body.College_Companies,
						Locality 			: req.body.Locality,
						Street				: req.body.Street,
						Dist				: req.body.Dist,
						Tal					: req.body.Tal,
						State				: req.body.State,
						Pincode				: req.body.Pincode,
						Twitter				: req.body.Twitter,
						Facebook			: req.body.Facebook,
						Instagram			: req.body.Instagram,
						Google				: req.body.Google
					}
			}, 
			function(err, clg)
			{
				if(err)
				{
					res.json({success: false, message:err});

				}
				else
				{
					var email=req.body.ClgEmail;
					//console.log('Information Updated');
					res.json({success: true, message:'Information Updated', clg:clg, email:email});
				}
			});	
		}
		
		
	})

	router.post('/newtoken',function(req,res){
		console.log("in new Token");
	Clg.findOne({ Email: req.body.ClgEmail})
	.select('_id College_Name College_Type University_Name Email Website Date_Of_Establish Railway_station Bus_station phone_Number Fax_Number College_Program College_Degree_Courses College_Diploma_Courses College_Facility profile College_About_us College_Faculty College_Companies Locality Street Dist Tal State Pincode Twitter Facebook Instagram Google')
	.exec(function (err, clg) {

		if(err)
		{
			throw err;
		}
		else
		{
		 token = jwt.sign({ 
						id:clg._id,
						College_Name:clg.College_Name, 
						College_Type:clg.College_Type, 
						University_Name:clg.University_Name, 
						Email:clg.Email,
						Website:clg.Website,
						Date_Of_Establish:clg.Date_Of_Establish,
						Railway_station:clg.Railway_station,
						Bus_station:clg.Bus_station,
						phone_Number:clg.phone_Number,
						Fax_Number:clg.Fax_Number,
						College_Diploma_Courses:clg.College_Diploma_Courses,
						College_Degree_Courses:clg.College_Degree_Courses,	
						College_Courses:clg.College_Courses,
						joindate:clg.JoinDate,
						profile:clg.profile,
						College_Facility:clg.College_Facility,
						College_AboutUs : clg.College_About_us,
						College_Faculty : clg.College_Faculty,
						College_Companies : clg.College_Companies,
						Locality		: clg.Locality,
						Street : clg.Street,
						Dist : clg.Dist,
						Tal	 : clg.Tal,
						State : clg.State,
						Pincode : clg.Pincode,
						Twitter	: clg.Twitter,
						Facebook : clg.Facebook,
						Instagram : clg.Instagram,
						Google : clg.Google
					}, secret, { expiresIn: '1h' });
			 //console.log('token::' + token);
			 
			res.json({ success: true, message: 'Updating..',token : token, clg:clg});
			}	
	});
});

	router.get('/allClg',function(req,res)
	{
		//console.log("in All College");

		Clg.find({Online:true}).select('_id College_Name profile').exec(function(err,clgs)
		{
			if (err) 
			{
				res.json({success:false, message:err});
			}
			if(!clgs)
			{
				res.json({success:false,message:'No college '});
			}
			else
			{
				//console.log(clgs[0]._id);

				res.json({success:true,clgs:clgs});
			}
		})
	});

	router.post('/getClg',function(req,res)
	{
		//console.log("clgid " +req.body.clgId);
		Clg.findOne({_id : req.body.clgId })
		.select('_id College_Name College_Type University_Name Email Website Date_Of_Establish Railway_station Bus_station phone_Number Fax_Number College_Program College_Degree_Courses College_Diploma_Courses College_Facility profile College_About_us College_Faculty College_Companies Locality Street Dist Tal State Pincode Campus_Gallary Classroom_Gallary Labs_Gallary Annual_Function_Gallary Twitter Facebook Instagram Google')
		.exec(function(err,clg)
		{
			if(err)
			{
				res.json({success:false,message:err});
			}
			if(clg)
			{
				res.json({success:true,clg:clg});
			}
		})
	});

	router.post('/getfeatureClg',function(req,res)
	{
		

		if(req.body.feature == 'Degree' || req.body.feature == 'Diploma')
		{
			//console.log("College_Program" + req.body.feature);

			Clg.find({$and:[{College_Program: {$elemMatch : {name : req.body.feature}}},{Online:true}]})
			.select('_id College_Name College_Type University_Name Railway_station Bus_station College_Program profile')
			.exec(function(err,clgs)
			{
				if(err)
				{
					res.json({success:false,message:err});
				}
				if(!clgs)
				{
					res.json({success:false,message:'no college found'});
				}
				else
				{
					//console.log(clgs);
					res.json({success:true,clgs:clgs});
				}
			})
		}
		else if(req.body.feature == 'Autonomous' || req.body.feature == 'Government' || req.body.feature == 'Non-Autonomous')
		{

			Clg.find({$and:[{College_Type: req.body.feature},{Online:true}]})
			.select('_id College_Name College_Type University_Name Railway_station Bus_station College_Program profile')
			.exec(function(err,clgs)
			{
				if(err)
				{
					res.json({success:false,message:err});
				}
				if(!clgs)
				{
					res.json({success:false,message:'no college found'});
				}
				else
				{
					//console.log(clgs);
					res.json({success:true,clgs:clgs});
				}
			})


		}

		else
		{
			Clg.find({$and:[{College_Facility : {$elemMatch : {name : req.body.feature}}},{Online:true}]})
			.select('_id College_Name College_Type University_Name Railway_station Bus_station College_Program profile')
			.exec(function(err,clgs)
			{
				if(err)
				{
					res.json({success:false,message:err});
				}
				if(!clgs)
				{
					res.json({success:false,message:'no college found'});
				}
				else
				{
					//console.log(clgs);
					res.json({success:true,clgs:clgs});
				}
			})
		}
	});

	router.post('/compareClg',function(req,res)
	{
		//console.log(req.body.college1);
		//console.log(req.body.college2);
		Clg.findOne({_id : req.body.college1})
		.select('_id College_Name College_Type profile College_Degree_Courses College_Diploma_Courses College_Facility College_Faculty College_Companies Locality Street Dist Tal State Pincode')
		.exec(function(err,clg1)
		{
			if(err)
			{
				res.json({success:false,message:err});
			}
			else
			{
				Clg.findOne({_id : req.body.college2})
				.select('_id College_Name College_Type profile College_Degree_Courses College_Diploma_Courses College_Facility College_Faculty College_Companies Locality Street Dist Tal State Pincode')
				.exec(function(err,clg2)
				{
					if(err)
					{
						res.json({success:false,message:err});
					}
					else
					{
						//console.log(clg1);
						//console.log(clg2);
						res.json({success:true,clg1:clg1,clg2:clg2});
					}
				})	
			}
		})
	})

	router.post('/campusGallary',function(req,res)
	{
		//console.log(req.body.ClgId);
		//console.log(req.body.campusPic);
		Clg.update({_id : req.body.ClgId},
				{$push: {
							Campus_Gallary: {
							         
							         Campus_path:req.body.campusPic
							         }
						}
				},function(err,data)
				{
					if(err)
					{
						res.json({success:false,message:"college campus image not saved"});
					}
					else
					{
						res.json({success:true,message:"college campus image saved"});
					}
				}

			)
	})

	router.post('/classroomGallary',function(req,res)
	{
		//console.log(req.body.ClgId);
		//console.log(req.body.campusPic);
		Clg.update({_id : req.body.ClgId},
				{$push: {
							Classroom_Gallary: {
							         
							         Classroom_path:req.body.classroomPic
							         }
						}
				},function(err,data)
				{
					if(err)
					{
						res.json({success:false,message:"classroom image not saved"});
					}
					else
					{
						res.json({success:true,message:"classroom image saved"});
					}
				}

			)
	})

	router.post('/clgLabGallary',function(req,res)
	{
		//console.log(req.body.ClgId);
		//console.log(req.body.campusPic);
		Clg.update({_id : req.body.ClgId},
				{$push: {
							Labs_Gallary: {
							         
							         Lab_path:req.body.labspic
							         }
						}
				},function(err,data)
				{
					if(err)
					{
						res.json({success:false,message:" College Labs image not saved"});
					}
					else
					{
						res.json({success:true,message:" College Labs image saved"});
					}
				}

			)
	})

	router.post('/annualFunGallary',function(req,res)
	{
		//console.log(req.body.ClgId);
		//console.log(req.body.campusPic);
		Clg.update({_id : req.body.ClgId},
				{$push: {
							Annual_Function_Gallary: {
							         
							         Annual_Function_path:req.body.annualPic
							         }
						}
				},function(err,data)
				{
					if(err)
					{
						res.json({success:false,message:"Annual Function image not saved"});
					}
					else
					{
						res.json({success:true,message:"Annual Function image saved"});
					}
				}

			)
	})



	router.post('/getCampusGallary',function(req,res)
	{
		console.log(req.body.id);
		Clg.findOne({_id : req.body.id}).select('Campus_Gallary').exec(function(err,data)
		{
			if(err)
			{
				res.json({success:false,message:"images not found"});
			}
			else
			{
	
				Clg.findOne({_id : req.body.id}).select('Classroom_Gallary').exec(function(err,classroom)
				{

					if(err)
					{
								res.json({success:false,message:"images not found"});
					}
					else
					{

						Clg.findOne({_id : req.body.id}).select('Labs_Gallary').exec(function(err,lab)
						{

							if(err)
							{
								res.json({success:false,message:"images not found"});
							}
							else
							{
								Clg.findOne({_id : req.body.id}).select('Annual_Function_Gallary').exec(function(err,annualFunGallary)
								{

									if(err)
									{
										res.json({success:false,message:"images not found"});
									}
									else
									{
										res.json({success:true,CampusGallary:data.Campus_Gallary,Classroom_Gallary:classroom.Classroom_Gallary,Labs_Gallary:lab.Labs_Gallary,Annual_Function_Gallary:annualFunGallary.Annual_Function_Gallary});
									}

								})
							}

						})
					}

				})
						
			}
		})
	})

	router.post('/CheckOldPass',function(req,res)
	{
		//console.log(req.body.ClgId);

		Clg.findOne({_id : req.body.ClgId}).exec(function(err,clg)
		{
			if(err)
			{
				res.json({success:false,message:"Clg not Found"});
			}
			else if(clg)
			{
				if(req.body.oldPass) 
				{
					var validPassword = clg.comparePassword(req.body.oldPass);
					if (!validPassword) 
					{
						res.json({success: false, message: 'Incorrect old Password.'});
					}
					else
					{
						res.json({success: true,message: 'correct old Password.'});
					}
				}
			}
		})
	})

	router.post('/changePass',function(req,res)
	{
		bcrypt.hash(req.body.newPass, null, null, function(err, hash)
		{

			var password = hash;
			if(err) throw err;
			else
			{
				Clg.update({_id : req.body.ClgId}, 
				{$set: {
						 	 password:password,
						}},
				function(err, clg)
				 {
					if(err)
					{
						res.send({success:false,message:"Password not Changed"});
					}
					else
					{
						res.send({success:true,message:"Password Change Successfully"});
					}
				})		
			}
		})

	})

	router.post('/sendMessage',function(req,res)
	{
		var email = {
						from: req.body.UserEmailId,
						to: 'bgcnikhil@gmail.com',
						subject: req.body.Subject,
						text: req.body.Message
						
						};

						client.sendMail(email, function(err, info)
				  		{
				    		if (err){
				     				 	//console.log(err);
				     				 	res.json({ success: false, message: 'Message not send '});
				    				}
				    		else{
				      				res.json({ success: true, message: 'Message send Successfully'});
				    			}
						});
						
	})



	router.use(function(req,res, next)
	{

		var token = req.body.token || req.body.query || req.headers['x-access-token'];

		if (token) 
		{
		 // verify token
		 	jwt.verify(token, secret, function(err, decoded)
		 	{
			 	if(err)
			 	{
			 		res.json({success: false , message:'invalid token'});
			 	}
			 	else
			 	{
			 		req.decoded = decoded;
			 		next();
			 	}
		 	});
		} else
		{

			res.json({success: false , message:'no token provided'});
		}
	});

	router.post('/me',function(req,res)
	{
		res.send(req.decoded);
	});

	return router;
}
