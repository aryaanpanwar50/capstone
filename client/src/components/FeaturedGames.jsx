const FeaturedGames = () => {
    const games = [
      {
        title: "Car Rush",
        category: "Racing",
        image: "/api/placeholder/200/160",
        rating: "4.8",
        plays: "25K",
        badge: "HOT"
      },
      {
        title: "Puzzle Master",
        category: "Puzzle",
        image: "/api/placeholder/200/160",
        rating: "4.7",
        plays: "18K"
      },
      {
        title: "Zombie Shooter",
        category: "Action",
        image: "/api/placeholder/200/160",
        rating: "4.9",
        plays: "32K",
        badge: "NEW"
      },
      {
        title: "Treasure Hunt",
        category: "Adventure",
        image: "/api/placeholder/200/160",
        rating: "4.6",
        plays: "15K"
      },
      {
        title: "Candy Match",
        category: "Puzzle",
        image: "/api/placeholder/200/160",
        rating: "4.5",
        plays: "22K"
      },
      {
        title: "Space War",
        category: "Action",
        image: "/api/placeholder/200/160",
        rating: "4.8",
        plays: "28K",
        badge: "TRENDING"
      }
    ]
    
    return (
      <section className="py-16 bg-[#121212]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white relative pl-5 group">
              <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-[#06c1ff] rounded"></span>
              Featured Games
            </h2>
            <a href="#" className="text-[#06c1ff] font-medium text-sm flex items-center gap-1">
              View All →
            </a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {games.map((game, index) => (
              <div key={index} className="bg-white/10 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer hover:translate-y-[-8px] hover:shadow-lg hover:shadow-black/20">
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={game.image} 
                    alt={game.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                  />
                </div>
                <div className="p-4">
                  <span className="text-xs text-[#06c1ff] block mb-1">{game.category}</span>
                  <h3 className="text-base font-semibold mb-2 text-white truncate">{game.title}</h3>
                  <div className="flex justify-between items-center text-xs text-white/60">
                    <span>★ {game.rating}</span>
                    <span>{game.plays} plays</span>
                  </div>
                </div>
                <div className="bg-[#06c1ff] text-[#0b2d72] font-semibold py-2 flex items-center justify-center text-sm transition-all duration-300 hover:bg-[#ff3a7c] hover:text-white">
                  Play Now
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  export default FeaturedGames