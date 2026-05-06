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

  if (loading) return <div style={{ textAlign: 'center', padding: '50px', color: '#fff', fontSize: '20px' }}>Loading...</div>;

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
        <h1 style={{ 
          fontSize: '42px',
          marginBottom: '30px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Watched Movies
        </h1>
        
        {watched.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            marginTop: '100px',
            padding: '40px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '20px',
            maxWidth: '500px',
            margin: '100px auto'
          }}>
            <p style={{ fontSize: '60px', marginBottom: '20px' }}>✓</p>
            <p style={{ fontSize: '24px', color: '#bbb', marginBottom: '10px' }}>
              You haven't watched any movies yet
            </p>
            <p style={{ fontSize: '16px', color: '#888' }}>
              Start watching and track your progress!
            </p>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
            gap: '30px' 
          }}>
            {watched.map((item) => (
              <div 
                key={item._id} 
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  transition: 'all 0.3s',
                  border: '1px solid rgba(40, 167, 69, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(40, 167, 69, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ position: 'relative' }}>
                  <img 
                    src={item.movieId.poster} 
                    alt={item.movieId.title} 
                    style={{ 
                      width: '100%', 
                      height: '330px',
                      objectFit: 'cover'
                    }} 
                  />
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    padding: '5px 10px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    ✓ Watched
                  </div>
                </div>
                <div style={{ padding: '15px' }}>
                  <h3 style={{ 
                    fontSize: '18px', 
                    marginBottom: '8px',
                    color: '#fff',
                    fontWeight: 'bold'
                  }}>
                    {item.movieId.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#bbb', marginBottom: '8px' }}>
                    {item.movieId.year} • {item.movieId.director}
                  </p>
                  <p style={{ fontSize: '16px', color: '#ffd700', marginBottom: '8px', fontWeight: 'bold' }}>
                    ⭐ {item.movieId.rating}/10
                  </p>
                  <p style={{ fontSize: '12px', color: '#28a745', marginBottom: '15px' }}>
                    Watched on {new Date(item.watchedAt).toLocaleDateString()}
                  </p>
                  <button 
                    onClick={() => handleRemove(item._id)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      background: 'linear-gradient(135deg, #e94560 0%, #d62839 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      transition: 'transform 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Watched;