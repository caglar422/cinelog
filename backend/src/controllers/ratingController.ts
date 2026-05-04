import { Response } from 'express';
import Rating from '../models/Rating';
import { AuthRequest } from '../middleware/auth';

export const addRating = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { movieId, score } = req.body;

    if (!movieId || !score) {
      res.status(400).json({ message: 'Movie ID and score are required' });
      return;
    }

    if (score < 1 || score > 10) {
      res.status(400).json({ message: 'Score must be between 1 and 10' });
      return;
    }

    // Check if rating already exists
    const existingRating = await Rating.findOne({
      userId: req.userId,
      movieId
    });

    if (existingRating) {
      // Update existing rating
      existingRating.score = score;
      await existingRating.save();
      res.json({ message: 'Rating updated', rating: existingRating });
      return;
    }

    // Create new rating
    const rating = await Rating.create({
      userId: req.userId,
      movieId,
      score
    });

    res.status(201).json({ message: 'Rating added', rating });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getUserRatings = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const ratings = await Rating.find({ userId: req.userId })
      .populate('movieId')
      .sort({ createdAt: -1 });

    res.json(ratings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const deleteRating = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const rating = await Rating.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!rating) {
      res.status(404).json({ message: 'Rating not found' });
      return;
    }

    res.json({ message: 'Rating deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};