import { db } from '../config/firebase.js';
import { UserProfile } from '../types.js';

interface CreateUserData {
  email: string;
  role?: string;
  xp?: number;
  level?: number;
  cohortId?: string;
}

interface UpdateUserData {
  displayName?: string;
  role?: string;
  cohortId?: string;
  xp?: number;
  level?: number;
}

export async function createUserProfile(uid: string, data: CreateUserData): Promise<UserProfile> {
  const userData: UserProfile = {
    uid,
    email: data.email || '',
    role: (data.role as UserProfile['role']) || 'student',
    xp: data.xp || 0,
    level: data.level || 1,
    streak: 0,
    completedLessons: [],
    completedAssignments: [],
    cohortId: data.cohortId || null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await db.collection('users').doc(uid).set(userData);
  return userData;
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snap = await db.collection('users').doc(uid).get();
  
  if (!snap.exists) {
    return null;
  }
  
  return { uid: snap.id, ...snap.data() } as UserProfile;
}

export async function updateUserProfile(uid: string, data: UpdateUserData): Promise<UserProfile | null> {
  const updateData = {
    ...data,
    updatedAt: new Date().toISOString(),
  };
  
  await db.collection('users').doc(uid).update(updateData);
  return getUserProfile(uid);
}

export async function addXP(uid: string, xpAmount: number): Promise<UserProfile | null> {
  const user = await getUserProfile(uid);
  if (!user) return null;
  
  const newXP = (user.xp || 0) + xpAmount;
  const newLevel = Math.floor(newXP / 500) + 1;
  
  return updateUserProfile(uid, { xp: newXP, level: newLevel });
}

export async function getAllUsers(role?: string | null): Promise<UserProfile[]> {
  let query = db.collection('users');
  
  if (role) {
    query = query.where('role', '==', role) as any;
  }
  
  const snapshot = await query.get();
  return snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() } as UserProfile));
}

export async function getUserByEmail(email: string): Promise<UserProfile | null> {
  const snapshot = await db.collection('users')
    .where('email', '==', email)
    .limit(1)
    .get();
  
  if (snapshot.empty) {
    return null;
  }
  
  const doc = snapshot.docs[0];
  return { uid: doc.id, ...doc.data() } as UserProfile;
}
