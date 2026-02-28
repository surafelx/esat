const { db } = require('../config/firebase');

/**
 * Create or update user profile in Firestore
 * @param {string} uid - Firebase UID
 * @param {object} data - User data (email, role, etc.)
 */
async function createUserProfile(uid, data = {}) {
  const userRef = db.collection('users').doc(uid);
  
  const userData = {
    email: data.email || '',
    role: data.role || 'student', // student, instructor, admin
    xp: data.xp || 0,
    level: data.level || 1,
    streak: data.streak || 0,
    completedLessons: data.completedLessons || [],
    completedAssignments: data.completedAssignments || [],
    cohortId: data.cohorId || null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await userRef.set(userData, { merge: true });
  return userData;
}

/**
 * Get user profile by UID
 * @param {string} uid - Firebase UID
 */
async function getUserProfile(uid) {
  const userRef = db.collection('users').doc(uid);
  const snap = await userRef.get();
  
  if (!snap.exists) {
    return null;
  }
  
  return { id: snap.id, ...snap.data() };
}

/**
 * Update user profile
 * @param {string} uid - Firebase UID
 * @param {object} data - Fields to update
 */
async function updateUserProfile(uid, data) {
  const userRef = db.collection('users').doc(uid);
  const updateData = {
    ...data,
    updatedAt: new Date().toISOString(),
  };
  
  await userRef.update(updateData);
  return getUserProfile(uid);
}

/**
 * Add XP to user
 * @param {string} uid - Firebase UID
 * @param {number} xpAmount - Amount of XP to add
 */
async function addXP(uid, xpAmount) {
  const user = await getUserProfile(uid);
  if (!user) return null;
  
  const newXP = (user.xp || 0) + xpAmount;
  const newLevel = Math.floor(newXP / 500) + 1; // Level up every 500 XP
  
  return updateUserProfile(uid, { xp: newXP, level: newLevel });
}

/**
 * Get all users (admin only)
 * @param {string} role - Optional role filter
 */
async function getAllUsers(role = null) {
  let query = db.collection('users');
  
  if (role) {
    query = query.where('role', '==', role);
  }
  
  const snapshot = await query.get();
  return snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
}

module.exports = {
  createUserProfile,
  getUserProfile,
  updateUserProfile,
  addXP,
  getAllUsers,
};
