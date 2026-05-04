import express from 'express';
import { addRating, getUserRatings, deleteRating } from '../controllers/ratingController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.post('/', authMiddleware, addRating);
router.get('/', authMiddleware, getUserRatings);
router.delete('/:id', authMiddleware, deleteRating);

export default router;