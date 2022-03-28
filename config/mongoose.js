// Load the module dependencies:
//  config.js module and mongoose module
var config = require('./config'),
    mongoose = require('mongoose');
// Define the Mongoose configuration method


const URL = 'Use your Mongo DB Connection String here';
module.exports = function () {
    // Use Mongoose to connect to MongoDB
    const db = mongoose.connect(URL, {
		useUnifiedTopology: true,
		useNewUrlParser: true, useCreateIndex: true 
		}).then(() => console.log('DB Connected!'))
		.catch(err => {
		console.log('Error');
		});

    // Load the 'student' model 
    require('../app/models/student.server.model');
    // Load the 'course' model 
    require('../app/models/course.server.model');
    // Return the Mongoose connection instance
    return db;
};
