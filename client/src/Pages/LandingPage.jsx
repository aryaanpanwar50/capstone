import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gamepad, ChevronRight, Star, TrendingUp, Award, Users, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


function LandingPage() {
  const [theme, setTheme] = useState({
    background: 'bg-[#080f1d]',
    primary: 'text-white',
    secondary: 'text-gray-300',
    muted: 'text-gray-500',
    cardBg: 'bg-[#111827]/80',
    border: 'border-[#1f2937]',
    accent: 'text-[#06c1ff]'
  });
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredGame, setHoveredGame] = useState(null);
  const navigate = useNavigate()
  
  // Featured Games
  const featured = [
    { 
      id: 1, 
      title: "Galaxy Racers", 
      image: "/api/placeholder/800/400", 
      description: "Race through space in this futuristic multiplayer racing game!",
      category: "Racing"
    },
    { 
      id: 2, 
      title: "Dungeon Hunters", 
      image: "/api/placeholder/800/400", 
      description: "Explore dangerous dungeons and fight epic monsters!",
      category: "Adventure"
    },
    { 
      id: 3, 
      title: "Pixel Battles", 
      image: "/api/placeholder/800/400", 
      description: "Retro-style multiplayer battle arena with unique characters!",
      category: "Action"
    }
  ];
  
  // Popular Games
  const popularGames = [
    { 
      id: 1, 
      title: "Space Odyssey", 
      category: "Adventure", 
      rating: 4.8, 
      imageUrl: "/api/placeholder/320/180",
      plays: "120K" 
    },
    { 
      id: 2, 
      title: "Medieval Conquest", 
      category: "Strategy", 
      rating: 4.5, 
      imageUrl: "/api/placeholder/320/180",
      plays: "95K" 
    },
    { 
      id: 3, 
      title: "Neon Racer", 
      category: "Racing", 
      rating: 4.7, 
      imageUrl: "/api/placeholder/320/180",
      plays: "150K" 
    },
    { 
      id: 4, 
      title: "Block Puzzle", 
      category: "Puzzle", 
      rating: 4.2, 
      imageUrl: "/api/placeholder/320/180",
      plays: "200K" 
    },
    { 
      id: 5, 
      title: "Wild West", 
      category: "RPG", 
      rating: 4.6, 
      imageUrl: "/api/placeholder/320/180",
      plays: "78K" 
    },
    { 
      id: 6, 
      title: "Zombie Survival", 
      category: "Action", 
      rating: 4.9, 
      imageUrl: "/api/placeholder/320/180",
      plays: "180K" 
    }
  ];
  
  // Trending games
  const trending = [
    { id: 1, title: "Space Odyssey", plays: "120K", change: "+20%" },
    { id: 2, title: "Neon Racer", plays: "150K", change: "+15%" },
    { id: 3, title: "Block Puzzle", plays: "200K", change: "+12%" },
  ];
  
  // Categories
  const categories = [
    { icon: "🎮", name: "All Games", id: "all" },
    { icon: "🔫", name: "Action", id: "action" },
    { icon: "🧩", name: "Puzzle", id: "puzzle" },
    { icon: "🏎️", name: "Racing", id: "racing" },
    { icon: "⚔️", name: "Adventure", id: "adventure" },
    { icon: "🏀", name: "Sports", id: "sports" },
  ];
  
  // Auto-advance featured carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featured.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [featured.length]);

  const homePage=()=>{
    navigate('/home')
  }
  
  // Hero Game Card Component
  const HeroGameCard = ({ game, index }) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`${theme.cardBg} backdrop-blur-sm ${theme.border} border-2 rounded-2xl overflow-hidden hover:border-[#06c1ff]/30 hover:shadow-lg hover:shadow-[#06c1ff]/10 transition-all duration-300 group`}
      onMouseEnter={() => setHoveredGame(game.id)}
      onMouseLeave={() => setHoveredGame(null)}
    >
      <div className="aspect-[16/9] relative">
        <img 
          src={game.imageUrl} 
          alt={game.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-4">
          <div className="w-full">
            <span className={`bg-[#06c1ff]/20 text-[#06c1ff] px-2 py-1 rounded-full text-xs font-medium`}>
              {game.category}
            </span>
            <div className="flex items-center justify-between mt-2">
              <span className="text-white font-bold">{game.plays} plays</span>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#06c1ff] text-[#0b2d72] px-3 py-1 rounded-lg text-sm font-medium"
              >
                Play Now
              </motion.button>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className={`font-semibold ${theme.primary} group-hover:text-[#06c1ff] transition-colors`}>
          {game.title}
        </h3>
        <div className="flex items-center gap-1 mt-1">
          <Star size={14} fill="currentColor" className="text-[#06c1ff]" />
          <span className={theme.secondary}>{game.rating}</span>
        </div>
      </div>
    </motion.div>
  );
  
  return (
    <div className={`min-h-screen ${theme.background} ${theme.primary} transition-colors duration-300`}>
      {/* Header with blurred effect */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#080f1d]/80 border-b border-[#1f2937]">
        <div className="container mx-auto px-6 py-4 max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#06c1ff] to-[#06c1ff]/30 flex items-center justify-center shadow-lg shadow-[#06c1ff]/10">
                <Gamepad size={20} className="text-white" />
              </div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#06c1ff] to-white">
                Khelzy
              </h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-white hover:text-[#06c1ff] transition-colors">Home</a>
              <a href="#" className="text-gray-300 hover:text-[#06c1ff] transition-colors">Top Charts</a>
              <a href="#" className="text-gray-300 hover:text-[#06c1ff] transition-colors">New Games</a>
              <a href="#" className="text-gray-300 hover:text-[#06c1ff] transition-colors">Categories</a>
            </nav>
            <div className="flex items-center gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:block px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg transition-all duration-300"
              >
                Sign In
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-[#06c1ff] text-[#0b2d72] rounded-lg font-medium transition-all duration-300"
              >
                Play Now
              </motion.button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        {/* Animated background with elements */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#06c1ff]/10 rounded-full blur-3xl"></div>
          <div className="absolute top-40 -right-20 w-80 h-80 bg-[#06c1ff]/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-[#06c1ff]/10 border border-[#06c1ff]/30 text-[#06c1ff] text-sm font-medium mb-6">
                The Ultimate Gaming Experience
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Play Amazing Games <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#06c1ff] to-white">
                  Anytime, Anywhere
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-lg">
                Discover thousands of free-to-play browser games. No downloads required - just click and start playing instantly!
              </p>
              <div className="flex flex-wrap gap-4" onClick={()=>homePage()}>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-[#06c1ff] text-[#0b2d72] rounded-xl font-bold text-lg shadow-lg shadow-[#06c1ff]/20 flex items-center gap-2"
                >
                  Browse Games
                  <ChevronRight size={20} />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-bold text-lg border border-white/20 hover:bg-white/20 transition-colors duration-300"
                >
                  Top Charts
                </motion.button>
              </div>
              
              <div className="flex items-center gap-8 mt-12">
                <div>
                  <p className="text-3xl font-bold text-[#06c1ff]">500+</p>
                  <p className="text-gray-400">Games</p>
                </div>
                <div className="h-10 w-px bg-gray-700"></div>
                <div>
                  <p className="text-3xl font-bold text-[#06c1ff]">10M+</p>
                  <p className="text-gray-400">Players</p>
                </div>
                <div className="h-10 w-px bg-gray-700"></div>
                <div>
                  <p className="text-3xl font-bold text-[#06c1ff]">4.8</p>
                  <p className="text-gray-400">Rating</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              {/* Featured game carousel */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <motion.div
                  animate={{ 
                    x: `-${currentSlide * 100}%` 
                  }}
                  transition={{ type: "tween", ease: "easeInOut", duration: 0.8 }}
                  className="flex w-full"
                >
                  {featured.map((item, index) => (
                    <div key={item.id} className="min-w-full">
                      <div className="relative aspect-[16/9]">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#080f1d] via-[#080f1d]/50 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-8">
                          <span className="bg-[#06c1ff]/20 text-[#06c1ff] px-3 py-1 rounded-full text-sm font-medium mb-3 inline-block">
                            {item.category}
                          </span>
                          <h2 className="text-3xl font-bold mb-2 text-white">{item.title}</h2>
                          <p className="text-lg text-gray-200 mb-4">{item.description}</p>
                          <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-2 bg-[#06c1ff] text-[#0b2d72] rounded-lg font-bold shadow-lg shadow-[#06c1ff]/20 flex items-center gap-2"
                          >
                            Play Now
                            <ChevronRight size={18} />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
                
                {/* Carousel indicators */}
                <div className="absolute bottom-4 right-4 flex gap-2">
                  {featured.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        currentSlide === index ? 'bg-[#06c1ff] w-6' : 'bg-white/30 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-[#06c1ff]/30 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-[#06c1ff]/20 rounded-full blur-3xl -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Gamepad className={theme.accent} size={24} />
              <h2 className="text-2xl font-bold">Game Categories</h2>
            </div>
            <button className="text-sm font-medium text-[#06c1ff] hover:underline transition-colors flex items-center gap-1">
              View All <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
            {categories.map((category, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`min-w-[150px] py-6 px-4 rounded-xl cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-3 border-2 ${theme.cardBg} ${theme.border} hover:bg-[#06c1ff]/5 hover:border-[#06c1ff]/20 hover:text-[#06c1ff]`}
              >
                <div className="text-3xl mb-1">{category.icon}</div>
                <div className="text-sm font-medium">{category.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Popular Games Section */}
      <section className="py-16 relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-32 w-64 h-64 bg-[#06c1ff]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#06c1ff]/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <Flame className="text-[#06c1ff]" size={24} />
              <h2 className="text-2xl font-bold">Popular Games</h2>
            </div>
            <button className="text-sm font-medium text-[#06c1ff] hover:underline transition-colors flex items-center gap-1">
              View All <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {popularGames.map((game, index) => (
              <HeroGameCard key={game.id} game={game} index={index} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats & CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#06c1ff]/5 skew-y-3 transform -translate-y-1/2"></div>
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Stats & Trending */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Stats Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className={`${theme.cardBg} backdrop-blur-sm ${theme.border} border-2 rounded-2xl p-6 shadow-lg hover:shadow-[#06c1ff]/10 hover:border-[#06c1ff]/30 transition-all duration-300`}
                >
                  <div className="flex items-center gap-2 mb-6">
                    <Users className="text-[#06c1ff]" size={20} />
                    <h3 className="font-bold">Player Stats</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-[#06c1ff]/10 rounded-lg p-4 text-center">
                      <p className="text-[#06c1ff] text-2xl font-bold">10M+</p>
                      <p className="text-sm text-gray-400">Active Players</p>
                    </div>
                    <div className="bg-[#06c1ff]/10 rounded-lg p-4 text-center">
                      <p className="text-[#06c1ff] text-2xl font-bold">45M+</p>
                      <p className="text-sm text-gray-400">Games Played</p>
                    </div>
                    <div className="bg-[#06c1ff]/10 rounded-lg p-4 text-center">
                      <p className="text-[#06c1ff] text-2xl font-bold">500+</p>
                      <p className="text-sm text-gray-400">Games</p>
                    </div>
                    <div className="bg-[#06c1ff]/10 rounded-lg p-4 text-center">
                      <p className="text-[#06c1ff] text-2xl font-bold">24/7</p>
                      <p className="text-sm text-gray-400">Support</p>
                    </div>
                  </div>
                </motion.div>
                
                {/* Trending Games Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className={`${theme.cardBg} backdrop-blur-sm ${theme.border} border-2 rounded-2xl p-6 shadow-lg hover:shadow-[#06c1ff]/10 hover:border-[#06c1ff]/30 transition-all duration-300`}
                >
                  <div className="flex items-center gap-2 mb-6">
                    <TrendingUp className="text-[#06c1ff]" size={20} />
                    <h3 className="font-bold">Trending Now</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {trending.map((game, index) => (
                      <motion.div 
                        key={game.id} 
                        className={`flex items-center justify-between p-3 rounded-xl ${theme.cardBg} hover:bg-[#06c1ff]/5 transition-all duration-300 cursor-pointer`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-[#06c1ff] opacity-80 text-sm font-medium">#{index + 1}</span>
                          <span className="font-medium">{game.title}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-400">{game.plays}</span>
                          <span className="text-xs text-[#06c1ff]">{game.change}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* CTA Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#06c1ff]/20 to-[#06c1ff]/5 backdrop-blur-md rounded-2xl p-8 border border-[#06c1ff]/30 shadow-lg relative overflow-hidden"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#06c1ff]/30 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-[#06c1ff]/20 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-[#06c1ff] flex items-center justify-center mb-6">
                  <Award className="text-[#0b2d72]" size={24} />
                </div>
                
                <h3 className="text-2xl font-bold mb-4">Ready to Join the Fun?</h3>
                <p className="text-gray-300 mb-8">
                  Sign up now and get access to exclusive games, track your achievements, and compete with friends.
                </p>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-[#06c1ff] text-[#0b2d72] rounded-xl font-bold text-lg shadow-lg shadow-[#06c1ff]/20 mb-4"
                >
                  Create Account
                </motion.button>
                
                <button className="w-full py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-medium hover:bg-white/20 transition-colors duration-300">
                  Learn More
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 border-t border-[#1f2937]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#06c1ff] to-[#06c1ff]/30 flex items-center justify-center shadow-md shadow-[#06c1ff]/10">
                  <Gamepad size={20} className="text-white" />
                </div>
                <h2 className="text-xl font-bold">GameVault</h2>
              </div>
              <p className="text-gray-400 mb-6">
                The ultimate destination for free browser-based games. Play instantly with no downloads required.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#06c1ff]/20 hover:text-[#06c1ff] transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#06c1ff]/20 hover:text-[#06c1ff] transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767 3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 13.07v.041a3.293 3.293 0 0 0 2.633 3.218 3.203 3.203 0 0 1-1.482.056 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 0 15.073 9.284 9.284 0 0 0 5.026 15z"/>
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#06c1ff]/20 hover:text-[#06c1ff] transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#06c1ff]/20 hover:text-[#06c1ff] transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-[#06c1ff] transition-colors">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#06c1ff] transition-colors">Top Charts</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#06c1ff] transition-colors">New Games</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#06c1ff] transition-colors">Categories</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#06c1ff] transition-colors">About Us</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-[#06c1ff] transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#06c1ff] transition-colors">FAQ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#06c1ff] transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#06c1ff] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#06c1ff] transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">Subscribe to our newsletter for updates and new game releases.</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 rounded-l-lg bg-white/10 border-0 text-white focus:outline-none focus:ring-2 focus:ring-[#06c1ff]/50"
                />
                <button className="px-4 py-2 bg-[#06c1ff] text-[#0b2d72] rounded-r-lg font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-[#1f2937] pt-8 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} GameVault. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;