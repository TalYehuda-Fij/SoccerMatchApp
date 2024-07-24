import axios from 'axios';

const API_URL = 'http://localhost:5000';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getUsers = async () => {
  return await axios.get(`${API_URL}/users`, getAuthHeaders());
};

export const createUser = async (user) => {
  return await axios.post(`${API_URL}/users`, user, getAuthHeaders());
};

export const updateUser = async (id, user) => {
  return await axios.put(`${API_URL}/users/${id}`, user, getAuthHeaders());
};

export const deleteUser = async (id) => {
  return await axios.delete(`${API_URL}/users/${id}`, getAuthHeaders());
};
