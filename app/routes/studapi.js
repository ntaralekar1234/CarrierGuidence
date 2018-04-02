var User        = require('../models/student');


module.exports = function(router) 
{

	router.post('/users', function(req, res){

	
	var user = new User();
	var joindate = new Date();
	
	user.Firstname = req.body.fname;
	user.Lastname = req.body.lname;
	user.email = req.body.email;
	
	user.dob = req.body.dob;
	user.gender = req.body.gender;
	user.password = req.body.password;
	user.Confpassword = req.body.confpassword;
	user.State = req.body.State;
	
	user.JoinDate = joindate;

	if (req.body.fname == null || req.body.fname == '') 
	{
		res.json({ success: false, message: 'Ensure Firstname were provided.' });
	}
	if (req.body.lname == null || req.body.lname == '') 
	{
		res.json({ success: false, message: 'Ensure Lastname were provided.' });
	}
	if (req.body.email == null || req.body.email == '') 
	{
		res.json({ success: false, message: 'Ensure Email were provided.' });
	}
	if (req.body.State == null || req.body.State == '') 
	{
		res.json({ success: false, message: 'Ensure State were provided.' });
	}
	if (req.body.password == null || req.body.password == '') 
	{
		res.json({ success: false, message: 'Ensure Password were provided.'});
	}
	if (req.body.confpassword == null || req.body.confpassword == '') 
	{
		res.json({ success: false, message: 'Please Comfirm your Password.'});
	}	
	if (req.body.password!= req.body.confpassword) 
	{
		res.json({ success: false, message: 'Password not matched.'});
	}

	else
	{
		
		user.save(function(err)
		{
			if (err) 
			{
				res.json({ success: false, message: 'Email is already exists!'});
			}
			else
			{

				
				res.json({ success: true, message: 'Registration Successfully'});
			}
		});
	}
});	

	router.post('/authenticate',function(req,res)
	{
		//console.log(req.body.ClgEmail);
		

		User.findOne({ email: req.body.StudEmail},function(err,user)
		{
			if(err)
			{
				console.log(err);
			}
			else if(!user)
			{
				res.json({ success: false, message: 'Could not authenticate User' });
			}
			else if(user)
			{
				if(req.body.StudPass)
				{
					var validPassword = user.comparePassword(req.body.StudPass);

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
					res.json({ success: true, message: ' Loading..',StudData : user});
				}
			}

		})
		//.select('_id Email').exec(function(err,clg)
		/*{
			if (err) 
			{
				throw err;
				
			}
			if (!clg) 
			{
				res.json({ success: false, message: 'Could not authenticate College' });
			}
			else if(clg)
			{
				if(req.body.ClgPass)
				{
					var validPassword = clg.comparePassword(req.body.ClgPass);

					console.log(validPassword);

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
					/*var token = jwt.sign({ 
							id:user._id,
							username:user.username, 
							email:user.email, 
							mobile:user.mobile, 
							dob:user.dob,
							gender:user.gender,
							website:user.website,
							address:user.address,
							school:user.school,
							highsec:user.highsec,
							college:user.college,
							work:user.work,	
							profile:user.profile,
							bannar:user.bannar,
							lastLogin:user.lastlogin,
							joindate:user.JoinDate
						},secret, { expiresIn: '6h' });
						//console.log("login Successfully");
						//res.json({ success: true, message: ' Loading..',clgData : clg});	
				}
				
			}
		})*/
	})

return router;

}
