import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import { Clock, Users, Star, Award, Share2, Heart, Eye, Maximize, Minimize } from 'lucide-react';

const Desc = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [relatedGames, setRelatedGames] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const gameFrameStyle = isFullscreen ? {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 50,
    border: 'none',
  } : {
    minHeight: 700,
    border: 'none',
  };

  useEffect(() => {
    const fetchGame = async () => {
      try {
        // Fetch game details
        const response = await fetch(`http://localhost:8080/games/${id}`);
        if (!response.ok) {
          throw new Error('Game not found');
        }
        const data = await response.json();
        setGame(data.game);
        
        // Fetch related games based on category
        if (data.game.category) {
          const relatedResponse = await fetch(`http://localhost:8080/games?category=${data.game.category}&limit=4`);
          if (relatedResponse.ok) {
            const relatedData = await relatedResponse.json();
            // Filter out the current game
            setRelatedGames(relatedData.games.filter(g => g.id !== id).slice(0, 3));
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
    // Reset scroll position when game ID changes
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isFullscreen]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    // You could implement API call to save like status
  };

  const GameSkeleton = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white/5 rounded-xl p-8 animate-pulse">
        <div className="h-10 w-3/4 bg-white/10 rounded mb-4"></div>
        <div className="flex items-center gap-4 mb-6">
          <div className="h-6 w-24 bg-white/10 rounded-full"></div>
          <div className="h-6 w-16 bg-white/10 rounded"></div>
        </div>
        <div className="h-48 w-full bg-white/10 rounded mb-8"></div>
        <div className="h-12 w-36 bg-white/10 rounded-lg"></div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-950 to-indigo-950">
        <Header />
        <div className="flex justify-center items-center h-64">
          <div className="relative w-16 h-16">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-300/20 rounded-full"></div>
            <div className="absolute top-0 left-0 w-full h-full border-4 border-t-indigo-500 rounded-full animate-spin"></div>
          </div>
        </div>
        <GameSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-950 to-indigo-950">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-red-400">
            <h2 className="text-xl font-bold mb-2">Game Not Found</h2>
            <p>{error}</p>
            <Link to="/" className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              Return to Games
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-indigo-950 text-gray-100">
      {!isFullscreen && <Header />}
      
      {game && (
        <div className="max-w-7xl mx-auto px-4 pt-8 pb-16">
          
          <div className="flex flex-col lg:flex-row gap-8 mb-8">            
            <div className="lg:w-1/2">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {game.category}
                </span>
                {game.featured && (
                  <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Award size={14} /> Featured
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">{game.title}</h1>
              
              <div className="flex flex-wrap items-center gap-6 text-gray-300 mb-6">
                <div className="flex items-center gap-2">
                  <Users size={18} />
                  <span>{game.count || 0} plays</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  <span>{game.avgPlayTime || '5 min'}</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star}
                      size={18} 
                      fill={star <= (game.rating || 4) ? "currentColor" : "none"}
                      className={star <= (game.rating || 4) ? "text-amber-400" : "text-gray-600"}
                    />
                  ))}
                  <span className="ml-1">{game.rating || 4}/5</span>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-6 mb-6 border border-white/10">
                <h2 className="text-xl font-semibold mb-3">About This Game</h2>
                <p className="text-gray-300 leading-relaxed">{game.description}</p>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={handleLike}
                  className={`p-3 rounded-lg border ${isLiked ? 'bg-red-500 border-red-600 text-white' : 'border-white/20 text-gray-200'} hover:bg-white/10 transition-colors`}
                >
                  <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
                </button>
                <button className="p-3 rounded-lg border border-white/20 text-gray-200 hover:bg-white/10 transition-colors">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          </div>
          {/* Embed/play the game directly if game.url exists */}
          {game.url && (
            <div className={`relative w-full mb-10 rounded-xl overflow-hidden border border-white/10 shadow-xl bg-black ${isFullscreen ? 'fixed inset-0 z-40' : ''}`}>
              <button
                onClick={toggleFullscreen}
                className="absolute top-4 right-4 p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-colors z-50 text-white"
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              >
                {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
              </button>
              <iframe
                src={game.url}
                title={game.title}
                className="w-full"
                style={gameFrameStyle}
                allow="autoplay; fullscreen"
              />
            </div>
          )}
          {/* Game details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Eye size={18} /> Requirements
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li>• {game.platform || 'Web Browser'}</li>
                <li>• {game.requiredConnection || 'Internet Connection'}</li>
                <li>• {game.controlType || 'Mouse & Keyboard'}</li>
              </ul>
            </div>
            
            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
              <h3 className="text-lg font-semibold mb-3">Developer</h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                  {game.developer?.charAt(0) || 'D'}
                </div>
                <div>
                  <p className="font-medium">{game.developer || 'Jio Games Studio'}</p>
                  <p className="text-sm text-gray-400">{game.releaseDate || 'Released 2023'}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
              <h3 className="text-lg font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(game.tags) ? game.tags : ['Action', 'Adventure', 'Casual']).map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-white/10 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Related games */}
          {relatedGames.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Similar Games</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedGames.map((relatedGame) => (
                  <Link to={`/games/${relatedGame.id}`} key={relatedGame.id} className="block">
                    <div className="bg-white/5 rounded-lg overflow-hidden border border-white/10 hover:border-indigo-500/50 transition-all hover:shadow-lg hover:shadow-indigo-500/20 group">
                      <div className="aspect-video bg-gradient-to-r from-blue-600/30 to-indigo-600/30 relative">
                        {relatedGame.imageUrl ? (
                          <img src={relatedGame.imageUrl} alt={relatedGame.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-2xl font-bold">{relatedGame.title?.charAt(0)}</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                          <span className="text-white font-medium">View Game</span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-1 group-hover:text-indigo-400 transition-colors">{relatedGame.title}</h3>
                        <div className="flex items-center justify-between text-sm text-gray-400">
                          <span>{relatedGame.category}</span>
                          <div className="flex items-center gap-1">
                            <Star size={14} fill="currentColor" className="text-amber-500" />
                            <span>{relatedGame.rating || 4}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );    
};

export default Desc;