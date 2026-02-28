const { auth } = require('../config/firebase');

/**
 * Verify Firebase ID token from Authorization header
 * Expects: Authorization: Bearer <idToken>
 */
async function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const idToken = authHeader.split('Bearer ')[1];
    
    // Verify the ID token
    const decodedToken = await auth.verifyIdToken(idToken);
    
    // Attach user to request
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      emailVerified: decodedToken.email_verified,
    };
    
    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
}

/**
 * Optional auth - doesn't fail if no token, but attaches user if valid
 */
async function optionalAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const idToken = authHeader.split('Bearer ')[1];
      const decodedToken = await auth.verifyIdToken(idToken);
      req.user = {
        uid: decodedToken.uid,
        email: decodedToken.email,
      };
    }
  } catch (error) {
    // Ignore errors for optional auth
  }
  
  next();
}

/**
 * Require specific role(s)
 */
function requireRole(...roles) {
  return async (req, res, next) => {
    try {
      const { db } = require('../config/firebase');
      const userRef = db.collection('users').doc(req.user.uid);
      const userSnap = await userRef.get();
      
      if (!userSnap.exists) {
        return res.status(403).json({ error: 'Forbidden: User profile not found' });
      }
      
      const userData = userSnap.data();
      
      if (!roles.includes(userData.role)) {
        return res.status(403).json({ 
          error: 'Forbidden: Insufficient permissions',
          required: roles,
          current: userData.role 
        });
      }
      
      req.userProfile = userData;
      next();
    } catch (error) {
      console.error('Role check error:', error.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
}

module.exports = {
  verifyToken,
  optionalAuth,
  requireRole,
};
