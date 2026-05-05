export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Movie {
  _id: string;
  title: string;
  genres: string[];
  year: number;
  director: string;
  poster: string;
  plot: string;
  runtime: number;
  rating: number;
}

export interface Rating {
  _id: string;
  userId: string;
  movieId: Movie;
  score: number;
  createdAt: string;
}

export interface WatchlistItem {
  _id: string;
  userId: string;
  movieId: Movie;
  addedAt: string;
}

export interface WatchedItem {
  _id: string;
  userId: string;
  movieId: Movie;
  watchedAt: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}