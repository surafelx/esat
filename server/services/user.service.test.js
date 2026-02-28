// Mock Firebase
const mockDoc = jest.fn();
const mockSet = jest.fn();
const mockGet = jest.fn();
const mockUpdate = jest.fn();
const mockCollection = jest.fn(() => ({
  doc: mockDoc,
  where: jest.fn(() => ({
    get: mockGet,
  })),
  get: mockGet,
}));

jest.mock('../config/firebase', () => ({
  db: {
    collection: mockCollection,
  },
}));

const { createUserProfile, getUserProfile, updateUserProfile, addXP } = require('./user.service');

describe('User Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createUserProfile', () => {
    it('should create a new user with default values', async () => {
      mockDoc.mockReturnValue({
        set: mockSet,
        get: mockGet,
      });

      const result = await createUserProfile('uid-123', {
        email: 'test@example.com',
        role: 'student',
      });

      expect(mockDoc).toHaveBeenCalledWith('users', 'uid-123');
      expect(mockSet).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'test@example.com',
          role: 'student',
          xp: 0,
          level: 1,
          streak: 0,
        }),
        { merge: true }
      );
    });

    it('should use default role if not provided', async () => {
      mockDoc.mockReturnValue({
        set: mockSet,
      });

      await createUserProfile('uid-123', {
        email: 'test@example.com',
      });

      expect(mockSet).toHaveBeenCalledWith(
        expect.objectContaining({
          role: 'student',
        }),
        { merge: true }
      );
    });
  });

  describe('getUserProfile', () => {
    it('should return user data if exists', async () => {
      const mockUserData = { email: 'test@example.com', role: 'student', xp: 100 };
      mockDoc.mockReturnValue({
        get: mockGet,
      });
      mockGet.mockResolvedValue({
        exists: true,
        data: () => mockUserData,
      });

      const result = await getUserProfile('uid-123');

      expect(result).toEqual({ id: 'uid-123', ...mockUserData });
    });

    it('should return null if user does not exist', async () => {
      mockDoc.mockReturnValue({
        get: mockGet,
      });
      mockGet.mockResolvedValue({
        exists: false,
      });

      const result = await getUserProfile('uid-123');

      expect(result).toBeNull();
    });
  });

  describe('updateUserProfile', () => {
    it('should update user profile and return new data', async () => {
      const updatedData = { role: 'instructor', xp: 200 };
      mockDoc.mockReturnValue({
        update: mockUpdate,
        get: mockGet,
      });
      mockUpdate.mockResolvedValue();
      mockGet.mockResolvedValue({
        exists: true,
        data: () => ({ email: 'test@example.com', ...updatedData }),
      });

      const result = await updateUserProfile('uid-123', updatedData);

      expect(mockUpdate).toHaveBeenCalledWith({
        ...updatedData,
        updatedAt: expect.any(String),
      });
    });
  });

  describe('addXP', () => {
    it('should add XP and level up', async () => {
      mockDoc.mockReturnValue({
        get: mockGet,
        update: mockUpdate,
      });
      mockGet
        .mockResolvedValueOnce({
          exists: true,
          data: () => ({ xp: 400, level: 1 }),
        })
        .mockResolvedValueOnce({
          exists: true,
          data: () => ({ xp: 450, level: 1 }),
        });
      mockUpdate.mockResolvedValue();

      const result = await addXP('uid-123', 50);

      expect(result).toEqual({ xp: 450, level: 1 });
    });

    it('should level up when XP crosses threshold', async () => {
      mockDoc.mockReturnValue({
        get: mockGet,
        update: mockUpdate,
      });
      mockGet
        .mockResolvedValueOnce({
          exists: true,
          data: () => ({ xp: 450, level: 1 }),
        })
        .mockResolvedValueOnce({
          exists: true,
          data: () => ({ xp: 550, level: 2 }),
        });
      mockUpdate.mockResolvedValue();

      const result = await addXP('uid-123', 100);

      expect(result.level).toBe(2);
    });

    it('should return null if user does not exist', async () => {
      mockDoc.mockReturnValue({
        get: mockGet,
      });
      mockGet.mockResolvedValue({
        exists: false,
      });

      const result = await addXP('uid-123', 50);

      expect(result).toBeNull();
    });
  });
});
