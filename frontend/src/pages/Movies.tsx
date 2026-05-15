import { useState, useEffect } from 'react';
import { movieService } from '../services/movieService';
import { watchlistService } from '../services/watchlistService';
import { watchedService } from '../services/watchedService';
import type { Movie } from '../types';
import Navbar from '../components/Navbar';
import { ratingService } from '../services/ratingService';
import StarRating from '../components/StarRating';

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [userRatings, setUserRatings] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await movieService.getAllMovies(1, 20, search);
        setMovies(data.movies);
        
        // Load user ratings
        const ratings = await ratingService.getUserRatings();
        const ratingsMap: { [key: string]: number } = {};
        ratings.forEach((rating) => {
          if (rating.movieId && typeof rating.movieId === 'object' && '_id' in rating.movieId) {
            ratingsMap[rating.movieId._id] = rating.score;
          }
        });
        setUserRatings(ratingsMap);
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

  const handleRate = async (movieId: string, score: number) => {
    try {
      await ratingService.addRating(movieId, score);
      setUserRatings({ ...userRatings, [movieId]: score });
      alert(`Rated ${score}/10!`);
    } catch (error) {
      alert('Failed to rate movie');
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '50px', color: '#fff', fontSize: '20px' }}>Loading...</div>;

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
        <h1 style={{ 
          fontSize: '42px',
          marginBottom: '30px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Discover Movies
        </h1>
        
        <form onSubmit={handleSearch} style={{ marginBottom: '40px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ 
              padding: '15px 20px', 
              fontSize: '16px', 
              width: '400px',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              color: '#fff',
              outline: 'none'
            }}
          />
          <button type="submit" style={{ 
            padding: '15px 30px', 
            fontSize: '16px',
            borderRadius: '10px',
            border: 'none',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            Search
          </button>
        </form>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
          gap: '30px' 
        }}>
          {movies.map((movie) => (
            <div 
              key={movie._id} 
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: '15px',
                overflow: 'hidden',
                transition: 'all 0.3s',
                cursor: 'pointer',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <img 
                src={movie.image_url} 
                alt={movie.title} 
                style={{ 
                  width: '100%', 
                  height: '330px',
                  objectFit: 'cover'
                }} 
              />
              <div style={{ padding: '15px' }}>
                <h3 style={{ 
                  fontSize: '18px', 
                  marginBottom: '8px',
                  color: '#fff',
                  fontWeight: 'bold'
                }}>
                  {movie.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#bbb', marginBottom: '8px' }}>
                  {movie.year} • {movie.director}
                </p>
                <p style={{ fontSize: '16px', color: '#ffd700', marginBottom: '8px', fontWeight: 'bold' }}>
                  ⭐ {movie.rating}/10
                </p>
                <p style={{ fontSize: '12px', color: '#888', marginBottom: '15px' }}>
                  {movie.genres.join(', ')}
                </p>

                <StarRating 
                  onRate={(score) => handleRate(movie._id, score)}
                  currentRating={userRatings[movie._id] || 0}
                />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button 
                    onClick={() => handleAddToWatchlist(movie._id)}
                    style={{
                      padding: '10px',
                      backgroundColor: 'rgba(102, 126, 234, 0.2)',
                      color: '#667eea',
                      border: '1px solid #667eea',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: 'bold',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#667eea';
                      e.currentTarget.style.color = '#fff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(102, 126, 234, 0.2)';
                      e.currentTarget.style.color = '#667eea';
                    }}
                  >
                    + Watchlist
                  </button>
                  <button 
                    onClick={() => handleMarkAsWatched(movie._id)}
                    style={{
                      padding: '10px',
                      backgroundColor: 'rgba(40, 167, 69, 0.2)',
                      color: '#28a745',
                      border: '1px solid #28a745',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: 'bold',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#28a745';
                      e.currentTarget.style.color = '#fff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(40, 167, 69, 0.2)';
                      e.currentTarget.style.color = '#28a745';
                    }}
                  >
                    ✓ Watched
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Movies;