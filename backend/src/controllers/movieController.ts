import { Request, Response } from 'express';
import Movie from '../models/Movie';

export const getAllMovies = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const search = (req.query.search as string) || '';

    const skip = (page - 1) * limit;

    const query = search ? { title: { $regex: search, $options: 'i' } } : {};
    const movies = await Movie.find(query).skip(skip).limit(limit);
    const total = await Movie.countDocuments(query);

    res.json({
      movies,
      total,
      page,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch movies', error });
  }
};

export const getMovieById = async (req: Request, res: Response): Promise<void> => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      res.status(404).json({ message: 'Movie not found' });
      return;
    }

    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const searchMovies = async (req: Request, res: Response): Promise<void> => {
  try {
    const { q } = req.query;

    if (!q || typeof q !== 'string') {
      res.status(400).json({ message: 'Search query is required' });
      return;
    }

    const movies = await Movie.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { director: { $regex: q, $options: 'i' } },
        { genres: { $elemMatch: { $regex: q, $options: 'i' } } }
      ]
    }).limit(20);

    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};