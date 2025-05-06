import React, { useState, useEffect } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaGamepad } from 'react-icons/fa';
import { API_URL, fetchOptions } from '../config';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const [regularAuthResponse, faceAuthResponse] = await Promise.allSettled([
          fetch(`${API_URL}/user/check`, fetchOptions),
          fetch(`${API_URL}/faceAuth/verify-auth`, fetchOptions)
        ]);

        const isAuthenticated = (
          regularAuthResponse.status === 'fulfilled' && regularAuthResponse.value.ok
        ) || (
          faceAuthResponse.status === 'fulfilled' && faceAuthResponse.value.ok
        );

        setIsAuthenticated(isAuthenticated);
        if (!isAuthenticated) {
          navigate('/login');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_URL}/user/logout`, {
        ...fetchOptions,
        method: 'POST'
      });

      if (response.ok) {
        localStorage.clear();
        sessionStorage.clear();
        setIsAuthenticated(false);
        window.location.href = '/login';
      } else {
        console.error('Logout failed:', await response.text());
        alert('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('Network error during logout. Please try again.');
    }
  };

  const getNavPath = (item) => {
    switch(item) {
      case "Home": return "/home";
      case "Categories": return "/categories";
      case "Top Charts": return "/top-charts";
      default: return "#";
    }
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="bg-[#0b2d72]/95 py-4 sticky top-0 z-50 shadow-md"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <nav className="flex justify-between items-center">
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/home')}
            style={{ cursor: 'pointer' }}
          >
            <div className="w-10 h-10 bg-[#06c1ff] rounded-lg flex items-center justify-center text-[#0b2d72] font-bold text-2xl">
              <FaGamepad className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold text-white">Khelzy</div>
          </motion.div>

          {/* Navigation buttons */}
          <div className="flex space-x-2">
            <button 
              className="bg-[#06c1ff] p-3 rounded-xl shadow-md hover:bg-[#05a1d6] transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="text-[#0b2d72]">
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </div>
            </button>
            
            <button className="bg-[#06c1ff] p-3 rounded-xl shadow-md hover:bg-[#05a1d6] transition-colors">
              <div className="text-[#0b2d72]">
                <Search size={20} />
              </div>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="absolute right-4 mt-2 bg-white rounded-xl shadow-lg z-50 w-48 overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-2">
              {["Home", "Games", "Categories", "Top Charts", "New"].map((item, index) => (
                <motion.div
                  key={item}
                  onClick={() => {
                    navigate(getNavPath(item));
                    setIsMenuOpen(false);
                  }}
                  className="px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg cursor-pointer text-sm font-medium"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {item}
                </motion.div>
              ))}
              
              {isAuthenticated && (
                <motion.div
                  onClick={handleLogout}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer text-sm font-medium text-center"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Logout
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;