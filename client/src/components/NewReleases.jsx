const NewReleases = () => {
    const games = [
      {
        title: "Ninja Run",
        category: "Action",
        image: "/api/placeholder/200/160",
        rating: "4.7",
        plays: "10K",
        badge: "NEW"
      },
      {
        title: "Bubble Pop",
        category: "Puzzle",
        image: "/api/placeholder/200/160",
        rating: "4.5",
        plays: "8K",
        badge: "NEW"
      },
      {
        title: "Sky Diver",
        category: "Adventure",
        image: "/api/placeholder/200/160",
        rating: "4.6",
        plays: "12K",
        badge: "NEW"
      },
      {
        title: "Word Master",
        category: "Word",
        image: "/api/placeholder/200/160",
        rating: "4.4",
        plays: "7K",
        badge: "NEW"
      },
      {
        title: "Soccer Star",
        category: "Sports",
        image: "/api/placeholder/200/160",
        rating: "4.8",
        plays: "15K",
        badge: "NEW"
      },
      {
        title: "Tank Battle",
        category: "Action",
        image: "/api/placeholder/200/160",
        rating: "4.5",
        plays: "9K",
        badge: "NEW"
      }
    ]
    
    return (
      <section className="py-16 bg-[#0b2d72]/5">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold relative pl-4">
              <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-[#06c1ff] rounded"></span>
              New Releases
            </h2>
            <a href="#" className="text-[#06c1ff] font-medium text-sm flex items-center gap-1">
              View All →
            </a>
          </div>
          
          <div className="overflow-hidden">
            <div className="flex gap-5 overflow-x-auto pb-5" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
              {games.map((game, index) => (
                <div key={index} className="min-w-[200px] bg-white/10 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer hover:translate-y-[-8px] hover:shadow-lg hover:shadow-black/20">
                  <div className="relative h-40 overflow-hidden">
                    <img 
                      src={game.image} 
                      alt={game.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                    />
                    {game.badge && (
                      <div className="absolute top-2.5 right-2.5 bg-[#ff3a7c] text-white text-xs font-semibold py-0.5 px-2 rounded z-10">
                        {game.badge}
                      </div>
                    )}
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
        </div>
      </section>
    )
  }
  
  export default NewReleases