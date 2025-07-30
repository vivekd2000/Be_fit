import express from 'express';
const router = express.Router();

import User from '../models/User.js';
import { authenticateToken } from '../middleware/auth.js';

// Get user profile (protected)
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-otp -passwordHash');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

import { validateUserProfile } from '../utils/validation.js';

// Update user profile (protected)
router.post('/update', authenticateToken, async (req, res) => {
  try {
    const updates = req.body;
    const errors = validateUserProfile(updates);
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }
    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true, runValidators: true }).select('-otp -passwordHash');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

import { recommendSupplements } from '../utils/supplements.js';

// Get supplement recommendations (protected)
router.get('/recommendations', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).lean();
    if (!user) return res.status(404).json({ message: 'User not found' });
    const recommendations = recommendSupplements(user).map(supp => ({
      ...supp,
      scientificReasoning: supp.scientificBacking
        ? `This supplement is supported by credible research. ${supp.description}`
        : `Caution: This supplement lacks credible scientific backing. ${supp.description}`
    }));
    res.json({ recommendations });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
