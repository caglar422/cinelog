import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');

  try {
    await authService.register(username, email, password);
    navigate('/movies');
  } catch (err) {
    if (err && typeof err === 'object' && 'response' in err) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      setError(axiosError.response?.data?.message || 'Registration failed. Please try again.');
    } else if (err instanceof Error) {
      setError('Registration failed. Please try again.');
    } else {
      setError('Registration failed. Please try again.');
    }
  }
};

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '450px',
        width: '100%',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{
            fontSize: '42px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '10px'
          }}>
            🎬 CineLog
          </h1>
          <p style={{ color: '#bbb', fontSize: '16px' }}>Create your account</p>
        </div>

        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '15px',
                fontSize: '16px',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: '#fff',
                outline: 'none',
                transition: 'all 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '15px',
                fontSize: '16px',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: '#fff',
                outline: 'none',
                transition: 'all 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              style={{
                width: '100%',
                padding: '15px',
                fontSize: '16px',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: '#fff',
                outline: 'none',
                transition: 'all 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
            />
          </div>
          {error && <p style={{ color: '#ff6b6b', marginBottom: '15px', textAlign: 'center' }}>{error}</p>}
          <button type="submit" style={{
            width: '100%',
            padding: '15px',
            fontSize: '18px',
            fontWeight: 'bold',
            borderRadius: '10px',
            border: 'none',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
          }}>
            Register
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px', color: '#bbb' }}>
          Already have an account?{' '}
          <a href="/login" style={{ color: '#667eea', textDecoration: 'none', fontWeight: 'bold' }}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;