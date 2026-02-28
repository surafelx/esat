const express = require('express');
const router = express.Router();
const { auth } = require('../config/firebase');
const { 
  createUserProfile, 
  getUserProfile, 
  updateUserProfile,
  addXP,
  getAllUsers 
} = require('../services/user.service');
const { verifyToken, requireRole } = require('../middleware/auth.middleware');

/**
 * POST /auth/login
 * Verify Firebase ID token and return/create user profile
 */
router.post('/login', async (req, res) => {
  try {
    const { idToken, role } = req.body;
    
    if (!idToken) {
      return res.status(400).json({ error: 'ID token required' });
    }

    // Verify Firebase token
    const decodedToken = await auth.verifyIdToken(idToken);
    
    // Get or create user profile
    let profile = await getUserProfile(decodedToken.uid);
    
    if (!profile) {
      // New user - create profile
      profile = await createUserProfile(decodedToken.uid, {
        email: decodedToken.email,
        role: role || 'student',
      });
    }

    res.json({
      uid: decodedToken.uid,
      email: decodedToken.email,
      ...profile,
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

/**
 * GET /auth/me
 * Get current user profile
 */
router.get('/me', verifyToken, async (req, res) => {
  try {
    const profile = await getUserProfile(req.user.uid);
    
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    res.json(profile);
  } catch (error) {
    console.error('Get profile error:', error.message);
    res.status(500).json({ error: 'Failed to get profile' });
  }
});

/**
 * PUT /auth/profile
 * Update user profile
 */
router.put('/profile', verifyToken, async (req, res) => {
  try {
    const allowedFields = ['displayName', 'role', 'cohortId'];
    const updates = {};
    
    // Only allow specific fields
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    const profile = await updateUserProfile(req.user.uid, updates);
    res.json(profile);
  } catch (error) {
    console.error('Update profile error:', error.message);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

/**
 * POST /auth/xp
 * Add XP to user (for completing lessons, assignments, etc.)
 */
router.post('/xp', verifyToken, async (req, res) => {
  try {
    const { xp } = req.body;
    
    if (!xp || typeof xp !== 'number' || xp <= 0) {
      return res.status(400).json({ error: 'Valid XP amount required' });
    }

    const profile = await addXP(req.user.uid, xp);
    res.json({ 
      message: `Added ${xp} XP`,
      xp: profile.xp,
      level: profile.level,
    });
  } catch (error) {
    console.error('Add XP error:', error.message);
    res.status(500).json({ error: 'Failed to add XP' });
  }
});

/**
 * GET /auth/users
 * Get all users (admin only)
 */
router.get('/users', verifyToken, requireRole('admin'), async (req, res) => {
  try {
    const { role } = req.query;
    const users = await getAllUsers(role || null);
    res.json(users);
  } catch (error) {
    console.error('Get users error:', error.message);
    res.status(500).json({ error: 'Failed to get users' });
  }
});

/**
 * POST /auth/verify
 * Verify token without creating profile
 */
router.post('/verify', verifyToken, async (req, res) => {
  try {
    const profile = await getUserProfile(req.user.uid);
    res.json({ 
      valid: true, 
      user: req.user,
      profile: profile || null,
    });
  } catch (error) {
    res.status(500).json({ error: 'Verification failed' });
  }
});

module.exports = router;
