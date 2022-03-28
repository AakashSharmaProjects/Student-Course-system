import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function ShowCourse(props) {
  console.log('props.match.params',props.match.params.id)
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/api/course/" + props.match.params.id;
  console.log(data.courseCode);

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      console.log('results from course',result.data);

      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const editCourse = (id) => {
    props.history.push({
      pathname: '/editcourse/' + id
    });
  };

  const deleteCourse = (id) => {
    setShowLoading(true);
    const course = { courseCode: data.courseCode, coursename: data.coursename, semester: data.semester, section: data.section };
    //
    axios.delete(apiUrl, course)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/listcourses')
      }).catch((error) => setShowLoading(false));
  };

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> }    
      <Jumbotron>
        <h1>Course Code: {data.courseCode}</h1>
        <p>Course Name: {data.courseName}</p>
        <p>Semester: {data.semester}</p>
        <p>Section: {data.section}</p>

        <p>
          <Button type="button" variant="primary" onClick={() => { editCourse(data._id) }}>Edit</Button>&nbsp;
          <Button type="button" variant="danger" onClick={() => { deleteCourse(data._id) }}>Delete</Button>
        </p>
        <h4><a href="/list">See All Students</a></h4><br></br>

      </Jumbotron>
    </div>
  );
}

export default withRouter(ShowCourse);
