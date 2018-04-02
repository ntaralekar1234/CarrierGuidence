var express    = require('express');
var app        = express();
var port       = process.env.PORT || 8080;
var morgan     = require('morgan');
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
var router     = express.Router();
var path 	   = require('path');

var ClgRoutes  = require('./app/routes/clgapi')(router);

var Clg 	   = require('./app/models/college');
var Schema     = mongoose.Schema;
var upload     = require('express-fileupload');

app.use(upload());

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/Public'));

app.use('/clgapi', ClgRoutes);

//connection to mongoDB
/*mongoose.Promise = global.Promise;*/
mongoose.connect('mongodb://localhost:27017/CarrierGuidence', function(err){
	if (err) {
		console.log('Not connected to database: ' + err);
	}
	else{
		console.log('Connected to MongoDB');
	}		
});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('*', function(req, res){
	res.sendFile(path.join(__dirname + '/Public/app/views/index.html'));
});

app.post('/image',function(req,res)
{
      var file = req.files.file,
      name = file.name,
      type = file.mimetype;
      var uploadpath = __dirname + '/public/Image/' + name;
        file.mv(uploadpath,function(err)
        {
               if(err)
               {
       
                  res.send("Error Occured!")
                }
                else {
       
                       var newpath = "http://localhost:8080/Image/"+name;
       
                       res.send(newpath);
                    }

        });
});
app.post('/gallary',function(req,res)
{
      var file = req.files.file,
      name = file.name,
      type = file.mimetype;
      var uploadpath = __dirname + '/public/Gallary/' + name;
        file.mv(uploadpath,function(err)
        {
               if(err)
               {
       
                  res.send("Error Occured!")
                }
                else {
       
                       var newpath = "http://localhost:8080/Gallary/"+name;
       
                       res.send(newpath);
                    }

        });
      
})
app.listen(port, function(){
	console.log('Running the Server on port ' + port );
});