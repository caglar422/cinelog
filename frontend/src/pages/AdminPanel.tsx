import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../services/api';
import { authService } from '../services/authService';

interface Movie {
  _id: string;
  title: string;
  year: number;
  genres: string[];
  director: string;
  rating: number;
  image_url: string;
  plot: string;
  runtime: number;
}

const emptyForm = {
  title: '',
  year: '',
  genres: '',
  director: '',
  rating: '',
  image_url: '',
  plot: '',
  runtime: ''
};

export default function AdminPanel() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (!user || !user.isAdmin) {
      navigate('/');
    } else {
      fetchMovies();
    }
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await api.get('/movies?limit=100');
      setMovies(res.data.movies);
    } catch (error) {
      console.error('Failed to fetch movies');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const payload = {
      title: form.title,
      year: parseInt(form.year),
      genres: form.genres.split(',').map(g => g.trim()),
      director: form.director,
      rating: parseFloat(form.rating) || 0,
      image_url: form.image_url,
      plot: form.plot,
      runtime: parseInt(form.runtime)
    };

    try {
      if (editingId) {
        await api.put(`/movies/${editingId}`, payload);
        setMessage('✅ Movie updated successfully!');
      } else {
        await api.post('/movies', payload);
        setMessage('✅ Movie added successfully!');
      }
      setForm(emptyForm);
      setEditingId(null);
      fetchMovies();
    } catch (error) {
      setMessage('❌ Operation failed!');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (movie: Movie) => {
    setEditingId(movie._id);
    setForm({
      title: movie.title,
      year: String(movie.year),
      genres: movie.genres.join(', '),
      director: movie.director,
      rating: String(movie.rating),
      image_url: movie.image_url,
      plot: movie.plot,
      runtime: String(movie.runtime)
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this movie?')) return;
    try {
      await api.delete(`/movies/${id}`);
      setMessage('✅ Movie deleted successfully!');
      fetchMovies();
    } catch (error) {
      setMessage('❌ Failed to delete movie!');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm(emptyForm);
    setMessage('');
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    borderRadius: '8px',
    border: '1px solid #667eea',
    backgroundColor: '#1a1a3e',
    color: '#fff',
    boxSizing: 'border-box' as const
  };

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>

        {/* FORM */}
        <h1 style={{
          fontSize: '32px',
          marginBottom: '30px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          {editingId ? '✏️ Edit Movie' : '🎬 Add New Movie'}
        </h1>

        <form onSubmit={handleSubmit} style={{
          backgroundColor: 'rgba(255,255,255,0.05)',
          padding: '30px',
          borderRadius: '15px',
          border: '1px solid rgba(255,255,255,0.1)',
          marginBottom: '50px'
        }}>
          <input style={inputStyle} type="text" placeholder="Title" value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })} required />

          <input style={inputStyle} type="number" placeholder="Year" value={form.year}
            onChange={e => setForm({ ...form, year: e.target.value })} required />

          <input style={inputStyle} type="text" placeholder="Genres (comma separated: Action, Drama)" value={form.genres}
            onChange={e => setForm({ ...form, genres: e.target.value })} required />

          <input style={inputStyle} type="text" placeholder="Director" value={form.director}
            onChange={e => setForm({ ...form, director: e.target.value })} required />

          <input style={inputStyle} type="number" placeholder="Rating (0-10)" value={form.rating}
            onChange={e => setForm({ ...form, rating: e.target.value })} step="0.1" min="0" max="10" />

          <input style={inputStyle} type="url" placeholder="Image URL" value={form.image_url}
            onChange={e => setForm({ ...form, image_url: e.target.value })} required />

          <input style={inputStyle} type="number" placeholder="Runtime (minutes)" value={form.runtime}
            onChange={e => setForm({ ...form, runtime: e.target.value })} required />

          <textarea style={{ ...inputStyle, minHeight: '100px' }} placeholder="Plot"
            value={form.plot} onChange={e => setForm({ ...form, plot: e.target.value })} required />

          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" disabled={loading} style={{
              flex: 1, padding: '12px', borderRadius: '8px', border: 'none',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#fff', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px'
            }}>
              {loading ? 'Saving...' : editingId ? 'Update Movie' : 'Add Movie'}
            </button>

            {editingId && (
              <button type="button" onClick={handleCancel} style={{
                padding: '12px 20px', borderRadius: '8px', border: '1px solid #667eea',
                background: 'transparent', color: '#fff', cursor: 'pointer', fontSize: '16px'
              }}>
                Cancel
              </button>
            )}
          </div>

          {message && (
            <p style={{ marginTop: '15px', textAlign: 'center', color: message.includes('✅') ? '#28a745' : '#dc3545' }}>
              {message}
            </p>
          )}
        </form>

        {/* MOVIE LIST */}
        <h2 style={{ color: '#fff', marginBottom: '20px' }}>📋 All Movies ({movies.length})</h2>

        {movies.map(movie => (
          <div key={movie._id} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            backgroundColor: 'rgba(255,255,255,0.05)', padding: '15px 20px',
            borderRadius: '10px', marginBottom: '10px',
            border: editingId === movie._id ? '1px solid #667eea' : '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <img src={movie.image_url} alt={movie.title}
                style={{ width: '45px', height: '65px', objectFit: 'cover', borderRadius: '5px' }}
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/45x65'; }} />
              <div>
                <p style={{ color: '#fff', fontWeight: 'bold', margin: 0 }}>{movie.title}</p>
                <p style={{ color: '#aaa', fontSize: '13px', margin: 0 }}>
                  {movie.year} • {movie.director} • ⭐ {movie.rating}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => handleEdit(movie)} style={{
                padding: '8px 16px', borderRadius: '6px', border: 'none',
                background: '#667eea', color: '#fff', cursor: 'pointer', fontWeight: 'bold'
              }}>
                Edit
              </button>
              <button onClick={() => handleDelete(movie._id)} style={{
                padding: '8px 16px', borderRadius: '6px', border: 'none',
                background: '#dc3545', color: '#fff', cursor: 'pointer', fontWeight: 'bold'
              }}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}