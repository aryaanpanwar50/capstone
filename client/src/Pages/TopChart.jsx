import { useState, useEffect } from 'react';
import GameCard from '../components/GameCard';
import Header from '../components/Header';

const TopChart = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState('all'); // 'all', 'weekly', 'monthly', 'today'
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGameCounts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8080/games/counts');
        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }
        const data = await response.json();
        const gamesWithCounts = data.success ? data.games : [];
        
        // Sort games by count in descending order
        const sortedGames = gamesWithCounts.sort((a, b) => (b.count || 0) - (a.count || 0));
        
        // Filter based on time period
        let filteredGames = sortedGames;
        const currentDate = new Date();
        
        if (timeFilter === 'today') {
          const oneDayAgo = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
          filteredGames = sortedGames.filter(game => new Date(game.updatedAt) >= oneDayAgo);
        } else if (timeFilter === 'weekly') {
          const oneWeekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
          filteredGames = sortedGames.filter(game => new Date(game.updatedAt) >= oneWeekAgo);
        } else if (timeFilter === 'monthly') {
          const oneMonthAgo = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);
          filteredGames = sortedGames.filter(game => new Date(game.updatedAt) >= oneMonthAgo);
        }

        // Fetch full game details for the filtered games
        const gameDetailsPromises = filteredGames.map(async (game) => {
          const detailResponse = await fetch(`http://localhost:8080/games/${game._id}`);
          if (!detailResponse.ok) return null;
          const detailData = await detailResponse.json();
          return {
            ...detailData.game,
            count: game.count || 0
          };
        });

        const gameDetails = await Promise.all(gameDetailsPromises);
        setGames(gameDetails.filter(game => game !== null));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGameCounts();
  }, [timeFilter]);

  const timeFilterButtons = [
    { id: 'today', label: 'Today' },
    { id: 'weekly', label: 'This Week' },
    { id: 'monthly', label: 'This Month' },
    { id: 'all', label: 'All Time' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#040d21]">
        <Header />
        <div className="flex justify-center items-center h-[60vh]">
          <div className="relative w-16 h-16">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-[#06c1ff]/20 rounded-full"></div>
            <div className="absolute top-0 left-0 w-full h-full border-4 border-t-[#06c1ff] rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#040d21]">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-500">
            Error: {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#040d21]">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-6 relative pl-6">
            <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-12 bg-[#06c1ff] rounded"></span>
            Top Charts
          </h1>
          
          <div className="flex flex-wrap gap-4">
            {timeFilterButtons.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setTimeFilter(id)}
                className={`px-6 py-2.5 rounded-full font-semibold text-sm uppercase tracking-wider transition-all duration-300
                  ${timeFilter === id 
                    ? 'bg-[#06c1ff] text-[#0b2d72]' 
                    : 'bg-transparent text-[#06c1ff] border-2 border-[#06c1ff] hover:bg-[#06c1ff] hover:text-[#0b2d72]'
                  }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {games.map((game, index) => (
            <div key={game._id || index} className="relative">
              {index < 3 && (
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#06c1ff] text-[#0b2d72] rounded-full flex items-center justify-center font-bold z-10">
                  #{index + 1}
                </div>
              )}
              <div className="absolute top-0 right-0 bg-[#06c1ff] text-[#0b2d72] px-3 py-1 text-sm font-semibold rounded-bl-lg rounded-tr-xl z-10">
                {game.count} plays
              </div>
              <GameCard game={game} />
            </div>
          ))}
        </div>

        {games.length === 0 && (
          <div className="text-center py-16">
            <p className="text-white/60 text-lg">No games found for this time period</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopChart;