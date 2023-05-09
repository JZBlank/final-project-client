/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link } from "react-router-dom";
import { Button, Box } from "@mui/material/";
import { useHistory } from 'react-router-dom';

const StudentView = (props) => {
  const { student, deleteStudent, fetchStudent } = props;

  let history = useHistory();

  const HandleDelete = (id) => {
    //deleteStudent(id);
    history.push('/students');
  }

  // Render a single Student view 
  return (
    student.campus != null ?
    <div>
      <h1>{student.firstname + " " + student.lastname}</h1>
      <h3><b>First Name: </b> {student.firstname}</h3>
      <h3><b>Last Name: </b> {student.lastname}</h3>
      <h3><b>Email: </b> {student.email}</h3>
      <h3><b>GPA: </b> {student.gpa}</h3>
      <h3><b>Attends: </b></h3>
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
      <h3>(Not currently enrolled in a college)</h3>
    </div>
  );

};

export default StudentView;