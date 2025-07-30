import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import VerifyOTP from './pages/VerifyOTP';
import Profile from './pages/Profile';
import Recommendations from './pages/Recommendations';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="*" element={<Navigate to="/register" />} />
      </Routes>
    </Router>
  );
}

export default App;
