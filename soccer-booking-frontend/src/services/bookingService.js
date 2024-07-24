import axios from 'axios';

const API_URL = 'http://localhost:5000';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getBookings = async () => {
  return await axios.get(`${API_URL}/bookings`, getAuthHeaders());
};

export const createBooking = async (booking) => {
  return await axios.post(`${API_URL}/bookings`, booking, getAuthHeaders());
};

export const updateBooking = async (id, booking) => {
  return await axios.put(`${API_URL}/bookings/${id}`, booking, getAuthHeaders());
};

export const deleteBooking = async (id) => {
  return await axios.delete(`${API_URL}/bookings/${id}`, getAuthHeaders());
};
