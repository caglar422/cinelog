import api from './api';
import type { Rating } from '../types';

export const ratingService = {
  getUserRatings: async (): Promise<Rating[]> => {
    const response = await api.get('/ratings');
    return response.data;
  },

  addRating: async (movieId: string, score: number) => {
    const response = await api.post('/ratings', { movieId, score });
    return response.data;
  },

  deleteRating: async (id: string) => {
    const response = await api.delete(`/ratings/${id}`);
    return response.data;
  }
};