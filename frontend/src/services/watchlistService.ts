import api from './api';
import type { WatchlistItem } from '../types';

export const watchlistService = {
  getWatchlist: async (): Promise<WatchlistItem[]> => {
    const response = await api.get('/watchlist');
    return response.data;
  },

  addToWatchlist: async (movieId: string) => {
    const response = await api.post('/watchlist', { movieId });
    return response.data;
  },

  removeFromWatchlist: async (id: string) => {
    const response = await api.delete(`/watchlist/${id}`);
    return response.data;
  }
};