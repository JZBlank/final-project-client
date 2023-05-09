/*==================================================
AllStudentsContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import { 
  fetchAllStudentsThunk,
  fetchAllCampusesThunk, 
  fetchCampusThunk,
  enrollStudentThunk
} from '../../store/thunks';

import EnrollStudentsView from '../views/EnrollStudentsView';

class EnrollStudentsContainer extends Component {
  // Get all students data from back-end database
  componentDidMount() {
    this.props.fetchAllCampuses();
    this.props.fetchAllStudents();
    this.props.fetchCampus(this.props.match.params.id);
  }

  // Render All Students view by passing all students data as props to the corresponding View component
  render(){
    return(
      <div>
        <Header />
        <EnrollStudentsView 
          students={this.props.allStudents}
          allCampuses={this.props.allCampuses}
          fetchCampus={this.props.fetchCampus}
          campus={this.props.campus}
          enrollStudent={this.props.enrollStudent}  
        />
      </div>
    )
  }
}

// The following 2 input arguments are passed to the "connect" function used by "AllStudentsContainer" component to connect to Redux Store.
// 1. The "mapState" argument specifies the data from Redux Store that the component needs.
// The "mapState" is called when the Store State changes, and it returns a data object of "allStudents".
const mapState = (state) => {
  return {
    allStudents: state.allStudents,  // Get the State object from Reducer "allStudents"
    campus: state.campus,  // Get the State object from Reducer "allStudents"
    allCampuses: state.allCampuses,  // Get the State object from Reducer "allCampuses"
  };
};
// 2. The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
  return {
    fetchAllStudents: () => dispatch(fetchAllStudentsThunk()),
    fetchAllCampuses: () => dispatch(fetchAllCampusesThunk()),
    fetchCampus: (campusId) => dispatch(fetchCampusThunk(campusId)),
    enrollStudent: (studentId, campus) => dispatch(enrollStudentThunk(studentId, campus)),
  };
};

// Export store-connected container by default
// AllStudentsContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default withRouter(connect(mapState, mapDispatch)(EnrollStudentsContainer));