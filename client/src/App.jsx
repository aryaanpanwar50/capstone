import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './App.css'
import Login from './Pages/Login'
import Home from './Pages/Home'
import FaceAuth from './Pages/FaceAuth'
import LandingPage from './Pages/LandingPage';
import { ThemeProvider } from './context/ThemeContext';
import TopChart from './Pages/TopChart';
import Desc from './Pages/Desc';
import AllGames from './Pages/AllGames';
import { API_URL, fetchOptions } from './config';
import GameByTag from './components/GameByTag';
import { DotLottieReact } from '@lottiefiles/dotlottie-react'


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

const verifyAuth = async () => {
  try {
    const [regularAuthResponse, faceAuthResponse] = await Promise.all([
      fetch(`${API_URL}/user/check`, fetchOptions),
      fetch(`${API_URL}/faceAuth/verify-auth`, fetchOptions)
    ]);

    return regularAuthResponse.ok || faceAuthResponse.ok;
  } catch (error) {
    console.error('Auth verification failed:', error);
    return false;
  }
};

// ProtectedRoute component to check authentication
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const verify = async () => {
      const startTime = Date.now()
      const isAuthenticated = await verifyAuth();
      if (!isAuthenticated) {
        navigate('/login', { replace: true });
        return;
      }

      
        const elapsedTime = Date.now() - startTime
        const remainingDelay = Math.max(0, 2000 - elapsedTime)
        
        setTimeout(() => {
          setIsVerifying(false)
        }, remainingDelay)

        
    };

    verify();
  }, [navigate]);

  if (isVerifying) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
      }}>
        <DotLottieReact
          src="https://lottie.host/376c2d63-c220-4987-b922-67d602ba3510/DCVf0jB4V9.lottie"
          loop
          autoplay
          style={{
            width: '200px',  // Adjust size as needed
            height: '200px'  // Adjust size as needed
          }}
        />
        <div style={{ marginTop: '20px', fontSize: '1.2rem' }}>
          Verifying authentication...
        </div>
      </div>
    );
  }

  return children;
};


// AuthRoute component to prevent authenticated users from accessing login/auth pages
const AuthRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const check = async () => {
      const isAuthenticated = await verifyAuth();
      if (isAuthenticated) {
        navigate('/home', { replace: true });
        return;
      }
      setIsVerifying(false);
    };

    check();
  }, [navigate]);

  if (isVerifying) {
    return <div>Checking authentication...</div>;
  }

  return children;
};

// AuthRoute.propTypes = {
//   children: PropTypes.node.isRequired,
// };

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/landing" replace />} />
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

          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path='/top-charts' element={
            <ProtectedRoute>
              <TopChart />
            </ProtectedRoute>
          } />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/games/:id" element={<Desc />} />
          <Route path='/landing' element={<LandingPage/>}/>
          <Route path='/games/filter/:category' element={<GameByTag></GameByTag>}/>
          <Route path='/games' element={<AllGames></AllGames>}/>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
