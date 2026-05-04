import express from 'express';
import { markAsWatched, getWatchedMovies, removeFromWatched } from '../controllers/watchedController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.post('/', authMiddleware, markAsWatched);
router.get('/', authMiddleware, getWatchedMovies);
router.delete('/:id', authMiddleware, removeFromWatched);

export default router;