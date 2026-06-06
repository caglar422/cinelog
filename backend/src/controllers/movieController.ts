import { Request, Response } from 'express';
import Movie from '../models/Movie';

export const getAllMovies = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const search = (req.query.search as string) || '';

    const genre = (req.query.genre as string) || '';
    const year = (req.query.year as string) || '';
    const sort = (req.query.sort as string) || 'rating';

    const skip = (page - 1) * limit;

    const query: any = {};

    
    const sortObj: any = {};
    if (sort === 'rating') sortObj.rating = -1;
    else if (sort === 'title') sortObj.title = 1;
    else if (sort === 'year') sortObj.year = -1;
    

    if (search) query.title = { $regex: search, $options: 'i' };
    if (genre) query.genre = genre;
    if (year) query.year = parseInt(year);

    const movies = await Movie.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(limit);
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

export const createMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, year, genre, director, rating, image_url, description } = req.body;

    // Validation
    if (!title || !year || !genre || !director || !image_url) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    const newMovie = new Movie({
      title,
      year,
      genre,
      director,
      rating: rating || 0,
      image_url,
      description: description || ''
    });

    await newMovie.save();
    res.status(201).json({ message: 'Movie created successfully', movie: newMovie });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create movie', error });
  }
};