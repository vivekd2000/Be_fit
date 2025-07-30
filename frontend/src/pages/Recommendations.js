import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Card, CardContent, Chip, Button, Grid, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Recommendations() {
  const [recs, setRecs] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecs = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/user/recommendations', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRecs(res.data.recommendations || []);
      } catch (err) {
        setError('Failed to fetch recommendations.');
      }
    };
    fetchRecs();
  }, []);

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography variant="h5" align="center">Supplement Recommendations</Typography>
        <Button variant="outlined" onClick={() => navigate('/profile')} sx={{ mb: 2 }}>Update Profile</Button>
        {error && <Alert severity="error">{error}</Alert>}
        {recs.length === 0 && !error && <Typography>No recommendations found. Try updating your profile.</Typography>}
        <Grid container spacing={2}>
          {recs.map((supp, idx) => (
            <Grid item xs={12} md={6} key={idx}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">{supp.name}</Typography>
                  <Typography variant="body2" color="textSecondary">{supp.scientificReasoning}</Typography>
                  <Box mt={1}>
                    {supp.brands && supp.brands.map(b => <Chip key={b} label={b} sx={{ mr: 1 }} />)}
                    {supp.certifications && supp.certifications.map(c => <Chip key={c} label={c} color="success" sx={{ mr: 1 }} />)}
                    {supp.ingredientTransparency && <Chip label="Transparent Ingredients" color="info" sx={{ mr: 1 }} />}
                    {supp.proprietaryBlend && <Chip label="Proprietary Blend" color="warning" sx={{ mr: 1 }} />}
                    {supp.clinicallySupportedDosage && <Chip label="Clinically Supported Dosage" color="primary" sx={{ mr: 1 }} />}
                  </Box>
                  <Typography>Price: ₹{supp.price}</Typography>
                  <Typography>Minimum Rating: {supp.minRating}</Typography>
                  <Typography>Allergens: {supp.allergens.length ? supp.allergens.join(', ') : 'None'}</Typography>
                  <Typography>Dietary: {supp.dietary.join(', ')}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default Recommendations;
