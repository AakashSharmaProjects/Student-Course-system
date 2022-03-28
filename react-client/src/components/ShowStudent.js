import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function ShowStudent(props) {
  const [data, setData] = useState({});
  const apiUrl = "http://localhost:3000/student/" + props.match.params.id;

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setData(result.data);
    };
    fetchData();
  }, []);

  const editStudent = (id) => {
    props.history.push({
      pathname: '/edit/' + id
    });
  };

  const deleteStudent = (id) => {
    const student = { studentNumber: data.studentNumber, password: data.password, firstName: data.firstName, 
        lastName: data.lastName, address: data.address, city: data.city, phoneNumber: data.phoneNumber,  email: data.email, program:data.program };
  
    axios.delete(apiUrl, student)
      .then((result) => {
        props.history.push('/list')
      }).catch((error) => console.log(error));
  };

  return (
    <div>   
      <Jumbotron>
        <h1>Name: {data.firstName}, {data.lastName}</h1>
        <p>Program: {data.program}</p>
        <p>Email: {data.email}</p>
        <p>Address: {data.address}</p>
        <p>City: {data.city}</p>
        <p>Phone: {data.phoneNumber}</p>
       

        <p>
          <Button type="button" variant="primary" onClick={() => { editStudent(data._id) }}>Edit</Button>&nbsp;
          <Button type="button" variant="danger" onClick={() => { deleteStudent(data._id) }}>Delete</Button>
        </p>
        <h4><a href="/courseListByStudent">See Your Courses</a></h4><br></br>
      </Jumbotron>
    </div>
  );
}

export default withRouter(ShowStudent);