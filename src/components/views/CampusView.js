/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";
import { Button, Box, Typography, Table, TableCell, TableContainer, TableHead, TableRow, TableBody,Paper } from "@mui/material/";

import campus_img from '../img/campuses.jpg';

// Take in props data to construct the component
const CampusView = (props) => {
  const {campus} = props;
  
  // Render a single Campus view with list of its students
  return (
    campus.students.length !== 0 ?
    <div>
      <h1>{campus.name}</h1>
      <img src={campus_img} alt="campus" height="300px"></img>
      <p><b>Address:</b> {campus.address}</p>
      <p><b>Description:</b> {campus.description}</p>

      <Box display="flex" justifyContent="center">
        <Button variant="contained" sx={{margin:"5px"}}>Edit Campus Information</Button>
        <Button variant="outlined" sx={{margin:"5px"}}> Delete Campus</Button>
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
                    <Button>Unenroll</Button>  
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
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      <div style={{fontWeight:"bold"}}><b>There are currently no students enrolled at {campus.name}.</b></div>
    </div>

  );
};

export default CampusView;