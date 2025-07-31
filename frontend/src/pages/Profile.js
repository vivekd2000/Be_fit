import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, TextField, MenuItem, Checkbox, FormControlLabel, FormGroup, Slider, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const dietaryPatterns = ['Vegetarian', 'Vegan', 'Non-Vegetarian', 'Eggetarian'];
const experienceLevels = ['Beginner', 'Intermediate', 'Advanced'];
const fitnessGoals = ['Muscle Gain', 'Fat Loss', 'Endurance', 'General Wellness'];
const supplementForms = ['Powder', 'Capsule', 'Liquid', 'No Preference'];
const certifications = ['NSF', 'USP', 'ConsumerLab', 'FSSAI'];
const allergiesList = ['soy', 'gluten', 'dairy', 'nuts', 'fish', 'egg'];

function Profile() {
  const [form, setForm] = useState({
    healthMetrics: {
      height: '', weight: '', age: '', gender: '', cholesterol: '', bloodPressure: '', bloodSugar: '', medicalConditions: ''
    },
    fitnessProfile: { experienceLevel: '', fitnessGoal: '' },
    dietaryPreferences: { dietaryPattern: '', allergies: [], restrictions: '' },
    supplementPreferences: {
      preferredForm: '', preferredBrands: '', ingredientTransparency: false, certifications: [], avoidProprietaryBlends: false, clinicallySupportedDosage: false
    },
    otherPreferences: {
      priceRange: { min: 500, max: 3000 }, minCustomerRating: 4, allowInternational: false, allowProprietaryBlends: false
    },
    consent: false
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch existing profile
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://shiny-dollop-r4v4776pgwgvhx5q5-5000.app.github.dev/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data) setForm({ ...form, ...res.data });
      } catch (e) { /* ignore if first time */ }
    };
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  const handleChange = (section, field, value) => {
    setForm(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };
  const handleNestedChange = (section, field, value) => {
    setForm(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
  };

  const handleAllergyChange = (allergy) => {
    setForm(prev => ({
      ...prev,
      dietaryPreferences: {
        ...prev.dietaryPreferences,
        allergies: prev.dietaryPreferences.allergies.includes(allergy)
          ? prev.dietaryPreferences.allergies.filter(a => a !== allergy)
          : [...prev.dietaryPreferences.allergies, allergy]
      }
    }));
  };

  const handleCertChange = (cert) => {
    setForm(prev => ({
      ...prev,
      supplementPreferences: {
        ...prev.supplementPreferences,
        certifications: prev.supplementPreferences.certifications.includes(cert)
          ? prev.supplementPreferences.certifications.filter(c => c !== cert)
          : [...prev.supplementPreferences.certifications, cert]
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess('');
    setApiError('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/user/update', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Profile updated!');
      setTimeout(() => navigate('/recommendations'), 1000);
    } catch (err) {
      if (err.response?.data?.errors) setErrors(err.response.data.errors);
      else setApiError('Failed to update profile');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h5" align="center">Your Profile</Typography>
        <form onSubmit={handleSubmit}>
          <Typography variant="subtitle1">Health Metrics</Typography>
          <TextField label="Height (cm)" type="number" fullWidth margin="dense" value={form.healthMetrics.height} onChange={e => handleChange('healthMetrics', 'height', e.target.value)} error={!!errors.height} helperText={errors.height} />
          <TextField label="Weight (kg)" type="number" fullWidth margin="dense" value={form.healthMetrics.weight} onChange={e => handleChange('healthMetrics', 'weight', e.target.value)} error={!!errors.weight} helperText={errors.weight} />
          <TextField label="Age" type="number" fullWidth margin="dense" value={form.healthMetrics.age} onChange={e => handleChange('healthMetrics', 'age', e.target.value)} error={!!errors.age} helperText={errors.age} />
          <TextField label="Gender" select fullWidth margin="dense" value={form.healthMetrics.gender} onChange={e => handleChange('healthMetrics', 'gender', e.target.value)} error={!!errors.gender} helperText={errors.gender}>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
          <TextField label="Cholesterol (mg/dL)" type="number" fullWidth margin="dense" value={form.healthMetrics.cholesterol} onChange={e => handleChange('healthMetrics', 'cholesterol', e.target.value)} error={!!errors.cholesterol} helperText={errors.cholesterol} />
          <TextField label="Blood Pressure (e.g. 120/80)" fullWidth margin="dense" value={form.healthMetrics.bloodPressure} onChange={e => handleChange('healthMetrics', 'bloodPressure', e.target.value)} error={!!errors.bloodPressure} helperText={errors.bloodPressure} />
          <TextField label="Blood Sugar (mg/dL)" type="number" fullWidth margin="dense" value={form.healthMetrics.bloodSugar} onChange={e => handleChange('healthMetrics', 'bloodSugar', e.target.value)} error={!!errors.bloodSugar} helperText={errors.bloodSugar} />
          <TextField label="Medical Conditions (comma separated, optional)" fullWidth margin="dense" value={form.healthMetrics.medicalConditions} onChange={e => handleChange('healthMetrics', 'medicalConditions', e.target.value)} />
          <Typography variant="subtitle1" mt={2}>Fitness Profile</Typography>
          <TextField label="Experience Level" select fullWidth margin="dense" value={form.fitnessProfile.experienceLevel} onChange={e => handleChange('fitnessProfile', 'experienceLevel', e.target.value)} error={!!errors.experienceLevel} helperText={errors.experienceLevel}>
            {experienceLevels.map(lvl => <MenuItem key={lvl} value={lvl}>{lvl}</MenuItem>)}
          </TextField>
          <TextField label="Fitness Goal" select fullWidth margin="dense" value={form.fitnessProfile.fitnessGoal} onChange={e => handleChange('fitnessProfile', 'fitnessGoal', e.target.value)} error={!!errors.fitnessGoal} helperText={errors.fitnessGoal}>
            {fitnessGoals.map(goal => <MenuItem key={goal} value={goal}>{goal}</MenuItem>)}
          </TextField>
          <Typography variant="subtitle1" mt={2}>Dietary Preferences</Typography>
          <TextField label="Dietary Pattern" select fullWidth margin="dense" value={form.dietaryPreferences.dietaryPattern} onChange={e => handleChange('dietaryPreferences', 'dietaryPattern', e.target.value)}>
            {dietaryPatterns.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
          </TextField>
          <FormGroup row>
            {allergiesList.map(allergy => (
              <FormControlLabel
                key={allergy}
                control={<Checkbox checked={form.dietaryPreferences.allergies.includes(allergy)} onChange={() => handleAllergyChange(allergy)} />}
                label={allergy}
              />
            ))}
          </FormGroup>
          <TextField label="Other Restrictions (comma separated, optional)" fullWidth margin="dense" value={form.dietaryPreferences.restrictions} onChange={e => handleChange('dietaryPreferences', 'restrictions', e.target.value)} />
          <Typography variant="subtitle1" mt={2}>Supplement Preferences</Typography>
          <TextField label="Preferred Form" select fullWidth margin="dense" value={form.supplementPreferences.preferredForm} onChange={e => handleChange('supplementPreferences', 'preferredForm', e.target.value)}>
            {supplementForms.map(f => <MenuItem key={f} value={f}>{f}</MenuItem>)}
          </TextField>
          <TextField label="Preferred Brands (comma separated, optional)" fullWidth margin="dense" value={form.supplementPreferences.preferredBrands} onChange={e => handleChange('supplementPreferences', 'preferredBrands', e.target.value)} />
          <FormGroup row>
            <FormControlLabel control={<Checkbox checked={form.supplementPreferences.ingredientTransparency} onChange={e => handleNestedChange('supplementPreferences', 'ingredientTransparency', e.target.checked)} />} label="Only transparent ingredients" />
            <FormControlLabel control={<Checkbox checked={form.supplementPreferences.avoidProprietaryBlends} onChange={e => handleNestedChange('supplementPreferences', 'avoidProprietaryBlends', e.target.checked)} />} label="Avoid proprietary blends" />
            <FormControlLabel control={<Checkbox checked={form.supplementPreferences.clinicallySupportedDosage} onChange={e => handleNestedChange('supplementPreferences', 'clinicallySupportedDosage', e.target.checked)} />} label="Clinically supported dosage" />
          </FormGroup>
          <FormGroup row>
            {certifications.map(cert => (
              <FormControlLabel
                key={cert}
                control={<Checkbox checked={form.supplementPreferences.certifications.includes(cert)} onChange={() => handleCertChange(cert)} />}
                label={cert}
              />
            ))}
          </FormGroup>
          <Typography variant="subtitle1" mt={2}>Other Preferences</Typography>
          <Box display="flex" alignItems="center" mt={1} mb={1}>
            <Typography>Price Range (₹{form.otherPreferences.priceRange.min}–₹{form.otherPreferences.priceRange.max})</Typography>
            <Slider
              value={[form.otherPreferences.priceRange.min, form.otherPreferences.priceRange.max]}
              min={100}
              max={10000}
              step={100}
              onChange={(e, newVal) => handleNestedChange('otherPreferences', 'priceRange', { min: newVal[0], max: newVal[1] })}
              valueLabelDisplay="auto"
              sx={{ ml: 2, width: 200 }}
            />
          </Box>
          <TextField label="Minimum Customer Rating" type="number" inputProps={{ min: 1, max: 5, step: 0.1 }} fullWidth margin="dense" value={form.otherPreferences.minCustomerRating} onChange={e => handleNestedChange('otherPreferences', 'minCustomerRating', e.target.value)} />
          <FormGroup row>
            <FormControlLabel control={<Checkbox checked={form.otherPreferences.allowInternational} onChange={e => handleNestedChange('otherPreferences', 'allowInternational', e.target.checked)} />} label="Allow international brands" />
            <FormControlLabel control={<Checkbox checked={form.otherPreferences.allowProprietaryBlends} onChange={e => handleNestedChange('otherPreferences', 'allowProprietaryBlends', e.target.checked)} />} label="Allow proprietary blends" />
          </FormGroup>
          <FormControlLabel control={<Checkbox checked={form.consent} onChange={e => setForm(prev => ({ ...prev, consent: e.target.checked }))} required />} label="I understand recommendations are informational and consent to privacy policy." />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>Save & Continue</Button>
        </form>
        {Object.values(errors).length > 0 && <Alert severity="error" sx={{ mt: 2 }}>{Object.values(errors).join(', ')}</Alert>}
        {apiError && <Alert severity="error" sx={{ mt: 2 }}>{apiError}</Alert>}
        {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
      </Box>
    </Container>
  );
}

export default Profile;
