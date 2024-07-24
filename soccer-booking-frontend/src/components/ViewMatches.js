import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, List, ListItem, ListItemText, Typography, Container, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
      <List>
        {matches.map(match => (
          <Accordion key={match.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{`${match.date} - ${match.time} - ${match.location}`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="subtitle1">Players Signed Up ({match.players.length}):</Typography>
              <List>
                {match.players.map((player, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={player} />
                  </ListItem>
                ))}
              </List>
              {isUserSignedUp(match.id) ? (
                <Button variant="contained" color="secondary" onClick={() => handleUnsign(match.id)}>
                  Unsign
                </Button>
              ) : (
                <Button variant="contained" color="primary" onClick={() => handleSignUp(match.id)}>
                  Sign Up
                </Button>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </List>
    </Container>
  );
};

export default ViewMatches;
