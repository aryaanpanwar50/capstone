import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaGoogle,
  FaFacebook,
  FaTwitter
} from 'react-icons/fa';
import { 
  Mail, 
  Lock, 
  User, 
  ChevronLeft, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';

const SlidingDoorLoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch('http://localhost:8080/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(loginData)
      });

      const data = await response.json();
      
      if (response.ok) {
        // Check for redirect path from protected route attempt
        const redirectPath = sessionStorage.getItem('redirectPath');
        sessionStorage.removeItem('redirectPath'); // Clear it after use
        navigate(redirectPath || '/home');
      } else {
        setError(data.msg || 'Login failed');
      }
    } catch (error) {
      setError('Network error occurred');
      console.error('Login error:', error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8080/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(signupData)
      });

      const data = await response.json();
      
      if (response.ok) {
        setIsLogin(true); // Switch to login form
        alert('Registration successful! Please login.');
      } else {
        setError(data.msg || 'Registration failed');
      }
    } catch (error) {
      setError('Network error occurred');
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b2d72] via-[#0f3b8f] to-[#0b2d72] flex items-center justify-center p-4 md:p-8 font-sans overflow-hidden">
      {/* Enhanced animated background elements with improved positioning and animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-40 -left-40 w-80 h-80 md:w-96 md:h-96 bg-[#06c1ff] rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.2, 0.8, 1],
            x: [0, 40, -30, 0],
            y: [0, -60, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-0 -right-20 w-80 h-80 md:w-96 md:h-96 bg-[#ff3a7c] rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.2, 0.8, 1],
            x: [0, -40, 30, 0],
            y: [0, -60, 30, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div 
          className="absolute -bottom-40 left-20 w-80 h-80 md:w-96 md:h-96 bg-[#06c1ff] rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.2, 0.8, 1],
            x: [0, 50, -40, 0],
            y: [0, -70, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
        {/* Added extra blob for more dynamic background */}
        <motion.div 
          className="hidden md:block absolute bottom-20 right-20 w-96 h-96 bg-[#06ff96] rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{
            scale: [1, 1.2, 0.8, 1],
            x: [0, -50, 40, 0],
            y: [0, 60, -40, 0],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <motion.div 
        className="relative w-full max-w-5xl h-[600px] md:h-[650px] overflow-hidden rounded-2xl backdrop-blur-md bg-white/10 shadow-[0_0_40px_rgba(6,193,255,0.3)] border border-white/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* Improved glass morphism container with slightly better transparency */}
        <div className="absolute inset-0 backdrop-blur-md bg-gradient-to-br from-white/15 to-white/5 z-0"></div>
        
        {/* Login Panel with improved transitions */}
        <div 
          className={`absolute inset-0 flex transition-all duration-1000 ease-out 
            ${isLogin 
              ? 'translate-x-0 scale-100' 
              : '-translate-x-1/2 scale-75 opacity-0 pointer-events-none'}`}
        >
          <div className="w-full flex flex-col md:flex-row">
            <motion.div 
              className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center order-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="max-w-md mx-auto w-full">
                <motion.h2 
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-white"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Welcome back
                </motion.h2>
                <motion.p 
                  className="text-[#06c1ff] mb-8 text-lg"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Please enter your details to sign in
                </motion.p>
                
                <motion.form 
                  className="space-y-5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  onSubmit={handleLogin}
                >
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-white mb-1">Email</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-[#06c1ff]" />
                      </div>
                      <input 
                        type="email" 
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-[#06c1ff]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#06c1ff] text-white placeholder-white/60 backdrop-blur-sm transition-all duration-300 hover:border-[#06c1ff]/50" 
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <label className="block text-sm font-medium text-white mb-1">Password</label>
                      <a href="#" className="text-sm text-[#06c1ff] hover:text-white transition duration-300">Forgot password?</a>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-[#06c1ff]" />
                      </div>
                      <input 
                        type="password" 
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-[#06c1ff]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#06c1ff] text-white placeholder-white/60 backdrop-blur-sm transition-all duration-300 hover:border-[#06c1ff]/50" 
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-[#06c1ff] to-[#0b8fd8] text-white py-3 px-4 rounded-lg hover:translate-y-[-2px] hover:shadow-lg hover:shadow-[#06c1ff]/40 transition-all duration-300 flex items-center justify-center group font-semibold"
                  >
                    <span>Sign in</span>
                    <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.form>
                
                {error && (
                  <div className="mt-3 py-2 px-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {error}
                    </div>
                  </div>
                )}

                <div className="mt-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/20"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-transparent text-white/70">Or continue with</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    <button 
                      onClick={() => window.location.href = 'http://localhost:8080/auth/google'}
                      className="w-full inline-flex justify-center py-2 px-4 border border-white/20 rounded-lg shadow-sm bg-white/5 hover:bg-white/15 hover:border-white/30 hover:shadow-md transition-all duration-300"
                    >
                      <FaGoogle className="h-5 w-5 text-white" />
                    </button>
                    <button className="w-full inline-flex justify-center py-2 px-4 border border-white/20 rounded-lg shadow-sm bg-white/5 hover:bg-white/15 hover:border-white/30 hover:shadow-md transition-all duration-300">
                      <FaFacebook className="h-5 w-5 text-white" />
                    </button>
                    <button className="w-full inline-flex justify-center py-2 px-4 border border-white/20 rounded-lg shadow-sm bg-white/5 hover:bg-white/15 hover:border-white/30 hover:shadow-md transition-all duration-300">
                      <FaTwitter className="h-5 w-5 text-white" />
                    </button>
                  </div>
                  
                  {/* Improved biometric authentication buttons */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                    <button 
                      onClick={() => navigate('/face-auth')}
                      className="inline-flex justify-center items-center py-3 px-4 border border-[#06c1ff]/40 rounded-lg bg-white/5 hover:bg-white/15 hover:border-[#06c1ff]/60 transition-all duration-300 text-white hover:shadow-md"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#06c1ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="8" r="4"/>
                        <path d="M12 14c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z"/>
                      </svg>
                      <span>Face ID</span>
                    </button>

                    <button 
                      onClick={() => navigate('/finger-auth')}
                      className="inline-flex justify-center items-center py-3 px-4 border border-[#06c1ff]/40 rounded-lg bg-white/5 hover:bg-white/15 hover:border-[#06c1ff]/60 transition-all duration-300 text-white hover:shadow-md"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#06c1ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 11c1.66 0 3-1.34 3-3S13.66 5 12 5s-3 1.34-3 3 1.34 3 3 3zm0 1c-1.84 0-3.56.5-5.03 1.37-.61.36-.97 1.02-.97 1.72V16h12v-.91c0-.7-.36-1.36-.97-1.72C15.56 12.5 13.84 12 12 12zm0-8c3.31 0 6 2.69 6 6 0 1.54-.58 2.94-1.53 4H7.53C6.58 12.94 6 11.54 6 10c0-3.31 2.69-6 6-6z"/>
                      </svg>
                      <span>Fingerprint</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="w-full md:w-1/2 bg-gradient-to-br from-[#0b2d72]/80 to-[#0f3b8f]/80 flex items-center justify-center text-white text-center order-1 p-6 md:p-12 relative overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {/* Added subtle animated pattern overlay */}
              <div className="absolute inset-0 opacity-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                  <defs>
                    <pattern id="dotPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="10" cy="10" r="1" fill="white" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#dotPattern)" />
                </svg>
              </div>
              
              <div className="max-w-md mx-auto relative z-10">
                <motion.div 
                  className="mb-8"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-[#06c1ff]/30 to-[#06c1ff]/10 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#06c1ff]/10">
                    <User className="h-10 w-10 text-[#06c1ff]" />
                  </div>
                </motion.div>
                <motion.h3 
                  className="text-3xl font-bold mb-4"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  New Here?
                </motion.h3>
                <motion.p 
                  className="mb-8 text-white/80 text-lg"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Create an account and discover the amazing features we offer!
                </motion.p>
                <motion.button 
                  onClick={() => setIsLogin(false)}
                  className="group px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-[#06c1ff] transition-all duration-300 flex items-center mx-auto hover:shadow-lg hover:shadow-[#06c1ff]/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <span>Create Account</span>
                  <ChevronRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Signup Panel with improved transitions */}
        <div 
          className={`absolute inset-0 flex transition-all duration-1000 ease-out 
            ${isLogin 
              ? 'translate-x-full scale-75 opacity-0 pointer-events-none' 
              : 'translate-x-0 scale-100'}`}
        >
          <div className="w-full flex flex-col md:flex-row">
            <motion.div 
              className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center order-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="max-w-md mx-auto w-full">
                <motion.h2 
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-white"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Create Account
                </motion.h2>
                <motion.p 
                  className="text-[#06c1ff] mb-8 text-lg"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Join our community today
                </motion.p>
                
                <motion.form 
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  onSubmit={handleSignup}
                >
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-white mb-1">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-[#06c1ff]" />
                      </div>
                      <input 
                        type="text" 
                        value={signupData.name}
                        onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-[#06c1ff]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#06c1ff] text-white placeholder-white/60 backdrop-blur-sm transition-all duration-300 hover:border-[#06c1ff]/50" 
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-white mb-1">Email</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-[#06c1ff]" />
                      </div>
                      <input 
                        type="email" 
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-[#06c1ff]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#06c1ff] text-white placeholder-white/60 backdrop-blur-sm transition-all duration-300 hover:border-[#06c1ff]/50" 
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-white mb-1">Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-[#06c1ff]" />
                      </div>
                      <input 
                        type="password" 
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-[#06c1ff]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#06c1ff] text-white placeholder-white/60 backdrop-blur-sm transition-all duration-300 hover:border-[#06c1ff]/50" 
                        placeholder="Create a password"
                      />
                    </div>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-[#06c1ff] to-[#0b8fd8] text-white py-3 px-4 rounded-lg hover:translate-y-[-2px] hover:shadow-lg hover:shadow-[#06c1ff]/40 transition-all duration-300 flex items-center justify-center group font-semibold"
                  >
                    <span>Create Account</span>
                    <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.form>

                {error && (
                  <div className="mt-3 py-2 px-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {error}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                  <button 
                    onClick={() => navigate('/face-auth')}
                    className="inline-flex justify-center items-center py-3 px-4 border border-[#06c1ff]/40 rounded-lg bg-white/5 hover:bg-white/15 hover:border-[#06c1ff]/60 transition-all duration-300 text-white hover:shadow-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#06c1ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="8" r="4"/>
                      <path d="M12 14c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z"/>
                    </svg>
                    <span>Face ID</span>
                  </button>

                  <button 
                    onClick={() => navigate('/finger-auth')}
                    className="inline-flex justify-center items-center py-3 px-4 border border-[#06c1ff]/40 rounded-lg bg-white/5 hover:bg-white/15 hover:border-[#06c1ff]/60 transition-all duration-300 text-white hover:shadow-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#06c1ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 11c1.66 0 3-1.34 3-3S13.66 5 12 5s-3 1.34-3 3 1.34 3 3 3zm0 1c-1.84 0-3.56.5-5.03 1.37-.61.36-.97 1.02-.97 1.72V16h12v-.91c0-.7-.36-1.36-.97-1.72C15.56 12.5 13.84 12 12 12zm0-8c3.31 0 6 2.69 6 6 0 1.54-.58 2.94-1.53 4H7.53C6.58 12.94 6 11.54 6 10c0-3.31 2.69-6 6-6z"/>
                    </svg>
                    <span>Fingerprint</span>
                  </button>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="w-full md:w-1/2 bg-gradient-to-br from-[#0b2d72]/80 to-[#0f3b8f]/80 flex items-center justify-center text-white text-center order-2 p-6 md:p-12 relative overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {/* Added subtle animated pattern overlay */}
              <div className="absolute inset-0 opacity-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                  <defs>
                    <pattern id="dotPattern2" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="10" cy="10" r="1" fill="white" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#dotPattern2)" />
                </svg>
              </div>
              <div className="max-w-md mx-auto relative z-10">
                <motion.div 
                  className="mb-8"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="w-20 h-20 bg-[#06c1ff]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="h-10 w-10 text-[#06c1ff]" />
                  </div>
                </motion.div>
                
                <motion.h3 
                  className="text-3xl font-bold mb-4"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Welcome Back!
                </motion.h3>
                
                <motion.p 
                  className="mb-8 text-white/80"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Already have an account? Sign in to continue your journey!
                </motion.p>
                
                <motion.button 
                  onClick={() => setIsLogin(true)}
                  className="group px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-[#06c1ff] transition-all duration-300 flex items-center mx-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <ChevronLeft className="mr-2 h-5 w-5 transform group-hover:-translate-x-1 transition-transform" />
                  <span>Sign In</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SlidingDoorLoginPage;