import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Movies from './pages/Movies';
import Watchlist from './pages/Watchlist';
import Watched from './pages/Watched';
import { authService } from './services/authService';

function App() {
  const isAuthenticated = authService.isAuthenticated();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/movies" 
          element={isAuthenticated ? <Movies /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/watchlist" 
          element={isAuthenticated ? <Watchlist /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/watched" 
          element={isAuthenticated ? <Watched /> : <Navigate to="/login" />} 
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;