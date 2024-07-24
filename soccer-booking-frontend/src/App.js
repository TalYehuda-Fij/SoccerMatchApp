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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
