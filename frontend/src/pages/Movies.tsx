import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { watchlistService } from '../services/watchlistService';
import { watchedService } from '../services/watchedService';
import type { Movie } from '../types';
import Navbar from '../components/Navbar';
import { ratingService } from '../services/ratingService';
import StarRating from '../components/StarRating';
import api from '../services/api';

const Movies = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [userRatings, setUserRatings] = useState<{ [key: string]: number }>({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [sort, setSort] = useState('rating');

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await api.get('/movies', {
          params: { page, search, genre, year, sort, limit: 5 }
        });
        setMovies(data.data.movies);
        setTotalPages(data.data.pages);
        
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
  }, [page, search, genre, year, sort]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setLoading(true);
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
        
        <form onSubmit={handleSearch} style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ 
              padding: '15px 20px', 
              fontSize: '16px', 
              width: '300px',
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

        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', marginBottom: '40px' }}>
          <select 
            value={genre}
            onChange={(e) => { setGenre(e.target.value); setPage(1); }}
            style={{ 
              padding: '12px 15px', 
              borderRadius: '8px', 
              border: '2px solid #667eea', 
              backgroundColor: '#1a1a3e',
              color: '#fff', 
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            <option value="">All Genres</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Action">Action</option>
            <option value="Drama">Drama</option>
            <option value="Thriller">Thriller</option>
            <option value="Crime">Crime</option>
            <option value="Historical">Historical</option>
          </select>

          <select 
            value={year}
            onChange={(e) => { setYear(e.target.value); setPage(1); }}
            style={{ 
              padding: '12px 15px', 
              borderRadius: '8px', 
              border: '2px solid #667eea', 
              backgroundColor: '#1a1a3e',
              color: '#fff', 
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            <option value="">All Years</option>
            <option value="1999">1999</option>
            <option value="2000">2000</option>
            <option value="2008">2008</option>
            <option value="2010">2010</option>
            <option value="2014">2014</option>
            <option value="2019">2019</option>
            <option value="2021">2021</option>
          </select>

          <select 
            value={sort}
            onChange={(e) => { setSort(e.target.value); setPage(1); }}
            style={{ 
              padding: '12px 15px', 
              borderRadius: '8px', 
              border: '2px solid #667eea', 
              backgroundColor: '#1a1a3e',
              color: '#fff', 
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            <option value="rating">Rating (High to Low)</option>
            <option value="title">Title (A to Z)</option>
            <option value="year">Year (Newest)</option>
          </select>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
          gap: '30px' 
        }}>
          {movies.map((movie) => (
            <div 
              key={movie._id} 
              onClick={() => navigate(`/movie/${movie._id}`)}
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
                  {Array.isArray(movie.genres) ? movie.genres.join(', ') : movie.genre || 'N/A'}
                </p>

                <StarRating 
                  onRate={(score) => handleRate(movie._id, score)}
                  currentRating={userRatings[movie._id] || 0}
                />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToWatchlist(movie._id);
                    }}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMarkAsWatched(movie._id);
                    }}
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

        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '40px', marginBottom: '40px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: page === 1 ? '#666' : '#667eea', color: '#fff', cursor: page === 1 ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}
          >
            ← Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              style={{ padding: '10px 15px', borderRadius: '8px', border: page === p ? '2px solid #667eea' : '1px solid #667eea', background: page === p ? '#667eea' : 'transparent', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}
            >
              {p}
            </button>
          ))}

          <button 
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: page === totalPages ? '#666' : '#667eea', color: '#fff', cursor: page === totalPages ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}
          >
            Next →
          </button>
        </div>
      </div>
    </>
  );
};

export default Movies;