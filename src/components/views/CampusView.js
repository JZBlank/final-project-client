/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";
import { Button, Box, Typography, Table, TableCell, TableContainer, TableHead, TableRow, TableBody} from "@mui/material/";

import { useHistory } from 'react-router-dom';
import React from 'react';

// Take in props data to construct the component
const CampusView = (props) => {
  const {campus, deleteCampus, unenrollStudent, fetchCampus } = props;
  
  let history = useHistory();

  const HandleDelete = (id) => {
    deleteCampus(id);
    history.push('/campuses');
  }

  const HandleUnenrollStudent = (student) => {
    unenrollStudent(student);
    fetchCampus(campus.id);
    alert("Student unenrolled successfully.");
  }

  return (
    // Render a single Campus view with list of its students
    campus.students.length !== 0 ?
    <div>
      <h1>{campus.name}</h1>
      <img src={campus.imageUrl} alt="campus" height="300px"></img>
      <p><b>Address:</b> {campus.address}</p>
      <p><b>Description:</b> {campus.description}</p>

      <Box display="flex" justifyContent="center">
        <Link to={`/editcampus/${campus.id}`}>
          <Button variant="contained" sx={{margin:"5px"}}>Edit Campus Information</Button>
        </Link>
        
        <Button variant="outlined" sx={{margin:"5px", color:"white", border:"1px solid white"}} onClick={() => HandleDelete(campus.id)}>Delete Campus</Button>
      </Box>

      <br></br>
      <Typography variant="h5" sx={{fontWeight:"bold"}}>Total Students: {campus.students.length}</Typography>

      <br></br>

      <TableContainer sx={{display:"flex", justifyContent:"center"}}>
        <Table sx={{width:"90%"}}>
          <TableHead>
            <TableRow sx={{backgroundColor:"white"}}>
              <TableCell align="center" sx={{fontSize:"20px", borderRight: "1px solid #E0E0E0"}}>Student Names</TableCell>
              <TableCell align="center" sx={{fontSize:"20px"}}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {campus.students.map( student => {
            let name = student.firstname + " " + student.lastname;
            return ( 
              <TableRow key={student.id} sx={{backgroundColor:"#F7F7F7" }} >
                <TableCell align="center" sx={{borderRight: "1px solid #E0E0E0"}}>
                  <Link to={`/student/${student.id}`} style={{color: '#5972FF' }}>
                    <h2>{name}</h2>
                  </Link>   
                </TableCell>        

                <TableCell align="center">
                    <Button variant="outlined" onClick={() => HandleUnenrollStudent(student) }>Unenroll</Button>  
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>

    <br></br>
    <br></br>

    <Link to={`/enrollstudents/${campus.id}`}>
      <Button variant="contained" sx={{margin:"5px"}}>Enroll New Students</Button>
    </Link>

    <br></br>
    <br></br>
    
    </div> 

    
    :
    <div>
      <h1>{campus.name}</h1>
      <img src={campus.imageUrl} alt="campus" height="300px"></img>
      <p><b>Address:</b> {campus.address}</p>
      <p><b>Description:</b> {campus.description}</p>

      <Box display="flex" justifyContent="center">
        <Link to={`/editcampus/${campus.id}`}>
          <Button variant="contained" sx={{margin:"5px"}}>Edit Campus Information</Button>
        </Link>
        
        <Button variant="outlined" sx={{margin:"5px", color:"white", border:"1px solid white"}} onClick={() => HandleDelete(campus.id)}>Delete Campus</Button>
      </Box>

      <br></br>
      <div style={{fontWeight:"bold"}}><b>There are currently no students enrolled at {campus.name}.</b></div>

      <br></br>
      <br></br>
        
      <Link to={`/enrollstudents/${campus.id}`}>
        <Button variant="contained" sx={{margin:"5px"}} >Enroll New Students</Button>
      </Link>

    </div>
  )
};

export default CampusView;