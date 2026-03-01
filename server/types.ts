// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyObject = Record<string, any>;

export interface UserProfile {
  uid: string;
  email: string;
  role: 'student' | 'instructor' | 'admin';
  xp: number;
  level: number;
  streak: number;
  completedLessons: string[];
  completedAssignments: string[];
  cohortId: string | null;
  createdAt: string;
  updatedAt: string;
  displayName?: string;
}

export interface AuthUser {
  uid: string;
  email: string;
  emailVerified: boolean;
}

export type Role = 'student' | 'instructor' | 'admin';
