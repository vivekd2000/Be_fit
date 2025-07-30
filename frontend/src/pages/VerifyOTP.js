import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function VerifyOTP() {
  const [otp, setOTP] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/verify-otp', { email, otp });
      localStorage.setItem('token', res.data.token);
      setSuccess('OTP verified! Redirecting...');
      setTimeout(() => navigate('/profile'), 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'OTP verification failed');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={8}>
        <Typography variant="h5" align="center">Verify OTP</Typography>
        <form onSubmit={handleVerify}>
          <TextField
            label="OTP"
            type="text"
            fullWidth
            margin="normal"
            required
            value={otp}
            onChange={e => setOTP(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">Verify OTP</Button>
        </form>
        {error && <Typography color="error" mt={2}>{error}</Typography>}
        {success && <Typography color="primary" mt={2}>{success}</Typography>}
      </Box>
    </Container>
  );
}

export default VerifyOTP;
