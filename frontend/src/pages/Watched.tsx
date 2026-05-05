import { useState, useEffect } from 'react';
import { watchedService } from '../services/watchedService';
import type { WatchedItem } from '../types';
import Navbar from '../components/Navbar';

const Watched = () => {
  const [watched, setWatched] = useState<WatchedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWatched = async () => {
      try {
        const data = await watchedService.getWatchedMovies();
        setWatched(data);
      } catch (error) {
        console.error('Failed to load watched movies', error);
      } finally {
        setLoading(false);
      }
    };

    loadWatched();
  }, []);

  const handleRemove = async (id: string) => {
    try {
      await watchedService.removeFromWatched(id);
      setWatched(watched.filter(item => item._id !== id));
    } catch (error) {
      console.error('Failed to remove from watched', error);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <h1>Watched Movies</h1>
        
        {watched.length === 0 ? (
          <p style={{ textAlign: 'center', marginTop: '50px', fontSize: '18px', color: '#666' }}>
            You haven't watched any movies yet!
          </p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
            {watched.map((item) => (
              <div key={item._id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}>
                <img src={item.movieId.poster} alt={item.movieId.title} style={{ width: '100%', borderRadius: '4px' }} />
                <h3 style={{ fontSize: '16px', margin: '10px 0' }}>{item.movieId.title}</h3>
                <p style={{ fontSize: '14px', color: '#666' }}>{item.movieId.year} • {item.movieId.director}</p>
                <p style={{ fontSize: '14px' }}>⭐ {item.movieId.rating}/10</p>
                <p style={{ fontSize: '12px', color: '#28a745' }}>✓ Watched on {new Date(item.watchedAt).toLocaleDateString()}</p>
                <button 
                  onClick={() => handleRemove(item._id)}
                  style={{
                    width: '100%',
                    marginTop: '10px',
                    padding: '8px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Watched;