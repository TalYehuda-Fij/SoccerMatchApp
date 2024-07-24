import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Typography, Container, Accordion, AccordionSummary, AccordionDetails, Card, CardContent, CardActions, Grid, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { format } from 'date-fns';

const ViewMatches = () => {
  const [matches, setMatches] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadMatches();
    loadBookings();
  }, []);

  const loadMatches = async () => {
    const token = localStorage.getItem('token');
    const result = await axios.get('http://localhost:5000/matches-with-players', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setMatches(result.data);
  };

  const loadBookings = async () => {
    const token = localStorage.getItem('token');
    const result = await axios.get('http://localhost:5000/bookings', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setBookings(result.data);
  };

  const handleSignUp = async (matchId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('http://localhost:5000/bookings', 
        { match_id: matchId, status: 'booked' }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        alert('Successfully signed up for the match');
        loadBookings();
        loadMatches();
      }
    } catch (error) {
      console.error('Sign-up error:', error);
      alert('Error signing up for the match: ' + error.response.data.error);
    }
  };

  const handleUnsign = async (matchId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete(`http://localhost:5000/bookings/${matchId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 200) {
        alert('Successfully unsigned from the match');
        loadBookings();
        loadMatches();
      }
    } catch (error) {
      console.error('Unsign error:', error);
      alert('Error unsigning from the match: ' + error.response.data.error);
    }
  };

  const isUserSignedUp = (matchId) => {
    return bookings.some(booking => booking.match_id === matchId);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Future Matches</Typography>
      <Grid container spacing={3}>
        {matches.map(match => (
          <Grid item xs={12} sm={6} md={4} key={match.id}>
            <Card sx={{ 
              boxShadow: 3, 
              borderRadius: 2, 
              bgcolor: 'background.paper', 
              padding: 2, 
              transition: '0.3s',
              '&:hover': {
                boxShadow: 6,
                transform: 'scale(1.03)'
              }
            }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {`${format(new Date(match.date), 'dd/MM/yyyy')} - ${match.time}`}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>{match.location}</Typography>
                <Divider sx={{ marginY: 2 }} />
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Players Signed Up ({match.players.length})</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={1}>
                      {match.players.map((player, index) => (
                        <Grid item xs={12} key={index}>
                          <Typography variant="body2">{player}</Typography>
                        </Grid>
                      ))}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </CardContent>
              <CardActions>
                {isUserSignedUp(match.id) ? (
                  <Button variant="contained" color="secondary" fullWidth onClick={() => handleUnsign(match.id)}>
                    Unsign
                  </Button>
                ) : (
                  <Button variant="contained" color="primary" fullWidth onClick={() => handleSignUp(match.id)}>
                    Sign Up
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ViewMatches;
