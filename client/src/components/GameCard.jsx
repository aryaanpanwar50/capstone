import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const GameCard = ({ game, isNewRelease = false }) => {
  const [localCount, setLocalCount] = useState(game.count || 0);

  const updateCount = async (_id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No authentication token found');
        return;
      }

      const response = await fetch(`http://localhost:8080/games/${_id}/count`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setLocalCount(data.count);
      } else if (response.status === 401) {
        console.error('Authentication token expired or invalid');
      }
    } catch (error) {
      console.error('Error updating game count:', error);
    }
  };

  const handlePlayClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (game._id) {
      updateCount(game._id);
    }
    if (game.url) {
      window.open(game.url, '_blank');
    }
  };

  const isVideo = game.thumb?.match(/\.(mp4|webm|ogg)$/i);

  if (isNewRelease) {
    return (
      <Link to={`/games/${game._id}`} className="block">
        <div className="min-w-[110px] max-w-[180px] flex-shrink-0 bg-gray-900 rounded-2xl overflow-hidden">
          <div className="relative h-[180px] overflow-hidden">
            {isVideo ? (
              <video
                src={game.thumb}
                alt={game.title}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <img
                src={game.thumb}
                alt={game.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="p-4">
            <h3 className="text-sm font-bold mb-2 text-white truncate">
              {game.title}
            </h3>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/games/${game._id}`} className="block">
      <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10">
        <div className="relative h-48 overflow-hidden">
          {isVideo ? (
            <video
              src={game.thumb}
              alt={game.title}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <img 
              src={game.thumb} 
              alt={game.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="p-5">
          <h3 className="text-lg font-bold mb-3 text-white truncate">{game.title}</h3>
        </div>
      </div>
    </Link>
  );
};

GameCard.propTypes = {
  game: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string.isRequired,
    category: PropTypes.string,
    rating: PropTypes.string,
    thumb: PropTypes.string,
    url: PropTypes.string,
    badge: PropTypes.string,
    count: PropTypes.number
  }).isRequired,
  isNewRelease: PropTypes.bool
};

export default GameCard;