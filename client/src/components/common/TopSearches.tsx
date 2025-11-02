import React, { useEffect } from 'react';
import { TrendingUp, Search, Clock, Zap } from 'lucide-react';
import { useSearch } from '../../hooks/useSearch';
import type { TopSearch } from '../../types';

interface TopSearchesProps {
  onSearchClick?: (term: string) => void;
}

export const TopSearches: React.FC<TopSearchesProps> = ({ onSearchClick }) => {
  const { topSearches, fetchTopSearches, loading } = useSearch();

  useEffect(() => {
    fetchTopSearches();
  }, []);

  const getRankColor = (index: number) => {
    switch (index) {
      case 0: return 'from-yellow-400 to-orange-500';
      case 1: return 'from-gray-300 to-gray-500';
      case 2: return 'from-amber-600 to-amber-800';
      default: return 'from-primary-500 to-primary-700';
    }
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return index + 1;
    }
  };

  if (loading) {
    return (
      <div className="bg-linear-to-r from-primary-500 to-primary-600 text-white py-4 animate-pulse">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-5 h-5" />
            <span className="text-lg font-semibold">Top Searches</span>
          </div>
          <div className="flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-8 bg-white/20 rounded-lg w-20" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!topSearches || topSearches.length === 0) return null;

  return (
    <div className="bg-linear-to-r from-primary-600 to-primary-700 text-gray-200 py-4 shadow-md backdrop-blur-md border-b rounded-2xl mt-2 border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        
        {/* --- Header --- */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-yellow-300 drop-shadow-sm" />
            <span className="text-lg font-semibold tracking-wide">Trending Now</span>
          </div>
          <div className="hidden sm:flex items-center space-x-2 text-sm text-white/80">
            <Clock className="w-4 h-4" />
          </div>
        </div>

        {/* --- Top Search Terms --- */}
        <div className="flex flex-wrap items-center gap-3 justify-center sm:justify-start">
          {topSearches.slice(0, 5).map((search: TopSearch, index: number) => (
            <button
              key={search._id}
              onClick={() => onSearchClick?.(search._id)}
              className="
                group relative flex items-center gap-2
                bg-white/10 hover:bg-white/20
                border border-white/20 hover:border-white/40
                backdrop-blur-md
                px-4 py-2 rounded-lg
                transition-all duration-300
                hover:scale-105 hover:shadow-[0_0_12px_rgba(255,255,255,0.15)]
              "
              title={`"${search._id}" searched ${search.count} times`}
            >
              {/* Rank Circle */}
              <div className={`w-7 h-7 rounded-full bg-linear-to-r ${getRankColor(index)} flex items-center justify-center text-xs font-bold shadow-sm`}>
                {getRankIcon(index)}
              </div>

              {/* Text Info */}
              <div className="flex flex-col text-left min-w-0">
                <span className="text-sm font-medium truncate">{search._id}</span>
                <div className="flex items-center space-x-1 text-xs text-white/70">
                  <Zap className="w-3 h-3" />
                  <span>{search.count} searches</span>
                </div>
              </div>

              {/* Hover Icon */}
              <Search className="w-4 h-4 text-white/50 opacity-0 group-hover:opacity-100 transition duration-200 ml-1" />
            </button>
          ))}
        </div>

        {/* --- Mobile Info --- */}
        <div className="sm:hidden flex items-center justify-center space-x-2 text-sm text-white/80">
          <Clock className="w-4 h-4" />
          <span>Real-time updates</span>
        </div>
      </div>
    </div>
  );
};
