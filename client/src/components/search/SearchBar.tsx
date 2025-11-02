import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, Clock, Sparkles } from 'lucide-react';
import { Input } from '../ui/Input';
import { useSearch } from '../../hooks/useSearch';
import { Button } from '../ui/Button';


interface SearchBarProps {
  onSearch: (term: string) => void;
  loading?: boolean;
  initialValue?: string;
  showSuggestions?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  loading = false,
  initialValue = '',
  showSuggestions = true,
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const [showTrending, setShowTrending] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { searchHistory, topSearches } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Show trending suggestions when input is empty and focused
  useEffect(() => {
    setShowTrending(isFocused && !searchTerm.trim());
  }, [isFocused, searchTerm]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      setIsFocused(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    inputRef.current?.focus();
  };

  const handleSuggestionClick = (term: string) => {
    setSearchTerm(term);
    onSearch(term);
    setIsFocused(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  const trendingSuggestions = [
    'Wallpapers',
    'Nature',
    'Travel',
    'Architecture',
    'Street',
    'Minimal',
    'Textures',
    'Animals',
    'Food',
    'Business'
  ];

  const recentSearches = searchHistory.slice(0, isMobile ? 3 : 5);

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input Container */}
          <div className="flex-1 relative">
            <Input
                ref={inputRef}
                type="text"
                icon={Search}
                placeholder={
                isMobile
                    ? "Search photos..."
                    : "Search free high-resolution photos"
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                onKeyDown={handleKeyDown}
                className={`
                w-full pr-12 py-3 sm:py-4 text-base sm:text-lg 
                border-2 border-transparent focus:border-primary-300 
                transition-all duration-200 bg-white/95 backdrop-blur-sm 
                shadow-lg sm:rounded-xl rounded-lg
                ${isMobile ? 'text-sm' : ''}
                `}
            />

            {/* Right-side Actions */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-2">
                {searchTerm && (
                <button
                    type="button"
                    onClick={clearSearch}
                    className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                >
                    <X className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                </button>
                )}

                {/* Mobile Search Button (visible on < sm) */}
                <Button
                type="submit"
                disabled={!searchTerm.trim() || loading}
                className="flex sm:hidden items-center justify-center px-3 py-1 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                {loading ? (
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                    <Search className="h-3 w-3" />
                )}
                </Button>
            </div>
            </div>

            {/* Desktop Search Button (visible on ≥ sm) */}
            <Button
                type="submit"
                disabled={!searchTerm.trim() || loading}
                className="hidden sm:flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                    'Search'
                )}
            </Button>
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {isFocused && showSuggestions && (
        <div
          ref={dropdownRef}
          className={`
            absolute top-full left-0 right-0 mt-2 bg-white rounded-xl 
            shadow-2xl border border-gray-200 backdrop-blur-lg bg-white/95 
            z-50 animate-scale-in overflow-hidden
            ${isMobile ? 'max-h-[70vh] overflow-y-auto' : 'max-h-[60vh]'}
          `}
        >
          {/* Recent Searches */}
          {recentSearches.length > 0 && searchTerm.trim() === '' && (
            <div className="p-3 sm:p-4 border-b border-gray-100">
              <div className="flex items-center space-x-2 mb-2 sm:mb-3">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                <span className="text-xs sm:text-sm font-medium text-gray-700">
                  Recent searches
                </span>
              </div>
              <div className="space-y-1">
                {recentSearches.map((item) => (
                  <button
                    key={item._id}
                    onClick={() => handleSuggestionClick(item.term)}
                    className="w-full text-left px-2 sm:px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-150 flex items-center justify-between group text-sm sm:text-base"
                  >
                    <span className="text-gray-700 group-hover:text-gray-900 truncate">
                      {item.term}
                    </span>
                    <Search className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Trending Suggestions */}
          {showTrending && (
            <div className="p-3 sm:p-4">
              <div className="flex items-center space-x-2 mb-2 sm:mb-3">
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                <span className="text-xs sm:text-sm font-medium text-gray-700">
                  Trending searches
                </span>
              </div>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {trendingSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-2 sm:px-3 py-1 sm:py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs sm:text-sm text-gray-700 hover:text-gray-900 transition-all duration-200 hover:scale-105"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Top Searches from API */}
          {topSearches.length > 0 && searchTerm.trim() === '' && (
            <div className="p-3 sm:p-4 border-t border-gray-100 bg-gray-50">
              <div className="flex items-center space-x-2 mb-2 sm:mb-3">
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                <span className="text-xs sm:text-sm font-medium text-gray-700">
                  Popular this week
                </span>
              </div>
              <div className="space-y-1">
                {topSearches.slice(0, isMobile ? 2 : 3).map((search, index) => (
                  <button
                    key={search._id}
                    onClick={() => handleSuggestionClick(search._id)}
                    className="w-full text-left px-2 sm:px-3 py-2 rounded-lg hover:bg-white transition-colors duration-150 flex items-center justify-between group text-sm sm:text-base"
                  >
                    <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                      <span className="w-4 h-4 sm:w-5 sm:h-5 bg-primary-100 text-primary-600 rounded-full text-xs flex items-center justify-center font-medium flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-gray-700 group-hover:text-gray-900 truncate">
                        {search._id}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-200 px-1 sm:px-2 py-0.5 sm:py-1 rounded flex-shrink-0 ml-2">
                      {search.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Search Tips */}
          <div className="p-3 sm:p-4 border-t border-gray-100 bg-gray-50">
            <div className="text-xs text-gray-500 space-y-1">
              <div className="flex items-center space-x-2">
                <kbd className="px-1 py-0.5 text-xs bg-white border border-gray-300 rounded shadow-sm">
                  {isMobile ? 'Tap' : 'Enter'}
                </kbd>
                <span className="text-xs">to search</span>
              </div>
              <div className="flex items-center space-x-2">
                <kbd className="px-1 py-0.5 text-xs bg-white border border-gray-300 rounded shadow-sm">
                  Esc
                </kbd>
                <span className="text-xs">to close</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};