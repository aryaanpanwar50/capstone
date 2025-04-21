import { useState } from 'react'
import { Search, Menu, X, Gamepad2, Trophy, Star, Sparkles } from 'lucide-react'
import { FaGamepad } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const getNavPath = (item) => {
    switch(item) {
      case "Home": return "/home";
      case "Categories": return "/categories";
      case "Top Charts": return "/top-charts";
      default: return "#";
    }
  }
  
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
            <div className="text-2xl font-bold">Khelzy</div>
          </motion.div>
          
          <div className="hidden md:flex gap-6">
            {["Home", "Games", "Categories", "Top Charts", "New"].map((item, index) => (
              <motion.a
                key={item}
                onClick={() => navigate(getNavPath(item))}
                className="text-white font-medium text-sm uppercase tracking-wider hover:text-[#06c1ff] transition-colors flex items-center gap-1 cursor-pointer"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item === "Home" && <Gamepad2 className="w-4 h-4" />}
                {item === "Games" && <FaGamepad className="w-4 h-4" />}
                {item === "Categories" && <Sparkles className="w-4 h-4" />}
                {item === "Top Charts" && <Trophy className="w-4 h-4" />}
                {item === "New" && <Star className="w-4 h-4" />}
                {item}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Search className="w-5 h-5 text-white cursor-pointer hover:text-[#06c1ff] transition-colors" />
            </motion.div>
            <motion.button 
              className="hidden sm:block px-6 py-2.5 rounded-full font-semibold cursor-pointer transition-all duration-300 text-sm uppercase tracking-wider border-2 border-[#06c1ff] bg-transparent text-[#06c1ff] hover:bg-[#06c1ff] hover:text-[#0b2d72]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
            >
              Login
            </motion.button>
            <motion.button 
              className="px-6 py-2.5 rounded-full font-semibold cursor-pointer transition-all duration-300 text-sm uppercase tracking-wider bg-[#06c1ff] text-[#0b2d72] hover:translate-y-[-2px] hover:shadow-lg hover:shadow-[#06c1ff]/40"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
            >
              Sign Up
            </motion.button>
            <motion.button 
              className="md:hidden text-white hover:text-[#06c1ff] transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </nav>
        
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden mt-4 py-4 border-t border-white/10 flex flex-col gap-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {["Home", "Games", "Categories", "Top Charts", "New"].map((item, index) => (
                <motion.a
                  key={item}
                  onClick={() => {
                    navigate(getNavPath(item));
                    setIsMenuOpen(false);
                  }}
                  className="text-white font-medium text-sm uppercase tracking-wider flex items-center gap-2 cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                >
                  {item === "Home" && <Gamepad2 className="w-4 h-4" />}
                  {item === "Games" && <FaGamepad className="w-4 h-4" />}
                  {item === "Categories" && <Sparkles className="w-4 h-4" />}
                  {item === "Top Charts" && <Trophy className="w-4 h-4" />}
                  {item === "New" && <Star className="w-4 h-4" />}
                  {item}
                </motion.a>
              ))}
              <motion.button 
                className="sm:hidden mt-2 w-full px-6 py-2.5 rounded-full font-semibold cursor-pointer transition-all duration-300 text-sm uppercase tracking-wider border-2 border-[#06c1ff] bg-transparent text-[#06c1ff] hover:bg-[#06c1ff] hover:text-[#0b2d72]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/login')}
              >
                Login
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

export default Header