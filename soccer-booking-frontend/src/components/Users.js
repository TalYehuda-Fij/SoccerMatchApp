import React, { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../services/userService';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userData, setUserData] = useState({ username: '', email: '', password: '', role: '', skill_level: 0 });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await getUsers();
    setUsers(result.data);
  };

  const handleUpdate = async (id) => {
    await updateUser(id, userData);
    loadUsers();
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    loadUsers();
  };

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username} - {user.email}
            <button onClick={() => setSelectedUser(user)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {selectedUser && (
        <div>
          <h2>Edit User</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleUpdate(selectedUser.id); }}>
            <input
              type="text"
              value={userData.username}
              onChange={(e) => setUserData({ ...userData, username: e.target.value })}
              placeholder="Username"
            />
            <input
              type="email"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              placeholder="Email"
            />
            <input
              type="password"
              value={userData.password}
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
              placeholder="Password"
            />
            <input
              type="text"
              value={userData.role}
              onChange={(e) => setUserData({ ...userData, role: e.target.value })}
              placeholder="Role"
            />
            <input
              type="number"
              value={userData.skill_level}
              onChange={(e) => setUserData({ ...userData, skill_level: parseInt(e.target.value) })}
              placeholder="Skill Level"
            />
            <button type="submit">Update User</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Users;
