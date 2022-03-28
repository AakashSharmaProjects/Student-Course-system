const student = require('../../app/controllers/student.server.controller');
const course = require('../../app/controllers/course.server.controller');
//
module.exports = function (app) {
        app.route('/api/course', student.requiresLogin ,)
             .get(course.list)
             .post(student.requiresLogin, course.create);

        app.route('/api/course/:courseId')
             .get(course.read)
             .put(student.requiresLogin, course.hasAuthorization, course.update)
             .delete(student.requiresLogin, course.hasAuthorization, course.delete);

        //app.route('/course/:studentNumber').get(course.coursesByStudent);
        app.route('/course').get(student.requiresLogin, course.courseListByStudent);

        app.get('/api/courseByStudent/:courseCode', course.studentsByCourse);

        app.param('courseId', course.courseByID);
        app.param('studentNumber', student.studentByID);
};

// const users = require('../controllers/users.server.controller');
// const articles = require('../controllers/articles.server.controller');
// //
// module.exports = function (app) {
//         app.route('/api/articles')
//             .get(articles.list)
//             .post(users.requiresLogin, articles.create);
//         //
//         app.route('/api/articles/:articleId')
//             .get(articles.read)
//             .put(users.requiresLogin, articles.hasAuthorization, articles.
//                 update)
//             .delete(users.requiresLogin, articles.hasAuthorization, articles.
//                 delete);
//         //
//         app.param('articleId', articles.articleByID);
// };
