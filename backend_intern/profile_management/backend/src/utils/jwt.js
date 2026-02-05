import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  return jwt.sign(
    { userId: user.id, role: user.role, tokenVersion: user.token_version || 1 },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};