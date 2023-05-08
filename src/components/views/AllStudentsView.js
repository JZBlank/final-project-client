/*==================================================
AllStudentsView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the all students view page.
================================================== */
import { Link } from "react-router-dom";
import { Button, Box } from "@mui/material/";

import student_img from '../img/student.jpg';

const AllStudentsView = (props) => {
  const {students, deleteStudent} = props;

  // If there is no student, display a message
  if (!students.length) {
    return (
    <div>
      <p>There are no students.</p>
      <Link to={`newstudent`}>
        <button>Add New Student</button>
      </Link>
    </div>
    );
  }
  
  // If there is at least one student, render All Students view 
  return (
    <div>
      <h1 color="red">All Students</h1>

      {students.map((student) => {
          let name = student.firstname + " " + student.lastname;
          return (
              <Box key={student.id}>
                <Link to={`/student/${student.id}`} style={{color: '#5972FF' }}>
                  <h2>{name}</h2>
                </Link>
                <img src={student_img} alt="student" height="200px" style={{ borderRadius: '100%' }}></img>
                <br/>
                <br/>
                <Button variant="outlined" sx={{color:'white', border:"1px solid white"}} onClick={() => deleteStudent(student.id)}>Delete Student</Button> 
                <br/>
                <br/>
                <hr width="70%"/>
                <br/>
              </Box>
          );
        }
      )}
      <br/>
      <Link to={`/newstudent`}>
        <Button variant="contained">Add New Student</Button>  
      </Link>
      <br/><br/>
    </div>
  );
};


export default AllStudentsView;