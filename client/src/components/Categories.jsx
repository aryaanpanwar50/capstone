const Categories = () => {
    const categories = [
      { icon: "🎮", name: "All Games", active: true },
      { icon: "🔫", name: "Action" },
      { icon: "🧩", name: "Puzzle" },
      { icon: "🏎️", name: "Racing" },
      { icon: "⚔️", name: "Adventure" },
      { icon: "🏀", name: "Sports" },
      { icon: "🎯", name: "Arcade" },
      { icon: "🎲", name: "Board" },
      { icon: "🎭", name: "RPG" },
      { icon: "🏰", name: "Strategy" }
    ]
    
    return (
      <section className="py-10 bg-[#0b2d72]/10">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="flex gap-5 overflow-x-auto pb-2.5" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
            {categories.map((category, index) => (
              <div 
                key={index} 
                className={`min-w-[120px] py-4 rounded-xl text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-2.5 hover:bg-[#06c1ff] hover:text-[#0b2d72] hover:translate-y-[-5px] ${category.active ? 'bg-[#06c1ff] text-[#0b2d72]' : 'bg-white/10'}`}
              >
                <div className="text-2xl">{category.icon}</div>
                <div className="text-sm font-medium">{category.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  export default Categories