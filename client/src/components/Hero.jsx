import { Play, Compass, Users } from 'lucide-react'
import { FaGamepad, FaTrophy } from 'react-icons/fa'
import { motion } from 'framer-motion'

const Hero = () => {
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.2
        }
      }
    }

    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5
        }
      }
    }

    return (
      <section className="bg-gradient-to-br from-[#0b2d72] to-[#0f3b8f] py-20 relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-center bg-no-repeat bg-cover z-0"
        />
        
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            className="flex flex-col md:flex-row items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex-1 max-w-xl md:max-w-[600px] text-center md:text-left mb-10 md:mb-0">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight"
                variants={itemVariants}
              >
                Play Thousands of <span className="text-[#06c1ff]">Free Games</span> Online
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed"
                variants={itemVariants}
              >
                Discover instant games that you can play on any device without downloads. Challenge friends and compete in tournaments.
              </motion.p>
              <motion.div 
                className="flex gap-5 justify-center md:justify-start"
                variants={itemVariants}
              >
                <motion.button 
                  className="px-6 py-2.5 rounded-full font-semibold cursor-pointer transition-all duration-300 text-sm uppercase tracking-wider bg-[#06c1ff] text-[#0b2d72] hover:translate-y-[-2px] hover:shadow-lg hover:shadow-[#06c1ff]/40 flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-4 h-4" /> Play Now
                </motion.button>
                <motion.button 
                  className="px-6 py-2.5 rounded-full font-semibold cursor-pointer transition-all duration-300 text-sm uppercase tracking-wider border-2 border-[#06c1ff] bg-transparent text-[#06c1ff] hover:bg-[#06c1ff] hover:text-[#0b2d72] flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Compass className="w-4 h-4" /> Explore Categories
                </motion.button>
              </motion.div>
              
              <motion.div 
                className="mt-12 flex flex-wrap gap-8 justify-center md:justify-start"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {[
                  { icon: <FaGamepad className="w-5 h-5 text-[#06c1ff]" />, text: "10,000+ Games" },
                  { icon: <Users className="w-5 h-5 text-[#06c1ff]" />, text: "1M+ Players" },
                  { icon: <FaTrophy className="w-5 h-5 text-[#06c1ff]" />, text: "Daily Tournaments" }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center gap-2"
                    variants={itemVariants}
                    whileHover={{ scale: 1.1 }}
                  >
                    {item.icon}
                    <span className="text-sm">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            
            <motion.div 
              className="flex-1 relative h-[300px] md:h-[450px] w-full"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.img 
                src="/api/placeholder/600/450" 
                alt="Gaming characters" 
                className="absolute h-full w-full object-contain md:-right-20 right-0"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
    )
  }
  
  export default Hero
  