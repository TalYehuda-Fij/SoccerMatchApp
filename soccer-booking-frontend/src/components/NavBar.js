import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user')) || {};

  return (
    <nav>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        {user.role === 'admin' && <li><Link to="/users">Users</Link></li>}
        {user.role === 'admin' && <li><Link to="/matches">Matches</Link></li>}
        {user.role === 'admin' && <li><Link to="/bookings">Bookings</Link></li>}
        <li><Link to="/view-matches">View Matches</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
