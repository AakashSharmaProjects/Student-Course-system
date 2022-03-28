const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CourseSchema = new Schema({
    courseCode: {
        type: String,
        default: '',
        trim: true,
        required: 'Course Code cannot be blank'
    },
    courseName: {
        type: String,
        default: '',
        trim: true,
        required: 'Course Name cannot be blank'
    },
    section: {
        type: String,
        default: '',
        trim: true,
        required: 'Section cannot be blank'
    },
    semester: {
        type: String,
        default: '',
        trim: true,
        required: 'Semester cannot be blank'
    },
    //Use ref to allow a student document to make a reference to corresponding course document
    student: {
        type: Schema.ObjectId,
        ref: 'Student'
    }
});
mongoose.model('Course', CourseSchema);