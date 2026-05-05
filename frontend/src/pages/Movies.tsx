import { useState, useEffect } from 'react';
import { movieService } from '../services/movieService';
import type { Movie } from '../types';
import Navbar from '../components/Navbar';
import { watchlistService } from '../services/watchlistService';
import { watchedService } from '../services/watchedService';

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await movieService.getAllMovies(1, 20, search);
        setMovies(data.movies);
      } catch (error) {
        console.error('Failed to load movies', error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [search]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const data = await movieService.getAllMovies(1, 20, search);
    setMovies(data.movies);
    setLoading(false);
  };

  const handleAddToWatchlist = async (movieId: string) => {
    try {
      await watchlistService.addToWatchlist(movieId);
      alert('Added to watchlist!');
    } catch (error) {
      alert('Failed to add to watchlist');
    }
  };

  const handleMarkAsWatched = async (movieId: string) => {
    try {
      await watchedService.markAsWatched(movieId);
      alert('Marked as watched!');
    } catch (error) {
      alert('Failed to mark as watched');
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <h1>Movies</h1>

        <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: '10px',
              fontSize: '16px',
              width: '300px',
              marginRight: '10px'
            }}
          />
          <button type="submit" style={{ padding: '10px 20px', fontSize: '16px' }}>
            Search
          </button>
        </form>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '20px'
          }}
        >
          {movies.map((movie) => (
            <div
              key={movie._id}
              style={{
                border: '1px solid #ddd',
                padding: '10px',
                borderRadius: '8px'
              }}
            >
              <img
                src={movie.poster}
                alt={movie.title}
                style={{ width: '100%', borderRadius: '4px' }}
              />

              <h3 style={{ fontSize: '16px', margin: '10px 0' }}>
                {movie.title}
              </h3>

              <p style={{ fontSize: '14px', color: '#666' }}>
                {movie.year} • {movie.director}
              </p>

              <p style={{ fontSize: '14px' }}>⭐ {movie.rating}/10</p>

              <p style={{ fontSize: '12px', color: '#888' }}>
                {movie.genres.join(', ')}
              </p>

              {/* 🔥 EKLENEN BUTONLAR */}
              <div
                style={{
                  marginTop: '10px',
                  display: 'flex',
                  gap: '5px',
                  flexDirection: 'column'
                }}
              >
                <button
                  onClick={() => handleAddToWatchlist(movie._id)}
                  style={{
                    padding: '8px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  + Watchlist
                </button>

                <button
                  onClick={() => handleMarkAsWatched(movie._id)}
                  style={{
                    padding: '8px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  ✓ Watched
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Movies;