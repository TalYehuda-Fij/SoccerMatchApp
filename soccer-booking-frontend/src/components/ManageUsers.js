import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Pagination, CircularProgress } from '@mui/material';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ username: '', email: '' });
  const [open, setOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadUsers();
  }, [page, filters]);

  const loadUsers = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const result = await axios.get('http://localhost:5000/users', {
        headers: { Authorization: `Bearer ${token}` },
        params: { ...filters, page, limit: 10 }
      });
      console.log('API Response:', result.data); // Log the response
      setUsers(Array.isArray(result.data.users) ? result.data.users : []);
      setTotalPages(result.data.pages || 1);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const validate = (user) => {
    let tempErrors = {};
    if (!user.username) tempErrors.username = "Username is required";
    if (!user.email) tempErrors.email = "Email is required";
    if (!user.role) tempErrors.role = "Role is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleCreateUser = async (user) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/users', user, {
        headers: { Authorization: `Bearer ${token}` }
      });
      loadUsers();
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Error creating user');
    }
  };

  const handleEditUser = async (user) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`http://localhost:5000/users/${user.id}`, user, {
        headers: { Authorization: `Bearer ${token}` }
      });
      loadUsers();
    } catch (error) {
      console.error('Error editing user:', error);
      alert('Error editing user');
    }
  };

  const handleDeleteUser = async (userId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      loadUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Error deleting user');
    }
  };

  const handleOpenDialog = (user) => {
    setEditUser(user);
    setErrors({});
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setEditUser(null);
    setOpen(false);
  };

  const handleSubmit = () => {
    if (validate(editUser)) {
      if (editUser.id) {
        handleEditUser(editUser);
      } else {
        handleCreateUser(editUser);
      }
      handleCloseDialog();
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    loadUsers();
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Manage Users</Typography>
      <form onSubmit={handleFilterSubmit}>
        <TextField
          name="username"
          label="Username"
          value={filters.username}
          onChange={handleFilterChange}
          margin="normal"
        />
        <TextField
          name="email"
          label="Email"
          value={filters.email}
          onChange={handleFilterChange}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Apply Filters
        </Button>
      </form>
      <Button variant="contained" color="primary" onClick={() => handleOpenDialog({})}>
        Create User
      </Button>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleOpenDialog(user)}>Edit</Button>
                    <Button onClick={() => handleDeleteUser(user.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            sx={{ mt: 2 }}
          />
        </>
      )}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>{editUser?.id ? 'Edit User' : 'Create User'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            value={editUser?.username || ''}
            onChange={(e) => setEditUser({ ...editUser, username: e.target.value })}
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={editUser?.email || ''}
            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            margin="dense"
            label="Role"
            type="text"
            fullWidth
            value={editUser?.role || ''}
            onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
            error={!!errors.role}
            helperText={errors.role}
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

export default ManageUsers;
