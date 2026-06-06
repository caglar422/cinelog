import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).userId; // JWT'den geliyor
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