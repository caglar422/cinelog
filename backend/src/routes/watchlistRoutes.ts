import express from 'express';
import { addToWatchlist, getWatchlist, removeFromWatchlist } from '../controllers/watchlistController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.post('/', authMiddleware, addToWatchlist);
router.get('/', authMiddleware, getWatchlist);
router.delete('/:id', authMiddleware, removeFromWatchlist);

export default router;