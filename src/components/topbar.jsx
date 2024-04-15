// TopBar.js

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import {useNavigate} from "react-router-dom";
import { onLogout } from '../api/AuthAPI';

function TopBar() {
  let navigate = useNavigate();
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div">
          Shoppify
        </Typography>
        <Box sx={{ flexGrow: 1 }} /> {/* Empty flexible div */}
        <Button variant="contained" style={{ backgroundColor: 'white', color: 'black' , marginRight: '20px'}} onClick={()=> {navigate("/")}}>
          Home
        </Button>
        <Button variant="contained" style={{ backgroundColor: 'white', color: 'black'}} onClick={onLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
