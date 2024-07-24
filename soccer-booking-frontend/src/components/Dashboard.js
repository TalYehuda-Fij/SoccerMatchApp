import React from 'react';
import { Typography, Container } from '@mui/material';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {};

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {user.username ? `${user.username} Dashboard` : 'Dashboard'}
      </Typography>
      <Typography variant="body1">
        Welcome to your personalized dashboard!
      </Typography>
    </Container>
  );
};

export default Dashboard;
