import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../services/api';

export default function AdminPanel() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [director, setDirector] = useState('');
  const [rating, setRating] = useState('');
  const [image_url, setImage_url] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleAddMovie = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await api.post('/movies', {
        title,
        year: parseInt(year),
        genre,
        director,
        rating: parseFloat(rating),
        image_url,
        description
      });

      setMessage('✅ The movie is added!');
      setTitle('');
      setYear('');
      setGenre('');
      setDirector('');
      setRating('');
      setImage_url('');
      setDescription('');
    } catch (error) {
      setMessage('❌ The movie is not added!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ 
          fontSize: '36px',
          marginBottom: '30px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Add New Movie
        </h1>

        <form onSubmit={handleAddMovie} style={{
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          padding: '30px',
          borderRadius: '15px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #667eea', backgroundColor: '#1a1a3e', color: '#fff' }}
          />

          <input
            type="number"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
            style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #667eea', backgroundColor: '#1a1a3e', color: '#fff' }}
          />

          <input
            type="text"
            placeholder="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
            style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #667eea', backgroundColor: '#1a1a3e', color: '#fff' }}
          />

          <input
            type="text"
            placeholder="Director"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            required
            style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #667eea', backgroundColor: '#1a1a3e', color: '#fff' }}
          />

          <input
            type="number"
            placeholder="Rating (0-10)"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            step="0.1"
            min="0"
            max="10"
            style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #667eea', backgroundColor: '#1a1a3e', color: '#fff' }}
          />

          <input
            type="url"
            placeholder="Image URL"
            value={image_url}
            onChange={(e) => setImage_url(e.target.value)}
            required
            style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #667eea', backgroundColor: '#1a1a3e', color: '#fff' }}
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #667eea', backgroundColor: '#1a1a3e', color: '#fff', minHeight: '100px' }}
          />

          <button 
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#fff',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              fontSize: '16px'
            }}
          >
            {loading ? 'Adding...' : 'Add Movie'}
          </button>

          {message && (
            <p style={{ marginTop: '15px', textAlign: 'center', color: message.includes('✅') ? '#28a745' : '#dc3545', fontSize: '14px' }}>
              {message}
            </p>
          )}
        </form>
      </div>
    </>
  );
}