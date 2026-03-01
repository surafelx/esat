import { Response, NextFunction } from 'express';
import { auth, db } from '../config/firebase.js';

interface AuthUser {
  uid: string;
  email: string;
  emailVerified: boolean;
}

interface UserProfile {
  role: string;
  [key: string]: unknown;
}

interface AuthRequest {
  user?: AuthUser;
  userProfile?: UserProfile;
  headers: Record<string, string | string[] | undefined>;
}

export async function verifyToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !Array.isArray(authHeader) && !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Unauthorized: No token provided' });
      return;
    }

    const token = Array.isArray(authHeader) ? authHeader[0] : authHeader.split('Bearer ')[1];
    const decodedToken = await auth.verifyIdToken(token);
    
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email || '',
      emailVerified: decodedToken.email_verified || false,
    };
    
    next();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Token verification error:', message);
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
}

export async function optionalAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && (Array.isArray(authHeader) || authHeader.startsWith('Bearer '))) {
      const token = Array.isArray(authHeader) ? authHeader[0] : authHeader.split('Bearer ')[1];
      const decodedToken = await auth.verifyIdToken(token);
      req.user = {
        uid: decodedToken.uid,
        email: decodedToken.email || '',
        emailVerified: decodedToken.email_verified || false,
      };
    }
  } catch (error) {
    // Ignore errors for optional auth
  }
  
  next();
}

export function requireRole(...roles: string[]) {
  return async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userUid = req.user?.uid;
      if (!userUid) {
        res.status(403).json({ error: 'Forbidden: No user' });
        return;
      }

      const userRef = db.collection('users').doc(userUid);
      const userSnap = await userRef.get();
      
      if (!userSnap.exists) {
        res.status(403).json({ error: 'Forbidden: User profile not found' });
        return;
      }
      
      const userData = userSnap.data() as UserProfile;
      
      if (!userData || !roles.includes(userData.role)) {
        res.status(403).json({ 
          error: 'Forbidden: Insufficient permissions',
          required: roles,
          current: userData?.role 
        });
        return;
      }
      
      req.userProfile = userData;
      next();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.error('Role check error:', message);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}
