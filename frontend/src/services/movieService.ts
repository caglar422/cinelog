import api from './api';
import type { Movie } from '../types';

export const movieService = {
  getAllMovies: async (page = 1, limit = 10, search = '') => {
    const response = await api.get('/movies', {
      params: { page, limit, search }
    });
    return response.data;
  },

  getMovieById: async (id: string): Promise<Movie> => {
    const response = await api.get(`/movies/${id}`);
    return response.data;
  },

  searchMovies: async (query: string): Promise<Movie[]> => {
    const response = await api.get('/movies/search', {
      params: { q: query }
    });
    return response.data;
  }
};