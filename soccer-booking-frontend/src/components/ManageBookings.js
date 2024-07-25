import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [open, setOpen] = useState(false);
  const [editBooking, setEditBooking] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    const token = localStorage.getItem('token');
    const result = await axios.get('http://localhost:5000/bookings', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setBookings(result.data);
  };

  const validate = (booking) => {
    let tempErrors = {};
    if (!booking.match_id) tempErrors.match_id = "Match ID is required";
    if (!booking.user_id) tempErrors.user_id = "User ID is required";
    if (!booking.status) tempErrors.status = "Status is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleCreateBooking = async (booking) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/bookings', booking, {
        headers: { Authorization: `Bearer ${token}` }
      });
      loadBookings();
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Error creating booking');
    }
  };

  const handleEditBooking = async (booking) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`http://localhost:5000/bookings/${booking.id}`, booking, {
        headers: { Authorization: `Bearer ${token}` }
      });
      loadBookings();
    } catch (error) {
      console.error('Error editing booking:', error);
      alert('Error editing booking');
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      loadBookings();
    } catch (error) {
      console.error('Error deleting booking:', error);
      alert('Error deleting booking');
    }
  };

  const handleOpenDialog = (booking) => {
    setEditBooking(booking);
    setErrors({});
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setEditBooking(null);
    setOpen(false);
  };

  const handleSubmit = () => {
    if (validate(editBooking)) {
      if (editBooking.id) {
        handleEditBooking(editBooking);
      } else {
        handleCreateBooking(editBooking);
      }
      handleCloseDialog();
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Manage Bookings</Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpenDialog({})}>
        Create Booking
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Match ID</TableCell>
            <TableCell>User ID</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map(booking => (
            <TableRow key={booking.id}>
              <TableCell>{booking.match_id}</TableCell>
              <TableCell>{booking.user_id}</TableCell>
              <TableCell>{booking.status}</TableCell>
              <TableCell>
                <Button onClick={() => handleOpenDialog(booking)}>Edit</Button>
                <Button onClick={() => handleDeleteBooking(booking.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>{editBooking?.id ? 'Edit Booking' : 'Create Booking'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Match ID"
            type="text"
            fullWidth
            value={editBooking?.match_id || ''}
            onChange={(e) => setEditBooking({ ...editBooking, match_id: e.target.value })}
            error={!!errors.match_id}
            helperText={errors.match_id}
          />
          <TextField
            margin="dense"
            label="User ID"
            type="text"
            fullWidth
            value={editBooking?.user_id || ''}
            onChange={(e) => setEditBooking({ ...editBooking, user_id: e.target.value })}
            error={!!errors.user_id}
            helperText={errors.user_id}
          />
          <TextField
            margin="dense"
            label="Status"
            type="text"
            fullWidth
            value={editBooking?.status || ''}
            onChange={(e) => setEditBooking({ ...editBooking, status: e.target.value })}
            error={!!errors.status}
            helperText={errors.status}
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

export default ManageBookings;
