import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { AuthRequest } from './auth';

export const adminMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ message: 'No user ID found' });
      return;
    }

    const user = await User.findById(userId);

    if (!user || !user.isAdmin) {
      res.status(403).json({ message: 'Admin access required' });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Admin check failed', error });
  }
};