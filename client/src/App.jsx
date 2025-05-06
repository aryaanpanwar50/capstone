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
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        // Try both regular auth and face auth
        const [regularAuthResponse, faceAuthResponse] = await Promise.allSettled([
          fetch('http://localhost:8080/user/check', {
            credentials: 'include'
          }),
          fetch('http://localhost:8080/faceAuth/verify-auth', {
            credentials: 'include'
          })
        ]);

        // Check if either authentication method is valid
        const isAuthenticated = (
          regularAuthResponse.status === 'fulfilled' && regularAuthResponse.value.ok
        ) || (
          faceAuthResponse.status === 'fulfilled' && faceAuthResponse.value.ok
        );

        if (!isAuthenticated) {
          navigate('/login', { replace: true });
          return;
        }

        setIsVerifying(false);
      } catch (error) {
        console.error('Auth verification error:', error);
        navigate('/login', { replace: true });
      }
    };

    verifyAuth();
  }, [navigate]);

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
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const [regularAuthResponse, faceAuthResponse] = await Promise.allSettled([
          fetch('http://localhost:8080/user/check', {
            credentials: 'include'
          }),
          fetch('http://localhost:8080/faceAuth/verify-auth', {
            credentials: 'include'
          })
        ]);

        // If either auth is valid, redirect to home
        if ((regularAuthResponse.status === 'fulfilled' && regularAuthResponse.value.ok) ||
            (faceAuthResponse.status === 'fulfilled' && faceAuthResponse.value.ok)) {
          navigate('/home', { replace: true });
          return;
        }
        
        setIsVerifying(false);
      } catch (error) {
        console.error('Auth check error:', error);
        setIsVerifying(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (isVerifying) {
    return <div>Checking authentication...</div>;
  }

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
