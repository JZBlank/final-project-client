/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link } from "react-router-dom";
import { Button, Box } from "@mui/material/";
import { useHistory } from 'react-router-dom';

const StudentView = (props) => {
  const { student, deleteStudent } = props;
  let newRoundedGPA = null;

  let history = useHistory();

  const HandleDelete = (id) => {
    deleteStudent(id);
    history.push('/students');
  }

  if(student.gpa !== null && student.gpa !== ''){
    newRoundedGPA = Number(student.gpa).toFixed(2);
    console.log("NEW NUMBER", newRoundedGPA);
  }


  // Render a single Student view 
  return (
    student.campus != null ?
    <div>
      <h1>{student.firstname + " " + student.lastname}</h1>
      <img src={student.imageUrl} alt="student" height="200px" style={{ borderRadius: '100%' }}></img>
      <p><b>First Name: </b> {student.firstname}</p>
      <p><b>Last Name: </b> {student.lastname}</p>
      <p><b>Email: </b> {student.email}</p>
      <p><b>GPA: </b>{newRoundedGPA}</p>
      <p><b>Attends: </b></p>
      <Link to={`/campus/${student.campus.id}`} style={{color: '#5972FF' }}>
        <h2>{student.campus.name}</h2>
      </Link>   

      <Box display="flex" justifyContent="center">
        <Link to={`/editstudent/${student.id}`}>
          <Button variant="contained" sx={{margin:"5px"}}>Edit Student Information</Button>
        </Link>

        <Button variant="outlined" sx={{margin:"5px", color:"white", border:"1px solid white"}} onClick={() => HandleDelete(student.id)}>Delete Student</Button>
      </Box>
    </div>

    :
    <div>
      <h1>{student.firstname + " " + student.lastname}</h1>
      <img src={student.imageUrl} alt="student" height="200px" style={{ borderRadius: '100%' }}></img>
      <p><b>First Name: </b> {student.firstname}</p>
      <p><b>Last Name: </b> {student.lastname}</p>
      <p><b>Email: </b> {student.email}</p>
      <p><b>GPA: </b>{newRoundedGPA}</p>
      <h3>(Not currently enrolled in a college)</h3>

      <Box display="flex" justifyContent="center">
        <Link to={`/editstudent/${student.id}`}>
          <Button variant="contained" sx={{margin:"5px"}}>Edit Student Information</Button>
        </Link>

        <Button variant="outlined" sx={{margin:"5px", color:"white", border:"1px solid white"}} onClick={() => HandleDelete(student.id)}>Delete Student</Button>
      </Box>
    </div>
  );

};

export default StudentView;