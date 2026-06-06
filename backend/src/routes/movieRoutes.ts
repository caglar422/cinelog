import express from 'express';
import { getAllMovies, getMovieById, createMovie } from '../controllers/movieController';
import { authMiddleware } from '../middleware/auth';
import { adminMiddleware } from '../middleware/adminAuth';

const router = express.Router();

router.get('/', getAllMovies);
router.get('/:id', getMovieById);
router.post('/', authMiddleware, adminMiddleware, createMovie);  // ← EKLE

export default router;