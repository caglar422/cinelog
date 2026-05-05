import api from './api';
import type { WatchedItem } from '../types';

export const watchedService = {
  getWatchedMovies: async (): Promise<WatchedItem[]> => {
    const response = await api.get('/watched');
    return response.data;
  },

  markAsWatched: async (movieId: string) => {
    const response = await api.post('/watched', { movieId });
    return response.data;
  },

  removeFromWatched: async (id: string) => {
    const response = await api.delete(`/watched/${id}`);
    return response.data;
  }
};