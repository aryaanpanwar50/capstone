import React, { useState } from 'react';
import CategorieGames from '../components/CategorieGames2';
import Header from '../components/Header';

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
    <section className="py-10 bg-[#0b2d72]/10">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="flex gap-5 overflow-x-auto pb-2.5" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
          {categories.map((category, index) => (
            <div 
              key={index} 
              className={`min-w-[120px] py-4 rounded-xl text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-2.5 hover:bg-[#06c1ff] hover:text-[#0b2d72] hover:translate-y-[-5px] ${selectedCategory === category.id ? 'bg-[#06c1ff] text-[#0b2d72]' : 'bg-white/10'}`}
              onClick={() => onCategoryClick(category.id)}
            >
              <div className="text-2xl">{category.icon}</div>
              <div className="text-sm font-medium">{category.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

function GamesCategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="min-h-screen bg-[#040d21]">
      <Header />
      <Categories onCategoryClick={handleCategoryClick} selectedCategory={selectedCategory} />
      <CategorieGames selectedCategory={selectedCategory} />
    </div>
  );
}

export default GamesCategoriesPage;