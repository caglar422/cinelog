import { useState, useEffect } from 'react';
import { watchlistService } from '../services/watchlistService';
import type { WatchlistItem } from '../types';
import Navbar from '../components/Navbar';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWatchlist = async () => {
      try {
        const data = await watchlistService.getWatchlist();
        setWatchlist(data);
      } catch (error) {
        console.error('Failed to load watchlist', error);
      } finally {
        setLoading(false);
      }
    };

    loadWatchlist();
  }, []);

  const handleRemove = async (id: string) => {
    try {
      await watchlistService.removeFromWatchlist(id);
      setWatchlist(watchlist.filter(item => item._id !== id));
    } catch (error) {
      console.error('Failed to remove from watchlist', error);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <h1>My Watchlist</h1>
        
        {watchlist.length === 0 ? (
          <p style={{ textAlign: 'center', marginTop: '50px', fontSize: '18px', color: '#666' }}>
            Your watchlist is empty. Add some movies!
          </p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
            {watchlist.map((item) => (
              <div key={item._id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}>
                <img src={item.movieId.poster} alt={item.movieId.title} style={{ width: '100%', borderRadius: '4px' }} />
                <h3 style={{ fontSize: '16px', margin: '10px 0' }}>{item.movieId.title}</h3>
                <p style={{ fontSize: '14px', color: '#666' }}>{item.movieId.year} • {item.movieId.director}</p>
                <p style={{ fontSize: '14px' }}>⭐ {item.movieId.rating}/10</p>
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

export default Watchlist;