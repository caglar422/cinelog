import { Request, Response } from 'express';
import Movie from '../models/Movie';

export const getAllMovies = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = typeof req.query.search === 'string' ? req.query.search : '';

    const searchQuery = search 
      ? { title: { $regex: search, $options: 'i' } }
      : {};

    const movies = await Movie.find(searchQuery)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ rating: -1 });

    const total = await Movie.countDocuments(searchQuery);

    res.json({
      movies,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalMovies: total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
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