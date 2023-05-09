/*==================================================
NewCampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditCampusView from '../views/EditCampusView';
import { fetchCampusThunk, editCampusThunk } from '../../store/thunks';


class EditCampusContainer extends Component {

  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      name: this.props.campus.name,
      address:  this.props.campus.address,
      description:  this.props.campus.description,
      imageUrl: this.props.campus.imageUrl,
      id: this.props.campus.id,
      redirect: false,
      redirectId: null
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
    let newImageUrl = "https://images.pexels.com/photos/207684/pexels-photo-207684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

    if(this.state.imageUrl !== ""){
      newImageUrl = this.state.imageUrl;
    }

    let campus = {
        name: this.state.name,
        address: this.state.address,
        description: this.state.description,
        id: this.state.id,
        imageUrl: newImageUrl
    };
    
    // Edit campus in back-end database
    let modifyCampus = await this.props.editCampus(campus);

    // Update state, and trigger redirect to show the edited campus
    this.setState({
      name: "", 
      address: "", 
      description: "", 
      id: "",
      imageUrl: "",
      redirect: true, 
      redirectId: this.props.campus.id
    });
  }

  // Unmount when the component is being removed from the DOM:
  componentDidMount()  {
    // Get campus ID from URL (API link)
    this.props.fetchCampus(this.props.match.params.id);
}

  // Render new campus input form
  render() {
    // Redirect to campus page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/campus/${this.state.redirectId}`}/>)
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <EditCampusView 
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit}
          campus={this.props.campus}    
        />
      </div>          
    );
  }
}


// The following 2 input arguments are passed to the "connect" function used by "CampusContainer" component to connect to Redux Store.
// 1. The "mapState" argument specifies the data from Redux Store that the component needs.
// The "mapState" is called when the Store State changes, and it returns a data object of "campus".
const mapState = (state) => {
  return {
    campus: state.campus,  // Get the State object from Reducer "campus"
  };
};


// The following input argument is passed to the "connect" function used by "EditCampusContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        fetchCampus: (campusId) => dispatch(fetchCampusThunk(campusId)),
        editCampus: (campusId) => dispatch(editCampusThunk(campusId)),
    })
}

// Export store-connected container by default
// NewCampusContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(EditCampusContainer);