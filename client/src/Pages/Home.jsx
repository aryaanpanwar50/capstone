import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';


// Enhanced Categories component with click handling
const Categories = ({ onCategoryClick, selectedCategory }) => {
  const categories = [
    { icon: "🎮", name: "All Games", id: "all" },
    { icon: "🔫", name: "Action", id: "action" },
    { icon: "🧩", name: "Puzzle", id: "puzzle" },
    { icon: "🏎️", name: "Racing", id: "racing" },
    { icon: "⚔️", name: "Adventure", id: "adventure" },
    { icon: "🏀", name: "Sports", id: "sports" },
    { icon: "🎯", name: "Arcade", id: "arcade" },
    { icon: "🎲", name: "Board", id: "board" },
    { icon: "🎭", name: "RPG", id: "rpg" },
    { icon: "🏰", name: "Strategy", id: "strategy" }
  ];
  
  return (
    <section className="py-4 mt-4">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="flex gap-3 overflow-x-auto pb-2.5 scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
          {categories.map((category, index) => (
            <div 
              key={index} 
              className={`min-w-[100px] py-2 px-3 rounded-xl text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-1.5 ${selectedCategory === category.id ? 'bg-blue-100 text-blue-600' : 'bg-white text-gray-700'} hover:bg-blue-100 hover:text-blue-600`}
              onClick={() => onCategoryClick(category.id)}
            >
              <div className="text-xl">{category.icon}</div>
              <div className="text-xs font-medium">{category.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// GameGrid component to display games
const GameGrid = () => {
  // Sample games data
  const games = [
    { id: 1, title: "Clash Karts", image: "/api/placeholder/200/200", color: "from-red-400 to-pink-600" },
    { id: 2, title: "Subway Surfers", image: "/api/placeholder/200/200", color: "from-yellow-400 to-orange-600" },
    { id: 3, title: "MR Racer", image: "/api/placeholder/200/200", color: "from-yellow-300 to-yellow-500" },
    { id: 4, title: "Ice Hockey", image: "/api/placeholder/200/200", color: "from-blue-500 to-indigo-700" },
    { id: 5, title: "Block Puzzle", image: "/api/placeholder/200/200", color: "from-green-400 to-blue-500" },
    { id: 6, title: "Click Post", image: "/api/placeholder/200/200", color: "from-gray-700 to-gray-900" },
    { id: 7, title: "Bartender", image: "/api/placeholder/200/200", color: "from-purple-500 to-pink-500" },
    { id: 8, title: "Temple Run", image: "/api/placeholder/200/200", color: "from-green-600 to-green-800" },
    { id: 9, title: "Bubble Shooter", image: "/api/placeholder/200/200", color: "from-red-300 to-purple-400" },
    { id: 10, title: "Tetris", image: "/api/placeholder/200/200", color: "from-yellow-200 to-yellow-400" },
    { id: 11, title: "Fish Race", image: "/api/placeholder/200/200", color: "from-blue-300 to-blue-500" },
    { id: 12, title: "Bike Racing", image: "/api/placeholder/200/200", color: "from-blue-400 to-blue-600" }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {games.map(game => (
        <div key={game.id} className="relative rounded-2xl overflow-hidden shadow-md cursor-pointer hover:scale-105 transition-transform duration-300">
          <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-30`}></div>
          <img src={game.image} alt={game.title} className="w-full aspect-square object-cover" />
          {/* Game title would be displayed here if needed */}
        </div>
      ))}
    </div>
  );
};

// Featured Game component
const FeaturedGame = () => {
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg mb-8">
      <div className="relative">
        <img src="/api/placeholder/800/400" alt="Featured Game" className="w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold">Bike Racing 3D</h3>
          <p className="text-sm opacity-80">Racing • Arcade</p>
        </div>
      </div>
    </div>
  );
};

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="min-h-screen bg-teal-50">
      <div className="absolute top-0 left-0">
        <Header />
      </div>
      
      <div className="pt-20 pb-10 px-4 md:px-6 max-w-[1280px] mx-auto">
        <Categories 
          onCategoryClick={handleCategoryClick} 
          selectedCategory={selectedCategory} 
        />
        
        <div className="mt-6">
          <FeaturedGame />
          <GameGrid />
        </div>
      </div>
      

      <Footer />
    </div>
  );
}

export default Home;