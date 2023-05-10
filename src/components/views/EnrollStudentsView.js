/*==================================================
EditStudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the new student page.
================================================== */
import { Link } from "react-router-dom";
import { Button, Typography, Table, TableCell, TableContainer, TableHead, TableRow, TableBody} from "@mui/material/";

const EnrollStudentsView = (props) => {
  const {students, allCampuses, campus, fetchCampus, enrollStudent } = props;

  const HandleEnrollStudent = (student, campus) => {
    enrollStudent(student, campus);
    fetchCampus(campus.id);
    alert("Student enrolled successfully.");
  }

  let notEnrolledNum = 0;

  // If there are no students to enroll, display a message
  students.map( student => {
    if(student.campusId !== campus.id){
        notEnrolledNum += 1;
    }
  })

  if (!notEnrolledNum) {
    return (
    <div>
      <h1>Enroll Students</h1>
      <Link to={`/campus/${campus.id}`} style={{color: '#5972FF' }}>
        <h2>{campus.name}</h2>
      </Link>

      <img src={campus.imageUrl} alt="campus" height="300px"></img>

      <p>There are no students to enroll.</p>
    </div>
    );
  }
  
  // If there is at least one student, render All Students view 
  return (
    <div>
      <h1>Enroll Students</h1>
      <Link to={`/campus/${campus.id}`} style={{color: '#5972FF' }}>
        <h2>{campus.name}</h2>
      </Link>

      <img src={campus.imageUrl} alt="campus" height="300px"></img>

      <Typography style={{fontWeight: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '20px', color: '#11153e'}}>
        {campus.name}
      </Typography>

      <TableContainer sx={{display:"flex", justifyContent:"center"}}>
        <Table sx={{width:"90%"}}>
          <TableHead>
            <TableRow sx={{backgroundColor:"white"}}>
              <TableCell align="center" sx={{fontSize:"20px", borderRight: "1px solid #E0E0E0"}}>Student Names</TableCell>
              <TableCell align="center" sx={{fontSize:"20px", borderRight: "1px solid #E0E0E0"}}>Currently Enrolled At</TableCell>
              <TableCell align="center" sx={{fontSize:"20px"}}>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
          {students.map( student => {
            let name = student.firstname + " " + student.lastname;
            let studentCampus = "None";
            let studentCampusId = null;

            let showStudent = false;

            if(student.campusId !== campus.id){
              showStudent = true;
            }
            
            for(let i = 0; i < allCampuses.length; i++){
              if(student.campusId === allCampuses[i].id){
                studentCampus = allCampuses[i].name;
                studentCampusId = allCampuses[i].id;
              }
            }

            return ( 
              showStudent && studentCampusId !== null ? 
              <TableRow key={student.id} sx={{backgroundColor:"#F7F7F7" }} >
                <TableCell align="center" sx={{borderRight: "1px solid #E0E0E0"}}>
                  <Link to={`/student/${student.id}`} style={{color: '#5972FF' }}>
                    <h2>{name}</h2>
                  </Link>   
                </TableCell>

                <TableCell align="center" sx={{borderRight: "1px solid #E0E0E0"}}>
                  <Link to={`/campus/${studentCampusId}`} style={{color: '#5972FF' }}>
                    <h2>{studentCampus}</h2>
                  </Link>   
                </TableCell>         

                <TableCell align="center">
                    <Button variant="outlined" onClick={() => HandleEnrollStudent(student, campus)}>Enroll</Button>  
                </TableCell>
              </TableRow>   
              : showStudent && studentCampusId === null ?
              <TableRow key={student.id} sx={{backgroundColor:"#F7F7F7" }} >
                <TableCell align="center" sx={{borderRight: "1px solid #E0E0E0"}}>
                  <Link to={`/student/${student.id}`} style={{color: '#5972FF' }}>
                    <h2>{name}</h2>
                  </Link>   
                </TableCell>

                <TableCell align="center" sx={{borderRight: "1px solid #E0E0E0"}}>
                  <h2>{studentCampus}</h2>
                </TableCell>

                <TableCell align="center">
                  <Button variant="outlined" onClick={() => HandleEnrollStudent(student, campus)}>Enroll</Button>  
                </TableCell>    
              </TableRow>
              :
              <TableRow key={student.id} sx={{backgroundColor:"#F7F7F7" }} >
              </TableRow>
            );
          })}
          </TableBody>
        </Table>
      </TableContainer>
      
      <br/>
      <br/>
    </div>
  );
}

export default EnrollStudentsView;