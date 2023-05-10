/*==================================================
NewStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditStudentView from '../views/EditStudentView';
import { fetchStudentThunk, editStudentThunk } from '../../store/thunks';


const axios = require('axios');

class EditStudentContainer extends Component {

  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      firstname: this.props.student.firstname,
      lastname:  this.props.student.lastname,
      email: this.props.student.email,
      imageUrl: this.props.student.imageUrl,
      gpa: this.props.student.gpa,
      campusId:  this.props.student.campusId,
      redirect: false,
      redirectId: null,
      id: this.props.student.id
    };
  }

  // Capture input data when it is entered
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // Take action after user click the submit button
  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.

    // Set up default image if imageUrl is empty
    let newImageUrl = "https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    let newCampusId = null;

    if(this.state.imageUrl !== ""){
      newImageUrl = this.state.imageUrl;
    }

    let allCampuses = await axios.get(`/api/campuses`);
    let idList = new Set();

    for(let i = 0; i < allCampuses.data.length; i++){
      idList.add(allCampuses.data[i].id);
    }

    if(this.state.campusId !== null && this.state.campusId !== ""){
      if(idList.has(Number(this.state.campusId))){
        newCampusId = Number(this.state.campusId);
      }
      else{
        alert("Invalid Campus ID. Please enter a valid Campus ID.");
        return false;
      }
    }

    let student = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        campusId: newCampusId,
        imageUrl: newImageUrl,
        email: this.state.email,
        gpa: this.state.gpa,
        id: this.state.id
    };

    // Edit student in back-end database
    let modifyStudent = await this.props.editStudent(student);
    
    // Update state, and trigger redirect to show the modified student
    this.setState({
      firstname: "", 
      lastname: "", 
      campusId: null, 
      imageUrl: "",
      email: "",
      gpa: null,
      id: "",
      redirect: true, 
      redirectId: this.props.student.id
    });

    return true;
  }

  

  // Unmount when the component is being removed from the DOM:
  componentDidMount()  {
    // Get Student ID from URL (API link)
    this.props.fetchStudent(this.props.match.params.id);
  }

  // Render new campus input form
  render() {
    // Redirect to campus page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/student/${this.state.redirectId}`}/>)
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <EditStudentView 
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit}
          student={this.props.student}    
        />
      </div>          
    );
  }
}


// The following 2 input arguments are passed to the "connect" function used by "StudentContainer" component to connect to Redux Store.
// 1. The "mapState" argument specifies the data from Redux Store that the component needs.
// The "mapState" is called when the Store State changes, and it returns a data object of "student".
const mapState = (state) => {
  return {
    student: state.student,  // Get the State object from Reducer "student"
  };
};


// The following input argument is passed to the "connect" function used by "EditStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        fetchStudent: (studentId) => dispatch(fetchStudentThunk(studentId)),
        editStudent: (student) => dispatch(editStudentThunk(student)),
    })
}

// Export store-connected container by default
// NewCampusContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(EditStudentContainer);