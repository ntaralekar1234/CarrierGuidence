var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var CollegeSchema = new Schema({
  College_Name:
  { 
    type: String,
    required: true,
    unique: true 
  },
  College_Type:
  {
    type:String,
    required:true
  },
  University_Name:
  {
    type:String
  },
  Email:
  {
    type:String,
    required:true,
    unique: true 
  },
  Website:
  {
    type:String,
    required:true
  },
  Date_Of_Establish:
  {
    type:Date
  },
  Railway_station:
  {
    type:String
  },
  Bus_station:
  {
    type:String
  },
  phone_Number:
  {
    type:Number
  },
  Fax_Number:
  {
    type:Number
  },
  College_Program:{
    type:Array
  },
  College_Degree_Courses:{
    type:Array
  },
  College_Diploma_Courses:{
    type:Array
  },
  College_Facility:{
    type:Array
  },
  profile:
  {
    type:String
  },
  College_About_us:
  {
    type:String
  },
  College_Faculty:
  {
    type:Number
  },
  College_Companies:
  {
    type:Number
  },
  Locality:
  {
    type:String
  },
  Street:
  {
    type:String
  },
  Dist:
  {
    type:String
  },
  Tal:
  {
    type:String
  },
  State:
  {
    type:String
  },
  Pincode:
  {
    type:Number
  },
  Campus_Gallary:[{
     Campus_path:String
  }],
  Classroom_Gallary:[{
     Classroom_path:String
  }],
  Labs_Gallary:[{
     Lab_path:String
  }],
  Annual_Function_Gallary:[{
     Annual_Function_path:String
  }],
  password:{
    type:String,
    required:true
  },
  Twitter:
  {
    type:String
  },
  Facebook:
  {
    type:String
  },
  Instagram:
  {
    type:String
  },
  Google:
  {
    type:String
  },
  Online:
  {
    type:Boolean,
    default:false
  }

});

CollegeSchema.pre('save', function(next) {
  var user = this;

  if(!user.isModified('password')) return next();
  bcrypt.hash(user.password, null, null, function(err, hash) {
    if(err) return next(err);
    user.password = hash;
    next();
  });
});
CollegeSchema.pre('save', function(next) {
  var user = this;
  bcrypt.hash(user.Confpassword, null, null, function(err, hash) {
    if(err) return next(err);
    user.Confpassword = hash;
    next();
  });
});

CollegeSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model('Clg', CollegeSchema);
