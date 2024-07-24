import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';

const AdminDashboard = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Manage Users</Typography>
              <Button variant="contained" color="primary" component={Link} to="/admin/users">
                Go to Users
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Manage Matches</Typography>
              <Button variant="contained" color="primary" component={Link} to="/admin/matches">
                Go to Matches
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Manage Bookings</Typography>
              <Button variant="contained" color="primary" component={Link} to="/admin/bookings">
                Go to Bookings
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
