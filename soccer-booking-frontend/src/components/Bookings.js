import React, { useState, useEffect } from 'react';
import { getBookings, createBooking, updateBooking, deleteBooking } from '../services/bookingService';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookingData, setBookingData] = useState({ user_id: '', match_id: '', status: '' });

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    const result = await getBookings();
    setBookings(result.data);
  };

  const handleCreate = async () => {
    await createBooking(bookingData);
    setBookingData({ user_id: '', match_id: '', status: '' });
    loadBookings();
  };

  const handleUpdate = async (id) => {
    await updateBooking(id, bookingData);
    setSelectedBooking(null);
    setBookingData({ user_id: '', match_id: '', status: '' });
    loadBookings();
  };

  const handleDelete = async (id) => {
    await deleteBooking(id);
    loadBookings();
  };

  return (
    <div>
      <h1>Bookings</h1>
      <ul>
        {bookings.map(booking => (
          <li key={booking.id}>
            User ID: {booking.user_id} - Match ID: {booking.match_id} - Status: {booking.status}
            <button onClick={() => { setSelectedBooking(booking); setBookingData({ user_id: booking.user_id, match_id: booking.match_id, status: booking.status }); }}>Edit</button>
            <button onClick={() => handleDelete(booking.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {selectedBooking ? (
        <div>
          <h2>Edit Booking</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleUpdate(selectedBooking.id); }}>
            <input
              type="text"
              value={bookingData.user_id}
              onChange={(e) => setBookingData({ ...bookingData, user_id: e.target.value })}
              placeholder="User ID"
            />
            <input
              type="text"
              value={bookingData.match_id}
              onChange={(e) => setBookingData({ ...bookingData, match_id: e.target.value })}
              placeholder="Match ID"
            />
            <input
              type="text"
              value={bookingData.status}
              onChange={(e) => setBookingData({ ...bookingData, status: e.target.value })}
              placeholder="Status"
            />
            <button type="submit">Update Booking</button>
          </form>
        </div>
      ) : (
        <div>
          <h2>Create Booking</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleCreate(); }}>
            <input
              type="text"
              value={bookingData.user_id}
              onChange={(e) => setBookingData({ ...bookingData, user_id: e.target.value })}
              placeholder="User ID"
            />
            <input
              type="text"
              value={bookingData.match_id}
              onChange={(e) => setBookingData({ ...bookingData, match_id: e.target.value })}
              placeholder="Match ID"
            />
            <input
              type="text"
              value={bookingData.status}
              onChange={(e) => setBookingData({ ...bookingData, status: e.target.value })}
              placeholder="Status"
            />
            <button type="submit">Create Booking</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Bookings;
