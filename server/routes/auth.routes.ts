import { Router, Response } from 'express';
import { auth } from '../config/firebase.js';
import { 
  createUserProfile, 
  getUserProfile, 
  updateUserProfile,
  addXP,
  getAllUsers 
} from '../services/user.service.js';
import { verifyToken, requireRole } from '../middleware/auth.middleware.js';

const router = Router();

interface AuthUser {
  uid: string;
}

interface AuthRequest {
  user?: AuthUser;
  params?: Record<string, string>;
  query?: Record<string, string>;
  body?: Record<string, unknown>;
}

interface LoginBody {
  idToken?: string;
  role?: string;
}

/**
 * POST /auth/login
 * Verify Firebase ID token and return/create user profile
 */
router.post('/login', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const body = (req.body as LoginBody) || {};
    const idToken = body.idToken;
    const role = body.role;
    
    if (!idToken) {
      res.status(400).json({ error: 'ID token required' });
      return;
    }

    const decodedToken = await auth.verifyIdToken(idToken);
    
    let profile = await getUserProfile(decodedToken.uid);
    
    if (!profile) {
      profile = await createUserProfile(decodedToken.uid, {
        email: decodedToken.email || '',
        role: role || 'student',
      });
    }

    res.json({
      email: decodedToken.email,
      ...profile,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Login error:', message);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

/**
 * GET /auth/me
 * Get current user profile
 */
router.get('/me', verifyToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const profile = await getUserProfile(req.user!.uid);
    
    if (!profile) {
      res.status(404).json({ error: 'Profile not found' });
      return;
    }
    
    res.json(profile);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Get profile error:', message);
    res.status(500).json({ error: 'Failed to get profile' });
  }
});

/**
 * PUT /auth/profile
 * Update user profile
 */
router.put('/profile', verifyToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const allowedFields = ['displayName', 'role', 'cohortId'];
    const updates: Record<string, unknown> = {};
    const body = (req.body as Record<string, unknown>) || {};
    
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updates[field] = body[field];
      }
    }

    const profile = await updateUserProfile(req.user!.uid, updates);
    res.json(profile);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Update profile error:', message);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

/**
 * POST /auth/xp
 * Add XP to user (for completing lessons, assignments, etc.)
 */
router.post('/xp', verifyToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const body = (req.body as Record<string, unknown>) || {};
    const xp = body.xp as number;
    
    if (!xp || typeof xp !== 'number' || xp <= 0) {
      res.status(400).json({ error: 'Valid XP amount required' });
      return;
    }

    const profile = await addXP(req.user!.uid, xp);
    res.json({ 
      message: `Added ${xp} XP`,
      xp: profile?.xp,
      level: profile?.level,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Add XP error:', message);
    res.status(500).json({ error: 'Failed to add XP' });
  }
});

/**
 * GET /auth/users
 * Get all users (admin/instructor only)
 */
router.get('/users', verifyToken, requireRole('admin', 'instructor'), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const query = (req.query as Record<string, string>) || {};
    const role = query.role || null;
    const users = await getAllUsers(role);
    res.json(users);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Get users error:', message);
    res.status(500).json({ error: 'Failed to get users' });
  }
});

/**
 * POST /auth/verify
 * Verify token without creating profile
 */
router.post('/verify', verifyToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const profile = await getUserProfile(req.user!.uid);
    res.json({ 
      valid: true, 
      user: req.user,
      profile: profile || null,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: 'Verification failed' });
  }
});

/**
 * PUT /auth/users/:uid/role
 * Update user role (admin only)
 */
router.put('/users/:uid/role', verifyToken, requireRole('admin'), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const params = (req.params as Record<string, string>) || {};
    const body = (req.body as Record<string, unknown>) || {};
    const uid = params.uid;
    const role = body.role;
    
    if (!['student', 'instructor', 'admin'].includes(role as string)) {
      res.status(400).json({ error: 'Invalid role' });
      return;
    }

    const profile = await updateUserProfile(uid, { role: role as string });
    res.json(profile);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Update user role error:', message);
    res.status(500).json({ error: 'Failed to update user role' });
  }
});

export default router;
