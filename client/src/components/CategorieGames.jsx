import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GameCard from './GameCard';

const CategorieGames = ({ selectedCategory }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredGames, setFilteredGames] = useState([]);
  const [visibleGames, setVisibleGames] = useState(15); // Show 3 rows initially
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://capstone-e1pm.onrender.com/games');
        
        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API Response:', data);

        if (!data) {
          throw new Error('No data received from the server');
        }

        const gamesData = Array.isArray(data) ? data : (data.games || []);
        
        console.log('Processed games data:', gamesData);
        setGames(gamesData);
        setFilteredGames(gamesData);
      } catch (error) {
        console.error('Detailed error:', error);
        setError(`Failed to load games: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  // Filter games whenever selectedCategory changes
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredGames(games);
    } else {
      const filtered = games.filter(game => 
        game.category && game.category.toLowerCase() === selectedCategory.toLowerCase()
      );
      setFilteredGames(filtered);
    }
  }, [games, selectedCategory]);

  const showMoreGames = () => {
    navigate('/categories');
    // Add a small delay before reloading to ensure navigation completes
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500/20 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-t-[#06c1ff] rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg py-6 px-8 my-10 text-red-500 max-w-3xl mx-auto">
        <div className="flex items-center mb-2">
          <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="font-bold">Error</h3>
        </div>
        <p>{error}</p>
      </div>
    );
  }



  return (
    <section className="py-16 bg-gradient-to-b from-blue-900/5 to-blue-800/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredGames.length > 0 ? (
            filteredGames.slice(0, visibleGames).map((game, index) => (
              <div key={index}>
                <GameCard game={game} isNewRelease={true} />
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center text-gray-400">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-lg">No games found in this category</p>
            </div>
          )}
        </div>
        
        {/* See More Button */}
        {filteredGames.length > visibleGames && (
          <div className="flex justify-center mt-4">
            <button
              onClick={showMoreGames}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
            >
              See More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategorieGames;