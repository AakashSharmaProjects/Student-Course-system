import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function CreateStudent(props) {
  const [student, setStudent] = useState({ _id: '', studentNumber: '', password: '', firstName: '', lastName: '', 
                address: '', city: '', phoneNumber: '',  email: '', program:''});
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://localhost:3000/";

  const saveStudent = (e) => {
    setShowLoading(true);
    e.preventDefault();

    const data = { studentNumber: student.studentNumber, password: student.password, firstName: student.firstName, 
      lastName: student.lastName, address: student.address, city: student.city, phoneNumber: student.phoneNumber,  email: student.email, program: student.program };
    axios.post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/show/' + result.data._id)
        console.log(result.data._id)
      }).catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setStudent({...student, [e.target.name]: e.target.value});
  }

  return (
    <div>
       <h2 style={{textAlign:'center'}}><i> Sign up form</i></h2>
      <Jumbotron>
        
        <Form className="form" onSubmit={saveStudent}>
          <Form.Group>
            <Form.Label><b><i> Student Number</i></b></Form.Label><br></br>
            <Form.Control type="text" name="studentNumber" id="studentNumber" placeholder="Enter student number" value={student.studentNumber} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label><b><i> First Name</i></b></Form.Label><br></br>
            <Form.Control type="text" name="firstName" id="firstName" placeholder="Enter first name" value={student.firstName} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label><b><i> Last Name</i></b></Form.Label><br></br>
            <Form.Control type="text" name="lastName" id="lastName" placeholder="Enter last name" value={student.lastName} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label><b><i> Address</i></b></Form.Label><br></br>
            <Form.Control type="text" name="address" id="address" placeholder="Enter address" value={student.address} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label><b><i> City</i></b></Form.Label><br></br>
            <Form.Control type="text" name="city" id="city" placeholder="Enter city" value={student.city} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label><b><i> Phone Number</i></b></Form.Label><br></br>
            <Form.Control type="text" name="phoneNumber" id="phoneNumber" placeholder="Enter phone number" value={student.phoneNumber} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label><b><i> Program</i></b></Form.Label><br></br>
            <Form.Control type="text" name="program" id="program" placeholder="Enter program" value={student.program} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label><b><i>Email</i></b></Form.Label><br></br>
            <Form.Control type="text" name="email" id="email" rows="3" placeholder="Enter email" value={student.email} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label><b><i>Password</i></b></Form.Label><br></br>
            <Form.Control type="text" name="password" id="password" placeholder="Enter password" value={student.password} onChange={onChange} />
          </Form.Group><br></br>
          <Button variant="primary" type="submit">
            Save Student
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(CreateStudent);
