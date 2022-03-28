import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import React, { useState } from 'react';


function CreateCourse(props) {
 
    const studentNumber = props.screen;
    console.log('props.screen',props.screen)
    const [course, setCourse] = useState({ _id: '', courseCode: '', courseName: '', section: '', semester: '', studentNumber: '' });
    const [showLoading, setShowLoading] = useState(false);
    const apiUrl = "http://localhost:3000/api/course"
    const saveCourse = (e) => {
        setShowLoading(true);
        e.preventDefault();
        const data = {courseCode: course.courseCode, courseName: course.courseName, section: course.section, semester: course.semester, studentNumber: studentNumber  };
        axios.post(apiUrl, data)
        .then((result) => {
            console.log(result);
            setShowLoading(false);
            console.log('results from save course:',result.data)
            props.history.push('/showcourse/' + result.data._id)
        }).catch((error) => setShowLoading(false));

    };
    //
    const onChange = (e) => {
        e.persist();
        setCourse({...course, [e.target.name]: e.target.value});
      }
    return (
        <div>
        <h2><i>Register your course here</i> </h2>
        {showLoading && 
            <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
            </Spinner> 
        } 
        <Jumbotron>
            <Form onSubmit={saveCourse}>
              <Form.Group>
                <Form.Label><i><b> Course Code</b></i></Form.Label><br></br>
                <Form.Control type="text" name="courseCode" id="courseCode" placeholder="Enter course code" value={course.courseCode} onChange={onChange} />
              </Form.Group>
              <Form.Group><br></br>
                <Form.Label><i><b> Course Name</b></i></Form.Label><br></br>
                <Form.Control type="text" name="courseName" id="courseName" placeholder="Enter course name" value={course.courseName} onChange={onChange} />
              </Form.Group>
              <Form.Group><br></br>
                <Form.Label><i><b> Section</b></i></Form.Label><br></br>
                <Form.Control type="text"  name="section" id="section" placeholder="Enter section" value={course.section} onChange={onChange} />
              </Form.Group>  
              <Form.Group><br></br>
                <Form.Label><i><b> Semester</b></i></Form.Label><br></br>
                <Form.Control type="text" name="semester" id="semester" placeholder="Enter current semester" value={course.semester} onChange={onChange} />
              </Form.Group><br></br>
                                   
              <Button variant="primary" type="submit">
                Register
              </Button>
            </Form>
          </Jumbotron>
        </div>
    );
}

export default withRouter(CreateCourse);
