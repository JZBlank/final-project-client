/*==================================================
HomePageView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the home page.
================================================== */

import { Card, CardMedia, CardContent, Typography, Box, Button} from '@mui/material/';
import { Link } from 'react-router-dom';

import campus from '../img/campus.jpg';
import students from '../img/students.jpg';

const HomePageView = () => {
  // Render Home page view
  return (
    <div >
      <h1>Home Page</h1>

      <Box sx={{ display: "inline-flex", padding:"10px" }}>
        <Card>
          <CardMedia component="img" height="300" image={campus} alt="campus"></CardMedia>
          <CardContent sx={{padding:"20px"}}>
            <Typography gutterBottom variant="h5">
              Campuses
            </Typography>
            <Typography>
              Review information about specific campuses.
            </Typography>
            <Box sx={{height:"30px"}}/>

            <Link to={'/campuses'} >
              <Button variant="contained">
                View Campuses
              </Button>
            </Link>

          </CardContent>
        </Card>
      </Box>

      <Box sx={{ display: "inline-flex", padding:"10px" }}>
        <Card>
          <CardMedia component="img" height="300" image={students} alt="campus"></CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h5">
              Students
            </Typography>
            <Typography>
              Review information about selected students.
            </Typography>
            <Box sx={{height:"30px"}}/>

            <Link to={'/students'} >
              <Button variant="contained">
                View Students
              </Button>
          </Link>
          
          </CardContent>
        </Card>
      </Box>

    </div>
  );    
}

export default HomePageView;