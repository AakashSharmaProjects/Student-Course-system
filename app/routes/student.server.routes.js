// Load the 'student' controller
var student = require('../controllers/student.server.controller');
const course = require('../../app/controllers/course.server.controller');
var express = require('express');
var router = express.Router();
// Define the routes module' method
module.exports = function (app) {
    // handle a get request made to /student path
    // and list student when /student link is selected
    //app.get("/student",student.requiresLogin,student.list); 
    
    app.get("/student", student.requiresLogin,student.list); //go to http://localhost:3000/student to see the list
    //app.get("/student", student.list); 
    //handle a post request made to root path
    app.post('/', student.create);
    // Set up the 'student' parameterized routes 
	app.route('/student/:studentNumber')
    .get(student.read)
    .put(student.requiresLogin,student.update)
    .delete(student.requiresLogin,student.delete)
    // Set up the 'studentNumber' parameter middleware
    //All param callbacks will be called before any handler of 
    //any route in which the param occurs, and they will each 
    //be called only once in a request - response cycle, 
    //even if the parameter is matched in multiple routes
    app.param('studentNumber', student.studentByID);
    //authenticate user
    app.post('/signin', student.authenticate);
    app.get('/signout', student.signout);
    app.get('/read_cookie', student.isSignedIn);

    //path to a protected page
	app.get('/welcome',student.welcome);
    
};

