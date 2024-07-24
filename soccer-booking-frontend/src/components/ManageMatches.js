import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { format } from 'date-fns';


const ManageMatches = () => {
  const [matches, setMatches] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMatch, setEditMatch] = useState(null);

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    const token = localStorage.getItem('token');
    const result = await axios.get('http://localhost:5000/matches', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setMatches(result.data);
  };

  const handleCreateMatch = async (match) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/matches', match, {
        headers: { Authorization: `Bearer ${token}` }
      });
      loadMatches();
    } catch (error) {
      console.error('Error creating match:', error);
      alert('Error creating match');
    }
  };

  const handleEditMatch = async (match) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`http://localhost:5000/matches/${match.id}`, match, {
        headers: { Authorization: `Bearer ${token}` }
      });
      loadMatches();
    } catch (error) {
      console.error('Error editing match:', error);
      alert('Error editing match');
    }
  };

  const handleDeleteMatch = async (matchId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/matches/${matchId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      loadMatches();
    } catch (error) {
      console.error('Error deleting match:', error);
      alert('Error deleting match');
    }
  };

  const handleOpenDialog = (match) => {
    setEditMatch(match);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setEditMatch(null);
    setOpen(false);
  };

  const handleSubmit = () => {
    if (editMatch.id) {
      handleEditMatch(editMatch);
    } else {
      handleCreateMatch(editMatch);
    }
    handleCloseDialog();
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Manage Matches</Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpenDialog({})}>
        Create Match
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {matches.map(match => (
            <TableRow key={match.id}>
              <TableCell>{format(new Date(match.date), 'dd/MM/yyyy')}</TableCell>
              <TableCell>{match.time}</TableCell>
              <TableCell>{match.location}</TableCell>
              <TableCell>
                <Button onClick={() => handleOpenDialog(match)}>Edit</Button>
                <Button onClick={() => handleDeleteMatch(match.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>{editMatch?.id ? 'Edit Match' : 'Create Match'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            value={editMatch?.date || ''}
            onChange={(e) => setEditMatch({ ...editMatch, date: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Time"
            type="time"
            fullWidth
            value={editMatch?.time || ''}
            onChange={(e) => setEditMatch({ ...editMatch, time: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Location"
            type="text"
            fullWidth
            value={editMatch?.location || ''}
            onChange={(e) => setEditMatch({ ...editMatch, location: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageMatches;
