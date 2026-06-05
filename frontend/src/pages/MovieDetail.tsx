import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../services/api';
import type { Movie } from '../types';
import '../styles/MovieDetail.css';

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await api.get(`/movies/${id}`);
        setMovie(response.data);
      } catch (err) {
        setError('Failed to load movie');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!movie) return <div className="error">Movie not found</div>;

  return (
    <div className="movie-detail-page">
      <Navbar />

      <div className="detail-container">
        <button
          className="back-btn"
          onClick={() => navigate('/movies')}
        >
          ← Back to Movies
        </button>

        <div className="detail-content">
          <img
            src={movie.image_url}
            alt={movie.title}
            className="detail-poster"
          />

          <div className="detail-info">
            <h1>{movie.title}</h1>

            <p className="year">
              Year: {movie.year}
            </p>

            <p className="director">
              Director: {movie.director}
            </p>

            <p className="genre">
              Genre: {movie.genres?.join(', ') || 'N/A'}
            </p>

            <p className="rating">
              Rating: ⭐ {movie.rating}/10
            </p>

            <p className="description">
              {movie.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}