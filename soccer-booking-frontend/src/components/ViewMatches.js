import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewMatches = () => {
  const [matches, setMatches] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadMatches();
    loadBookings();
  }, []);

  const loadMatches = async () => {
    const token = localStorage.getItem('token');
    const result = await axios.get('http://localhost:5000/matches', {
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
    <div>
      <h1>Future Matches</h1>
      <ul>
        {matches.map(match => (
          <li key={match.id}>
            {match.date} - {match.time} - {match.location}
            {isUserSignedUp(match.id) ? (
              <button onClick={() => handleUnsign(match.id)}>Unsign</button>
            ) : (
              <button onClick={() => handleSignUp(match.id)}>Sign Up</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewMatches;
