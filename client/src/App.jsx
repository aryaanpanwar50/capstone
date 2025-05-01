import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './App.css'
import Login from './Pages/Login'
import Home from './Pages/Home'
import FaceAuth from './Pages/FaceAuth'
import FingerAuth from './Pages/FingerAuth'
import GamesCategoriesPage from './Pages/GamesCategoriesPage';
import TopChart from './Pages/TopChart';
import Desc from './Pages/Desc';

// Handle auth callback
const AuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (token) {
      navigate('/home');
    } else {
      navigate('/login');
    }
  }, [location, navigate]);

  return <div>Loading...</div>;
};

// ProtectedRoute component to check authentication
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        // Try to verify authentication using cookies
        const response = await fetch('http://localhost:8080/user/check', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          // If verification fails, try to refresh the token
          try {
            const refreshResponse = await fetch('http://localhost:8080/user/refresh-token', {
              method: 'POST',
              credentials: 'include'
            });
            
            if (refreshResponse.ok) {
              setIsVerifying(false);
              return;
            }
          } catch (refreshError) {
            console.error('Token refresh error:', refreshError);
          }

          // If both verification and refresh fail, redirect to login
          sessionStorage.setItem('redirectPath', location.pathname);
          navigate('/login', { replace: true });
          return;
        }

        setIsVerifying(false);
      } catch (error) {
        console.error('Authentication verification error:', error);
        sessionStorage.setItem('redirectPath', location.pathname);
        navigate('/login', { replace: true });
      }
    };

    verifyAuth();
  }, [navigate, location]);

  if (isVerifying) {
    return <div>Verifying authentication...</div>;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

// AuthRoute component to prevent authenticated users from accessing login/auth pages
const AuthRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:8080/user/check', {
          method: 'GET',
          credentials: 'include'
        });
        
        if (response.ok) {
          // If user is already logged in, redirect to home
          navigate('/home', { replace: true });
        }
      } catch (error) {
        console.error('Auth check error:', error);
      }
    };

    checkAuth();
  }, [navigate]);

  return children;
};

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={
          <AuthRoute>
            <Login />
          </AuthRoute>
        } />
        <Route path="/face-auth" element={
          <AuthRoute>
            <FaceAuth />
          </AuthRoute>
        } />
        <Route path="/finger-auth" element={
          <AuthRoute>
            <FingerAuth />
          </AuthRoute>
        } />
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path='/categories' element={
          <ProtectedRoute>
            <GamesCategoriesPage />
          </ProtectedRoute>
        } />
        <Route path='/top-charts' element={
          <ProtectedRoute>
            <TopChart />
          </ProtectedRoute>
        } />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/games/:id" element={<Desc />} />
      </Routes>
    </Router>
  );
}

export default App;
