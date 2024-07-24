import axios from 'axios';

const API_URL = 'http://localhost:5000';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getMatches = async () => {
  return await axios.get(`${API_URL}/matches`, getAuthHeaders());
};

export const createMatch = async (match) => {
  return await axios.post(`${API_URL}/matches`, match, getAuthHeaders());
};

export const updateMatch = async (id, match) => {
  return await axios.put(`${API_URL}/matches/${id}`, match, getAuthHeaders());
};

export const deleteMatch = async (id) => {
  return await axios.delete(`${API_URL}/matches/${id}`, getAuthHeaders());
};
