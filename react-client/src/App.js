import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import { NavLink } from 'react-router-dom';
import List from './components/List';
import ListCourse from './components/ListCourse'
import EditStudent from './components/EditStudent';
import EditCourse from './components/EditCourse';

import CreateStudent from './components/CreateStudent';
import ShowStudent from './components/ShowStudent';
import CourseListByStudent from './components/courseListByStudent';
import {AppBar, Toolbar} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Home from './components/Home';
import Login from './components/Login';
import ShowCourse from './components/ShowCourse';
//

const useStyles = makeStyles({
  header:{
      background: '#111111'
  },
  tabs:{
      color:"#ffffff",
      textDecoration:"none",
      marginRight: 20,
      fontSize:15,
      marginBottom:20
  }
}) 

function App() {
  const navClass = useStyles();
  return (
    <Router>
      <AppBar className={navClass.header} position='static'>
      <Toolbar>
                <NavLink className={navClass.tabs} to="/home">Home</NavLink>
                <NavLink className={navClass.tabs} to="/login">Login</NavLink>
                <NavLink className={navClass.tabs} to="/list">List of Students</NavLink>
                <NavLink className={navClass.tabs} to="/courselist">List of Courses</NavLink>
                <NavLink className={navClass.tabs} to="/create">Sign Up</NavLink>
      </Toolbar>
      </AppBar>

      <div>          
          <Route render ={()=> < Home />} path="/home" />
          <Route render ={()=> < Login />} path="/login" />
          <Route render ={()=> < List />} path="/list" />
          <Route render ={()=> < ListCourse />} path="/courselist" /> 
          <Route render ={()=> < EditStudent />} path="/edit/:id" />
          <Route render ={()=> < CreateStudent />} path="/create" />
          <Route render ={()=> < ShowStudent />} path="/show/:id" />
          <Route render ={()=> < ShowCourse />} path="/showcourse/:id" />
          <Route render ={()=> < EditCourse />} path="/editcourse/:id" />
          <Route render ={()=> < CourseListByStudent />} path="/courselistbystudent" />

      </div>
    </Router>


  );
}
export default App;
