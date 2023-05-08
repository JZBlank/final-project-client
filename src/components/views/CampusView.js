/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";
import { Button, Box, Typography, Table, TableCell, TableContainer, TableHead, TableRow, TableBody} from "@mui/material/";

import campus_img from '../img/campuses.jpg';

import { Redirect, useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import { fetchCampus } from "../../store/actions/actionCreators";

// Take in props data to construct the component
const CampusView = (props) => {
  const {campus, deleteCampus, removeStudent, fetchCampus } = props;
  
  let history = useHistory();

  const HandleDelete = (id) => {
    deleteCampus(id);
    history.push('/campuses');
  }

  const HandleRemoveStudent = (student) => {
    removeStudent(student);
    fetchCampus(campus.id);
  }

  return (
    // Render a single Campus view with list of its students
    campus.students.length != 0 ?
    <div>
      <h1>{campus.name}</h1>
      <img src={campus_img} alt="campus" height="300px"></img>
      <p><b>Address:</b> {campus.address}</p>
      <p><b>Description:</b> {campus.description}</p>

      <Box display="flex" justifyContent="center">
        <Link to={`/editcampus/${campus.id}`}>
          <Button variant="contained" sx={{margin:"5px"}}>Edit Campus Information</Button>
        </Link>
        
        <Button variant="outlined" sx={{margin:"5px"}} onClick={() => HandleDelete(campus.id)}>Delete Campus</Button>
      </Box>

      <br></br>
      <Typography variant="h5" sx={{fontWeight:"bold"}}>Total Students: {campus.students.length}</Typography>

      <br></br>

      <TableContainer>
        <Table sx={{width:"100%"}}>
          <TableHead>
            <TableRow sx={{backgroundColor:"white"}}>
              <TableCell align="center" sx={{fontSize:"20px"}}>Student Names</TableCell>
              <TableCell align="center" sx={{fontSize:"20px"}}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {campus.students.map( student => {
            let name = student.firstname + " " + student.lastname;
            return ( 
              <TableRow key={student.id} >
                <TableCell align="center">
                  <Link to={`/student/${student.id}`}>
                    <h2>{name}</h2>
                  </Link>   
                </TableCell>        

                <TableCell align="center">
                    <Button variant="outlined" onClick={() => HandleRemoveStudent(student) }>Unenroll</Button>  
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>

    <br></br>
    <br></br>
        
    <Button variant="contained" sx={{margin:"5px"}}>Enroll New Student</Button>

    <br></br>
    <br></br>
    
    </div> 

    
    :
    <div>
      <h1>{campus.name}</h1>
      <img src={campus_img} alt="campus" height="300px"></img>
      <p>{campus.address}</p>
      <p>{campus.description}</p>

      <Box display="flex" justifyContent="center">
        <Link to={`/editcampus/${campus.id}`}>
          <Button variant="contained" sx={{margin:"5px"}}>Edit Campus Information</Button>
        </Link>
        
        <Button variant="outlined" sx={{margin:"5px"}} onClick={() => HandleDelete(campus.id)}>Delete Campus</Button>
      </Box>

      <br></br>
      <Typography variant="h5" sx={{fontWeight:"bold"}}>Total Students: {campus.students.length}</Typography>

      <div style={{fontWeight:"bold"}}><b>There are currently no students enrolled at {campus.name}.</b></div>

      <br></br>
      <br></br>
        
    <Button variant="contained" sx={{margin:"5px"}}>Enroll New Student</Button>
    </div>
  )
};

export default CampusView;