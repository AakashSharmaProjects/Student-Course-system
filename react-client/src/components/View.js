import CreateCourse from './CreateCourse';
import React, { useState } from 'react';
//
import axios from 'axios';

//
function View (props) {
  // read the info from props, coming from the ancestor component
  const { screen, setScreen } = props;
  // return a stateful value and funcion to update it
  const [data, setData] = useState();
  //
  const [course, setCourse] = useState('');
  // called when user clicks on Logout button
  // to clear the cookie and set the screen state variable 
  // back to its initial state.
  const deleteCookie = async () => {
    try {
      await axios.get('/signout');
      setScreen('auth');
    } catch (e) {
      console.log(e);
    }
  };
  // called when user clicks on Get Data button
  // end-point demonstrates another example for the use
  // of cookie specific response from the server.
  const verifyCookie = async () => {
    try {
      const res = await axios.get('/welcome');
      console.log(res.data)
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  }
  //
  const listcourses = (username) => {

    console.log('in listCourse: ',username)
    //setCourse('n')

  }
  //
  const createCourse = () => {
    console.log('in createCourse')
    setCourse('y')

  }
  //
  return (
    <div className="App">
      {course !== 'y'
        ? <div>
            <p>{screen}</p>
            <p>{data}</p>
            <button onClick={verifyCookie}>Verify Cookie</button>
            <button onClick={createCourse}>Create Course</button>
            <h4><a href="/courseListByStudent">See Your Courses</a></h4><br></br>

            <button onClick={deleteCookie}>Log out</button>
          </div>            
        : <CreateCourse screen={screen} setScreen={setScreen} />
      }
    </div>
  );
}

//
export default View;