import React from 'react';
import { TrendingUp } from 'lucide-react';
import { type TopSearch } from '../../types';

interface TopSearchesProps {
  topSearches: TopSearch[];
  loading?: boolean;
  onSearchClick?: (term: string) => void;
}

export const TopSearches: React.FC<TopSearchesProps> = ({
  topSearches,
  loading = false,
  onSearchClick,
}) => {
  if (loading) {
    return (
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4">
            <div className="w-5 h-5 bg-primary-400 rounded animate-pulse" />
            <div className="h-4 bg-primary-400 rounded w-32 animate-pulse" />
            <div className="flex space-x-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-6 bg-primary-400 rounded-full w-20 animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (topSearches.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span className="font-semibold">Trending Searches</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {topSearches.map((search, index) => (
              <button
                key={search._id}
                onClick={() => onSearchClick?.(search._id)}
                className="glass px-3 py-1 rounded-full text-sm font-medium hover:bg-white/30 transition-all duration-200 hover:scale-105 cursor-pointer"
                title={`Searched ${search.count} times`}
              >
                #{index + 1} {search._id} ({search.count})
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};