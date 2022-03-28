import React, { useState, useEffect } from 'react';
import axios from 'axios';
import View from './View'
import { makeStyles } from '@material-ui/styles';
import { FormControl, FormGroup, Input, InputLabel, Typography } from "@material-ui/core"
import Button from 'react-bootstrap/esm/Button';

const useStyles = makeStyles({
  header:{
      width:"50%",
      margin:"5% 10% 10% 25%",
      background:"cyan",
      '& > *':{
        marginTop:20
      }
  }
}) 

function App() {
  const classes = useStyles();
  //state variable for the screen, admin or user
  const [screen, setScreen] = useState('auth');
  //store input field data, user name and password
  const [studentNumber, setStudentNumber] = useState();
  const [password, setPassword] = useState();
  const apiUrl = "http://localhost:3000/signin";
  //send username and password to the server
  // for initial authentication
  const auth = async () => {
    console.log('calling auth')
    console.log(studentNumber)
    try {
      //make a get request to /authenticate end-point on the server
      const loginData = { auth: { studentNumber, password } }
      //call api
      const res = await axios.post(apiUrl, loginData);
      console.log(res.data.auth)
      console.log(res.data.screen)
      //process the response
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        console.log(res.data.screen);
      }
    } catch (e) { //print the error
      console.log(e);
    }
  
  };
  
  //check if the user already logged-in
  const readCookie = async () => {
    try {
      
      const res = await axios.get('/read_cookie');
      // 
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        console.log(res.data.screen)
      }
    } catch (e) {
      setScreen('auth');
      console.log(e);
    }
  };
  //runs the first time the view is rendered
  //to check if user is signed in
  useEffect(() => {
    readCookie();
  }, []); //only the first render
  //
  return (
    <div className={classes.header}>
      <Typography variant='h2' align='center'>Login</Typography>
      {screen === 'auth' 
        ? 
        <FormGroup className={classes.header}>
            <FormControl>
                <InputLabel>Student Id</InputLabel>
                <Input onChange={e => setStudentNumber(e.target.value)}/>
            </FormControl>
            <FormControl>
                <InputLabel>Password</InputLabel>
                <Input onChange={e => setPassword(e.target.value)}/>
            </FormControl>
            <Button variant='contained' onClick={()=>auth()} color='primary'>Login</Button> 
            
          </FormGroup>

        : <View screen={screen} setScreen={setScreen} />
      }
    </div>
  );
}

export default App;
