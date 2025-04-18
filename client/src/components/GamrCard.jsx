import React from 'react';

const GameCard = ({ game, isNewRelease = false }) => {
  const handlePlayClick = () => {
    if (game.url) {
      window.open(game.url, '_blank');
    }
  };

  return isNewRelease ? (
    <div className="min-w-[110px] max-w-[180px] flex-shrink-0 bg-white/10 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-lg hover:shadow-black/20">
      <div className="relative h-[180px] overflow-hidden">
        <img
          src={game.thumb}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-3">
        <span className="text-xs text-[#06c1ff] block mb-1">
          {game.category}
        </span>
        <h3 className="text-sm font-semibold mb-2 text-black truncate">
          {game.title}
        </h3>
      </div>
      <div
        className="bg-[#06c1ff] text-[#0b2d72] font-semibold py-2 text-center text-sm transition-all duration-300 hover:bg-[#ff3a7c] hover:text-white cursor-pointer"
        onClick={handlePlayClick}
      >
        Play Now
      </div>
    </div>
  ) : (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 cursor-pointer hover:translate-y-[-8px] hover:shadow-xl hover:shadow-blue-500/10 border border-white/5">
      <div className="relative h-48 overflow-hidden group">
        <img 
          src={game.thumb} 
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <button 
              onClick={handlePlayClick}
              className="w-full bg-[#06c1ff] text-[#0b2d72] font-semibold py-2 px-4 rounded-lg text-sm flex items-center justify-center transition-all duration-300 hover:bg-[#ff3a7c] hover:text-white transform translate-y-4 group-hover:translate-y-0"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Play Now
            </button>
          </div>
        </div>
        {game.badge && (
          <div className="absolute top-3 right-3 bg-[#ff3a7c] text-white text-xs font-bold px-2.5 py-1 rounded-full z-10">
            {game.badge}
          </div>
        )}
        <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md text-[#06c1ff] text-xs font-medium px-2.5 py-1 rounded-full">
          {game.category}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2 text-white truncate">{game.title}</h3>
        <div className="flex justify-between items-center text-sm text-white/60">
          <div className="flex items-center">
            <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <span>{game.rating || '4.5'}</span>
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>{game.plays || '1000'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
