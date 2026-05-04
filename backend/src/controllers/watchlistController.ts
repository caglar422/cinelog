import { Response } from 'express';
import Watchlist from '../models/Watchlist';
import { AuthRequest } from '../middleware/auth';

export const addToWatchlist = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { movieId } = req.body;

    if (!movieId) {
      res.status(400).json({ message: 'Movie ID is required' });
      return;
    }

    // Check if already in watchlist
    const existing = await Watchlist.findOne({
      userId: req.userId,
      movieId
    });

    if (existing) {
      res.status(400).json({ message: 'Movie already in watchlist' });
      return;
    }

    const watchlistItem = await Watchlist.create({
      userId: req.userId,
      movieId
    });

    res.status(201).json({ message: 'Added to watchlist', watchlistItem });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getWatchlist = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const watchlist = await Watchlist.find({ userId: req.userId })
      .populate('movieId')
      .sort({ addedAt: -1 });

    res.json(watchlist);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const removeFromWatchlist = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const watchlistItem = await Watchlist.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!watchlistItem) {
      res.status(404).json({ message: 'Watchlist item not found' });
      return;
    }

    res.json({ message: 'Removed from watchlist' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};