const mongoose = require('mongoose');
const Course = mongoose.model('Course');
const Student = require('mongoose').model('Student');
const session = require('express-session');

//
function getErrorMessage(err) {
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].
                message;
        }
    } else {
        return 'Unknown server error';
    }
};
//
exports.create = function (req, res) {
    const course = new Course();
    course.courseCode = req.body.courseCode;
    course.courseName = req.body.courseName;
    course.section = req.body.section;
    course.semester = req.body.semester;
    console.log(req.body)
    //
    //
    Student.findOne({studentNumber: req.body.studentNumber}, (err, Student) => {

        if (err) { return getErrorMessage(err); }
        //
        req.id = Student._id;
        console.log('Student._id',req.id);

	
    }).then(() =>
    {
        course.student = req.id
        console.log('req.Student._id',req.id);

        course.save((err) => {
            console.log("Inside save" + course);
            if (err) {
                console.log('error', getErrorMessage(err))

                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.status(200).json(course);
            }
        });
    
    });
};
//
exports.list = function (req, res) {
    Course.find().populate('student', 'firstName lastName fullName').exec((err, courses) => {
if (err) {
        return res.status(400).send({
            message: getErrorMessage(err)
        });
    } else {
        res.status(200).json(courses);
    }
});
};
//
exports.courseByID = function (req, res, next, id) {
    Course.findById(id).populate('student', 'firstName lastName fullName').exec((err, course) => {if (err) return next(err);
    if (!course) return next(new Error('Failed to load Course '
            + id));
        req.course = course;
        console.log('in CourseById:', req.course)
        next();
    });
};
//
exports.read = function (req, res) {
    res.status(200).json(req.course);
};
//
exports.update = function (req, res) {
    console.log('in update:', req.course)
    const course = req.course;
    course.courseCode = req.body.courseCode;
    course.courseName = req.body.courseName;
    course.section = req.body.section;
    course.semester = req.body.semester;
    course.save((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(course);
        }
    });
};
//
exports.delete = function (req, res) {
    const course = req.course;
    course.remove((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(course);
        }
    });
};
//The hasAuthorization() middleware uses the req.Course and req.Student objects
//to verify that the current Student is the creator of the current Course
exports.hasAuthorization = function (req, res, next) {
    console.log('in hasAuthorization - creator: ',req.course.student)
    console.log('in hasAuthorization - Student: ',req.id)
    //console.log('in hasAuthorization - Student: ',req.Student._id)


    if (req.course.student.id !== req.id) {
        return res.status(403).send({
            message: 'Student is not authorized'
        });
    }
    next();
};

//Courses taken by a student
exports.courseListByStudent = function (req, res, next) {
	//var id = req.Student._id;
	console.log("Student id: "+ session.student);
	//find the student then its comments using Promise mechanism of Mongoose
    
	Student.findOne({ student: session.student }, (err, student) => {
			if (err) { return getErrorMessage(err); }
		}).then(function () {
			//find the posts from this author
			Course.
				find({
					student: session.student
				}, (err, courses) => {
					if (err) { return getErrorMessage(err); }
					res.status(200).json(courses);
					});
				});
};

/*exports.studentsByCourse = function (req, res) {
    //var id = req.Student._id;
	console.log("Student id: "+ session.student);
    var courseCode = req.params.courseCode;
    console.log("Course Code: "+ req.params.courseCode);
    Course.find({ courseCode: courseCode }).populate('student', 'firstName lastName fullName, studentNumber').exec((err, courses) => {
		if (err) {
				return res.status(400).send({
					message: getErrorMessage(err)
				});
			} else {
				res.status(200).json(courses);
			}
		}); 
        
}; */

exports.studentsByCourse = function (req, res , next) {
    //var id = req.Student._id;
	console.log("Student id: "+ session.courseCode);
    //find the student then its comments using Promise mechanism of Mongoose
	Course.findOne({ courseCode: session.courseCode }, (err, courseCode) => {
        if (err) { return getErrorMessage(err); }
    }).then(function () 
    {
        student.find({
            courseCode: session.courseCode
        }, (err, students) => {
            if (err) { return getErrorMessage(err); }
            res.status(200).json(students);
            });
        });
};