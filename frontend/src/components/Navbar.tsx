import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const Navbar = () => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const navBtnStyle = {
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
    padding: '8px 16px',
    borderRadius: '8px',
    transition: 'all 0.3s'
  };

  return (
    <nav style={{
      background: 'rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '15px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        <h2 style={{
          margin: 0,
          fontSize: '28px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          cursor: 'pointer'
        }}
          onClick={() => navigate('/movies')}>
          🎬 CineLog
        </h2>

        <button onClick={() => navigate('/movies')} style={navBtnStyle}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(102, 126, 234, 0.2)'; e.currentTarget.style.color = '#667eea'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#fff'; }}>
          Movies
        </button>

        <button onClick={() => navigate('/watchlist')} style={navBtnStyle}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(102, 126, 234, 0.2)'; e.currentTarget.style.color = '#667eea'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#fff'; }}>
          Watchlist
        </button>

        <button onClick={() => navigate('/watched')} style={navBtnStyle}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(102, 126, 234, 0.2)'; e.currentTarget.style.color = '#667eea'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#fff'; }}>
          Watched
        </button>

        {user?.isAdmin && (
          <button onClick={() => navigate('/admin')} style={navBtnStyle}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(118, 75, 162, 0.3)'; e.currentTarget.style.color = '#764ba2'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#fff'; }}>
            ⚙️ Admin Panel
          </button>
        )}
      </div>

      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <span style={{
          color: '#bbb',
          fontSize: '14px',
          padding: '8px 16px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '8px'
        }}>
          👤 {user?.username} {user?.isAdmin && <span style={{ color: '#764ba2', fontWeight: 'bold' }}>(Admin)</span>}
        </span>

        <button onClick={handleLogout} style={{
          background: 'linear-gradient(135deg, #e94560 0%, #d62839 100%)',
          border: 'none',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 'bold',
          boxShadow: '0 4px 15px rgba(233, 69, 96, 0.4)'
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;