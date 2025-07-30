import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email });
      setSuccess(res.data.message);
      setTimeout(() => navigate('/verify-otp', { state: { email } }), 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={8}>
        <Typography variant="h5" align="center">Login</Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">Login</Button>
        </form>
        {error && <Typography color="error" mt={2}>{error}</Typography>}
        {success && <Typography color="primary" mt={2}>{success}</Typography>}
      </Box>
    </Container>
  );
}

export default Login;
