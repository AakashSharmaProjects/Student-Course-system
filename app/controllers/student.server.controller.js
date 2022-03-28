const Student = require('mongoose').model('Student');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const jwtExpirySeconds = 300;
const jwtKey =config.secretKey;
const session = require('express-session');

//
// Create a new error handling controller method
const getErrorMessage = function(err) {
	// Define the error message variable
	var message = '';

	// If an internal MongoDB error occurs get the error message
	if (err.code) {
		switch (err.code) {
			// If a unique index error occurs set the message error
			case 11000:
			case 11001:
				message = 'studentNumber already exists';
				break;
			// If a general error occurs set the message error
			default:
				message = 'Something went wrong';
		}
	} else {
		// Grab the first error message from a list of possible errors
		for (const errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	// Return the message error
	return message;
};

// Create a new Student
exports.create = function (req, res, next) {
    // Create a new instance of the 'Student' Mongoose model
    var student = new Student(req.body); //get data from React form
    console.log("body: " + req.body.studentNumber);

    // Use the 'Student' instance's 'save' method to save a new Student document
    student.save(function (err) {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.json(student);
            
        }
    });
};
//
// Returns all Students
exports.list = function (req, res, next) {
    // Use the 'Student' instance's 'find' method to retrieve a new Student document
    Student.find({}, function (err, Student) {
        if (err) {
            return next(err);
        } else {
            res.json(Student);
        }
    });
};
//
//'read' controller method to display a Student
exports.read = function(req, res) {
	// Use the 'response' object to send a JSON response
	res.json(req.Student);
};
//
// 'StudentByID' controller method to find a Student by its id
exports.studentByID = function (req, res, next, studentNumber) {
	// Use the 'Student' static 'findOne' method to retrieve a specific Student
	Student.findOne({
        _id: studentNumber
	}, (err, Student) => {
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		} else {
			// Set the 'req.Student' property
            req.Student = Student;
            console.log(Student);
			// Call the next middleware
			next();
		}
	});
};
//update a Student by id
exports.update = function(req, res, next) {
    console.log(req.body);
    Student.findByIdAndUpdate(req.Student.id, req.body, function (err, Student) {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.json(Student);
    });
};
// delete a Student by id
exports.delete = function(req, res, next) {
    Student.findByIdAndRemove(req.Student.id, req.body, function (err, Student) {
      if (err) return next(err);
      res.json(Student);
    });
};
//
// authenticates a Student
exports.authenticate = function(req, res, next) {
	// Get credentials from request
	console.log(req.body)
	const studentNumber = req.body.auth.studentNumber;
	const password  = req.body.auth.password;
	console.log(password)
	console.log(studentNumber)
	//find the Student with given studentNumber using static method findOne
	Student.findOne({studentNumber: studentNumber}, (err, Student) => {
			if (err) {
				return next(err);
			} else {
			console.log(Student)
			//compare passwords	
			if(bcrypt.compareSync(password, Student.password)) {
				// Create a new token with the Student id in the payload
  				// and which expires 300 seconds after issue
				const token = jwt.sign({ id: Student._id, studentNumber: Student.studentNumber }, jwtKey, 
					{algorithm: 'HS256', expiresIn: jwtExpirySeconds });
				console.log('token:', token)
				// set the cookie as the token string, with a similar max age as the token
				// here, the max age is in milliseconds
				res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000,httpOnly: true});
				res.status(200).send({ screen: Student.studentNumber });
				//
				//res.json({status:"success", message: "Student found!!!", data:{Student:
				//Student, token:token}});
				
				req.Student=Student;
				//call the next middleware
				next()
			} else {
				res.json({status:"error", message: "Invalid studentNumber/password!!!",
				data:null});
			}
			
		}
		
	});
};
//
// protected page uses the JWT token
exports.welcome = (req, res) => {
	// We can obtain the session token from the requests cookies,
	// which come with every request
	const token = req.cookies.token
	console.log(token)
	// if the cookie is not set, return an unauthorized error
	if (!token) {
	  return res.status(401).end()
	}
  
	var payload;
	try {
	  // Parse the JWT string and store the result in `payload`.
	  // Note that we are passing the key in this method as well. This method will throw an error
	  // if the token is invalid (if it has expired according to the expiry time we set on sign in),
	  // or if the signature does not match
	  payload = jwt.verify(token, jwtKey)
	} catch (e) {
	  if (e instanceof jwt.JsonWebTokenError) {
		// if the error thrown is because the JWT is unauthorized, return a 401 error
		return res.status(401).end()
	  }
	  // otherwise, return a bad request error
	  return res.status(400).end()
	}
  
	// Finally, return the welcome message to the Student, along with their
	// studentNumber given in the token
	// use back-quotes here
	res.send(`${payload.studentNumber}`)
 };
 //
 //sign out function in controller
//deletes the token on the client side by clearing the cookie named 'token'
exports.signout = (req, res) => {
	res.clearCookie("token")
	return res.status('200').json({message: "signed out"})
	// Redirect the Student back to the main application page
	//res.redirect('/');
}
//check if the Student is signed in
exports.isSignedIn = (req, res) => {
	// Obtain the session token from the requests cookies,
	// which come with every request
	const token = req.cookies.token
	console.log(token)
	// if the cookie is not set, return 'auth'
	if (!token) {
	  return res.send({ screen: 'auth' }).end();
	}
	var payload;
	try {
	  // Parse the JWT string and store the result in `payload`.
	  // Note that we are passing the key in this method as well. This method will throw an error
	  // if the token is invalid (if it has expired according to the expiry time we set on sign in),
	  // or if the signature does not match
	  payload = jwt.verify(token, jwtKey)
	} catch (e) {
	  if (e instanceof jwt.JsonWebTokenError) {
		// the JWT is unauthorized, return a 401 error
		return res.status(401).end()
	  }
	  // otherwise, return a bad request error
	  return res.status(400).end()
	}
  
	// Finally, token is ok, return the studentNumber given in the token
	res.status(200).send({ screen: payload.studentNumber });
}



//isAuthenticated() method to check whether a Student is currently authenticated
exports.requiresLogin = function (req, res, next) {
    // Obtain the session token from the requests cookies,
	// which come with every request
	const token = req.cookies.token
	console.log(token)
	// if the cookie is not set, return an unauthorized error
	if (!token) {
	  return res.send({ screen: 'auth' }).end();
	}
	var payload;
	try {
	  // Parse the JWT string and store the result in `payload`.
	  // Note that we are passing the key in this method as well. This method will throw an error
	  // if the token is invalid (if it has expired according to the expiry time we set on sign in),
	  // or if the signature does not match
	  payload = jwt.verify(token, jwtKey)
	  console.log('in requiresLogin - payload:',payload)
	  req.id = payload.id;
	  session.student = req.id;
	}
	 catch (e) {
	  if (e instanceof jwt.JsonWebTokenError) {
		// if the error thrown is because the JWT is unauthorized, return a 401 error
		return res.status(401).end()
	  }
	  // otherwise, return a bad request error
	  return res.status(400).end()
	}
	// Student is authenticated
	//call next function in line
    next();
};

// Course.find({ field: {$in: ["courseCode"]} })
// .toArray();
