var express = require('express');
var mongoose =  require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var url = 'mongodb://marassia/studnetlog';
var Schema = mongoose.Schema;

// create a schema
var studentSchema = new Schema({
  studentNo: { type: String, index: {unique:true}, required: [true ,'Please provide student number.']},
  day: String,
  night: String
});

// create a model using it
var Student = mongoose.model('student', studentSchema);

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function (req, res) {
  res.send('Hello SmartLog!');  
});

mongoose.connect(url,(err, db)=>  {        
        console.log("Connected correctly to server");  
		//mongoose.disconnect();		
});
	
app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});

// parameters sent with 
app.put('/api/student', function(req, res) {
	console.log('PUT requeset:  req.originalUrl : ' + req.originalUrl );	
    var studentNoValue = req.query.studentNo; 		
	console.log('PUT requeset:  studentNoValue: ' + studentNoValue);
	  Student.findOne({ studentNo: studentNoValue }, function (err , student){
			if(err){				
				return res.status(500).send('[{"ERROR":"'+ err + '"}]' ); 
			}
		 console.log('PUT requeset:  Current student: ' + student);
		 if (student == null){
			  var newlearner = new Student({
				  studentNo: studentNoValue,
				  day: 0,
				  night: 0
				 });
				newlearner.save(function(err) {			
					if (err){
						console.log('PUT requeset:  err : ' + err);
						return res.status(500).send('[{"ERROR":"'+ err + '"}]' ); 
					}
					console.log('User saved successfully! return 201' + newlearner);					
					res.status(201).send();					
				});
		 } else {
			 console.log('User already created! return 202' + student);			
			res.status(202).send();			
		 }
	});
});

app.get('/api/student', function(req, res) {
	   console.log('GET requeset:  req.originalUrl : ' + req.originalUrl );	 
       var studentNoValue = req.query.studentNo;  
	   console.log('GET requeset:  studentNoValue: ' + studentNoValue);
		// get the student for studentNoValue		
	   Student.find({ studentNo: studentNoValue }, function(err, student) {
			if (err){
				return res.status(500).send('[{"ERROR":"'+ err + '"}]' );
			}
			console.log('GET requeset: \n ' + student);
			res.send(student);
		});
});

app.post('/api/student', function(req, res) {
	   console.log('POST requeset:  req.originalUrl: ' + req.originalUrl );
	   console.log('POST requeset: req.body: ' + req.body)
	   console.log('POST requeset: req.path: ' + req.path)
	   console.log('POST requeset: req.params: ' + req.params)
	   console.log('POST requeset: req.query: ' + req.query)
	   for (var i in req.query){
		  console.log('req.query Key is: ' + i + '. Value is: ' + req.query[i]);
	   }
	   for (var i in req.params){
		   console.log('req.params Key is: ' + i + '. Value is: ' + req.params[i]);
	   }
	   var studentNoValue = req.query.studentNo; 				
	   var dayValue = req.query.day; 
	   var nightValue = req.query.night; 
	   console.log('POST requeset:  studentNoValue : ' + studentNoValue + ', dayValue:'+ dayValue +  ', nightValue:' + nightValue);		   
	   if(dayValue == null && nightValue == null){
		   return res.status(500).send('[{"ERROR": "Please provide day or night value to update."}]' );
	   }
		// update the student day and night values	
		Student.findOne({ studentNo: studentNoValue }, {day:1, night:1},  function (err , student){
			if(err){
				return res.status(500).send('[{"ERROR":"'+ err + '"}]' );
			}
		    console.log('POST requeset:  Current student: ' + student);
			
			if( student != null){
				if( dayValue != null){
					student.day = +student.day + +dayValue;
				}
				
				if(nightValue != null){
					student.night = +student.night + +nightValue;
				}
				
				
				student.save(function(err) {			
					if (err){
						console.log('POST requeset:  err : ' + err);
						return res.status(500).send('[{"ERROR":"'+ err + '"}]' );
					}
					console.log('User updated successfully! \n ' + student);				
					return res.send();
				});
			}else{
				return res.status(500).send('[{"ERROR": Could not find student for ' + studentNoValue + '"}]' );
			}				
		});
});

app.patch('/api/student', function(req, res) {
	   console.log('PATCH requeset:  req.originalUrl : ' + req.originalUrl );
	   var studentNoValue = req.query.studentNo; 				
	   var dayValue = req.query.day; 
	   var nightValue = req.query.night; 
	   console.log('PATCH requeset:  studentNoValue : ' + studentNoValue + ', dayValue:'+ dayValue +  ', nightValue:' + nightValue);		
	   // reset the student day and	night values	
	   Student.findOneAndUpdate({ studentNo: studentNoValue },{day:dayValue, night:nightValue}, function(err, student) {
			if (err){
				return res.status(500).send('[{"ERROR":"'+ err + '"}]' );
			}
			console.log('PATCH requeset:  student :' + student);
			if(student == null){
				return res.status(500).send('[{"ERROR": Could not find student for ' + studentNoValue + '"}]' );
			}
			res.send();
		});	
});

app.delete('/api/student', function(req, res) {
	   console.log('DELETE requeset:  req.originalUrl : ' + req.originalUrl );	 
       var studentNoValue = req.query.studentNo;  
	   console.log('DELETE requeset:  studentNoValue: ' + studentNoValue);
		// Remove the student for studentNoValue		
	   Student.findOneAndRemove({ studentNo: studentNoValue }, function(err) {
			if (err){
				return res.status(500).send('[{"ERROR":"'+ err + '"}]' );
			}
			console.log('Student deleted successfully: \n ' + studentNoValue);
			res.send();
		});
});