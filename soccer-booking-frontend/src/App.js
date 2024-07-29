import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Matches from './components/Matches';
import Bookings from './components/Bookings';
import NavBar from './components/NavBar';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ViewMatches from './components/ViewMatches';
import AdminDashboard from './components/AdminDashboard';
import ManageUsers from './components/ManageUsers';
import ManageMatches from './components/ManageMatches';
import ManageBookings from './components/ManageBookings';
import Teams from './components/Teams'; // Import the Teams component

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const setTokenHandler = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const removeTokenHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
  };

  const user = JSON.parse(localStorage.getItem('user')) || {};

  return (
    <Router>
      <div className="App">
        <NavBar token={token} removeToken={removeTokenHandler} />
        <Routes>
          <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <Login setToken={setTokenHandler} />} />
          <Route path="/signup" element={token ? <Navigate to="/dashboard" /> : <SignUp />} />
          <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/users" element={token ? <Users /> : <Navigate to="/login" />} />
          <Route path="/matches" element={token ? <Matches /> : <Navigate to="/login" />} />
          <Route path="/bookings" element={token ? <Bookings /> : <Navigate to="/login" />} />
          <Route path="/view-matches" element={token ? <ViewMatches /> : <Navigate to="/login" />} />
          <Route path="/teams/:matchId" element={token ? <Teams /> : <Navigate to="/login" />} /> {/* Add Teams route */}
          {token && user.role === 'admin' && (
            <>
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<ManageUsers />} />
              <Route path="/admin/matches" element={<ManageMatches />} />
              <Route path="/admin/bookings" element={<ManageBookings />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
