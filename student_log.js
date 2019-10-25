var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var url = 'mongodb://10.8.30.116:27017/studnetlog';
//var url = 'mongodb://nayakam:test1234@ds243055.mlab.com:43055/studentlog';
var Schema = mongoose.Schema;

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// create a schema
var studentSchema = new mongoose.Schema({
    studentNo: {type: String, index: {unique: true}, required: [true, 'Please provide student number.']},
    day: String,
    night: String
});

// create a model using it
var Student = mongoose.model('student', studentSchema);

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

app.get('/', function (req, res) {
    res.send('Hello SmartLog!');
});

try {
    mongoose.connect(url, (err, db) => {
        if (err) {
            console.error(err);
            throw err
        } else {
            console.log("Database connected correctly to server");
        }
    });
} catch (e) {
    console.log('Failed to connect to DB: ' + e);
}

// mongoose.connect(url);
//

// MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
//     assert.strictEqual(null, err);
//     // ...
//     db.close();
// });

mongoose.connection.on('error', function(error) {
    console.error('Database connection error:', error);
});

mongoose.connection.once('open', function() {
    console.log('Database connected');
});

app.listen(3001, function () {
    console.log('Example app listening on port 3001!');
});

// parameters sent with 
app.put('/api/student', function (req, res) {
    console.log('PUT request:  req.originalUrl : ' + req.originalUrl);
    var studentNoValue = req.query.studentNo;
    console.log('PUT request:  studentNoValue: ' + studentNoValue);
    try {
        console.log("Student :" + Student);
        Student.findOne({studentNo: studentNoValue}, function (err, student) {
            if (err) {
                return res.status(500).send('[{"ERROR":"' + err + '"}]');
            }
            console.log('PUT request:  Current student: ' + student);
            if (student == null) {
                var newlearner = new Student({
                    studentNo: studentNoValue,
                    day: 0,
                    night: 0
                });
                newlearner.save(function (err) {
                    if (err) {
                        console.log('PUT request:  err : ' + err);
                        return res.status(500).send('[{"ERROR":"' + err + '"}]');
                    }
                    console.log('User saved successfully! return 201' + newlearner);
                    res.status(201).send();
                });
            } else {
                console.log('User already created! return 202' + student);
                res.status(202).send();
            }
        });
    } catch (e) {
        console.log(e);
        console.log('PUT request:  err : ' + e);
        return res.status(500).send('[{"ERROR":"' + e + '"}]');
    }
});

app.get('/api/student', function (req, res) {
    console.log('GET request:  req.originalUrl : ' + req.originalUrl);
    var studentNoValue = req.query.studentNo;
    console.log('GET request:  studentNoValue: ' + studentNoValue);
    // get the student for studentNoValue
    Student.find({studentNo: studentNoValue}, function (err, student) {
        if (err) {
            return res.status(500).send('[{"ERROR":"' + err + '"}]');
        }
        console.log('GET request: \n ' + student);
        res.send(student);
    });
});

app.post('/api/student', function (req, res) {
    console.log('POST request:  req.originalUrl: ' + req.originalUrl);
    console.log('POST request: req.body: ' + req.body)
    console.log('POST request: req.path: ' + req.path)
    console.log('POST request: req.params: ' + req.params)
    console.log('POST request: req.query: ' + req.query)
    for (var i in req.query) {
        console.log('req.query Key is: ' + i + '. Value is: ' + req.query[i]);
    }
    for (var i in req.params) {
        console.log('req.params Key is: ' + i + '. Value is: ' + req.params[i]);
    }
    var studentNoValue = req.query.studentNo;
    var dayValue = req.query.day;
    var nightValue = req.query.night;
    console.log('POST request:  studentNoValue : ' + studentNoValue + ', dayValue:' + dayValue + ', nightValue:' + nightValue);
    if (dayValue == null && nightValue == null) {
        return res.status(500).send('[{"ERROR": "Please provide day or night value to update."}]');
    }
    // update the student day and night values
    Student.findOne({studentNo: studentNoValue}, {day: 1, night: 1}, function (err, student) {
        if (err) {
            return res.status(500).send('[{"ERROR":"' + err + '"}]');
        }
        console.log('POST request:  Current student: ' + student);

        if (student != null) {
            if (dayValue != null) {
                student.day = +student.day + +dayValue;
            }

            if (nightValue != null) {
                student.night = +student.night + +nightValue;
            }


            student.save(function (err) {
                if (err) {
                    console.log('POST request:  err : ' + err);
                    return res.status(500).send('[{"ERROR":"' + err + '"}]');
                }
                console.log('User updated successfully! \n ' + student);
                return res.send();
            });
        } else {
            return res.status(500).send('[{"ERROR": Could not find student for ' + studentNoValue + '"}]');
        }
    });
});

app.patch('/api/student', function (req, res) {
    console.log('PATCH request:  req.originalUrl : ' + req.originalUrl);
    var studentNoValue = req.query.studentNo;
    var dayValue = req.query.day;
    var nightValue = req.query.night;
    console.log('PATCH request:  studentNoValue : ' + studentNoValue + ', dayValue:' + dayValue + ', nightValue:' + nightValue);
    // reset the student day and	night values
    Student.findOneAndUpdate({studentNo: studentNoValue}, {day: dayValue, night: nightValue}, function (err, student) {
        if (err) {
            return res.status(500).send('[{"ERROR":"' + err + '"}]');
        }
        console.log('PATCH request:  student :' + student);
        if (student == null) {
            return res.status(500).send('[{"ERROR": Could not find student for ' + studentNoValue + '"}]');
        }
        res.send();
    });
});

app.delete('/api/student', function (req, res) {
    console.log('DELETE request:  req.originalUrl : ' + req.originalUrl);
    var studentNoValue = req.query.studentNo;
    console.log('DELETE request:  studentNoValue: ' + studentNoValue);
    // Remove the student for studentNoValue
    Student.findOneAndRemove({studentNo: studentNoValue}, function (err) {
        if (err) {
            return res.status(500).send('[{"ERROR":"' + err + '"}]');
        }
        console.log('Student deleted successfully: \n ' + studentNoValue);
        res.send();
    });
});
