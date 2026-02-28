const { verifyToken, optionalAuth, requireRole } = require('./auth.middleware');

// Mock Firebase auth
jest.mock('../config/firebase', () => ({
  auth: {
    verifyIdToken: jest.fn(),
  },
}));

const { auth } = require('../config/firebase');

describe('Auth Middleware', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = { headers: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
    jest.clearAllMocks();
  });

  describe('verifyToken', () => {
    it('should return 401 if no authorization header', async () => {
      await verifyToken(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Unauthorized: No token provided' });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return 401 if token does not start with Bearer', async () => {
      mockReq.headers.authorization = 'Basic some-token';

      await verifyToken(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should verify valid token and call next', async () => {
      mockReq.headers.authorization = 'Bearer valid-token';
      auth.verifyIdToken.mockResolvedValue({
        uid: 'user-123',
        email: 'test@example.com',
        email_verified: true,
      });

      await verifyToken(mockReq, mockRes, mockNext);

      expect(auth.verifyIdToken).toHaveBeenCalledWith('valid-token');
      expect(mockReq.user).toEqual({
        uid: 'user-123',
        email: 'test@example.com',
        emailVerified: true,
      });
      expect(mockNext).toHaveBeenCalled();
    });

    it('should return 401 if token is invalid', async () => {
      mockReq.headers.authorization = 'Bearer invalid-token';
      auth.verifyIdToken.mockRejectedValue(new Error('Invalid token'));

      await verifyToken(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Unauthorized: Invalid token' });
    });
  });

  describe('optionalAuth', () => {
    it('should call next without token', async () => {
      await optionalAuth(mockReq, mockRes, mockNext);

      expect(mockReq.user).toBeUndefined();
      expect(mockNext).toHaveBeenCalled();
    });

    it('should attach user if valid token provided', async () => {
      mockReq.headers.authorization = 'Bearer valid-token';
      auth.verifyIdToken.mockResolvedValue({
        uid: 'user-123',
        email: 'test@example.com',
      });

      await optionalAuth(mockReq, mockRes, mockNext);

      expect(mockReq.user).toEqual({
        uid: 'user-123',
        email: 'test@example.com',
      });
      expect(mockNext).toHaveBeenCalled();
    });
  });
});
