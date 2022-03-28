
import { withRouter } from 'react-router-dom';

import React, { Component }  from 'react';
// import studentimage from './react-client/public/student.jpg'; // gives image path

function Home(props)
{


    return (
        <div>
            <h2>Welcome to Assignment 2</h2>
           
            <p><i>A student-course management system by Aakash and Tanisha Sharma</i></p>
        </div>
    );

}

export default withRouter(Home);