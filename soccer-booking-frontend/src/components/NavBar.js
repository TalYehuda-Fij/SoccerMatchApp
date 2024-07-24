import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const NavBar = ({ token, removeToken }) => {
  const user = JSON.parse(localStorage.getItem('user')) || {};

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          SoccerMatchApplication
        </Typography>
        {token ? (
          <>
            <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
            {user.role === 'admin' && <Button color="inherit" component={Link} to="/users">Users</Button>}
            {user.role === 'admin' && <Button color="inherit" component={Link} to="/matches">Matches</Button>}
            {user.role === 'admin' && <Button color="inherit" component={Link} to="/bookings">Bookings</Button>}
            <Button color="inherit" component={Link} to="/view-matches">View Matches</Button>
            <Button color="inherit" onClick={removeToken}>Logout</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
