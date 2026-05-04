import { Response } from 'express';
import Watched from '../models/Watched';
import { AuthRequest } from '../middleware/auth';

export const markAsWatched = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { movieId } = req.body;

    if (!movieId) {
      res.status(400).json({ message: 'Movie ID is required' });
      return;
    }

    // Check if already marked as watched
    const existing = await Watched.findOne({
      userId: req.userId,
      movieId
    });

    if (existing) {
      res.status(400).json({ message: 'Movie already marked as watched' });
      return;
    }

    const watchedItem = await Watched.create({
      userId: req.userId,
      movieId
    });

    res.status(201).json({ message: 'Marked as watched', watchedItem });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getWatchedMovies = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const watched = await Watched.find({ userId: req.userId })
      .populate('movieId')
      .sort({ watchedAt: -1 });

    res.json(watched);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const removeFromWatched = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const watchedItem = await Watched.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!watchedItem) {
      res.status(404).json({ message: 'Watched item not found' });
      return;
    }

    res.json({ message: 'Removed from watched' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};