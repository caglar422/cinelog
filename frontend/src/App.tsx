import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Movies from './pages/Movies';
import MovieDetail from './pages/MovieDetail';
import Watchlist from './pages/Watchlist';
import Watched from './pages/Watched';
import AdminPanel from './pages/AdminPanel';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

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
          path="/movie/:id"
          element={isAuthenticated ? <MovieDetail /> : <Navigate to="/login" />}
        />
        <Route
          path="/watchlist"
          element={isAuthenticated ? <Watchlist /> : <Navigate to="/login" />}
        />
        <Route
          path="/watched"
          element={isAuthenticated ? <Watched /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin"
          element={isAuthenticated ? <AdminPanel /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;