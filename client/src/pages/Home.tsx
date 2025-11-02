import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useSearch } from '../hooks/useSearch';
import { SearchBar } from '../components/search/SearchBar';
import { ImageGrid } from '../components/search/ImageGrid';
import { SelectionCounter } from '../components/search/SelectionCounter';
import { SearchHistory } from '../components/history/SearchHistory';
import { Card, CardContent } from '../components/ui/Card';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { TopSearches } from '../components/common/TopSearches';

export const Home: React.FC = () => {
  const { user } = useAuth();
  const {
    searchResults,
    searchTerm,
    totalResults,
    selectedImages,
    loading,
    searchHistory,
    searchImages,
    toggleImageSelection,
    clearSelection,
    fetchSearchHistory,
    fetchTopSearches,
  } = useSearch();

  useEffect(() => {
    if (user) {
      fetchSearchHistory();
      fetchTopSearches();
    }
  }, [user]);

  const handleTopSearchClick = (term: string) => {
    searchImages(term);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-linear-to-br from-primary-50 to-gray-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-linear-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-white">🔍</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome to ImageSearch
            </h1>
            <p className="text-gray-600 mb-6">
              Please log in to search for beautiful images and manage your search history.
            </p>
            <a
              href="/login"
              className="btn-primary w-full py-3"
            >
              Get Started
            </a>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-primary-50 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
            <div className="lg:col-span-3 space-y-4 sm:space-y-6">
            {/* Hero Search Section */}
            <div className="text-center mb-4 sm:mb-8 px-4 sm:px-0">
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-white leading-tight">
                The internet's source of{" "}
                <span className="block sm:inline">freely usable images.</span>
                </h1>
                <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Powered by creators everywhere.
                </p>
            </div>

            {/* Search Section */}
            <div className="glass p-4 sm:p-6 md:p-8 mb-4 sm:mb-8 mx-2 sm:mx-0 rounded-2xl">
                <SearchBar
                onSearch={searchImages}
                loading={loading}
                initialValue={searchTerm}
                showSuggestions={true}
                />
                
                {/* Quick Categories - Hidden on mobile, shown on tablet+ */}
                <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-2 sm:gap-3">
                {['Nature', 'Wallpapers', 'Travel', 'Architecture', 'Food', 'Animals'].map((category) => (
                    <button
                    key={category}
                    onClick={() => searchImages(category)}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200 hover:scale-105"
                    >
                    {category}
                    </button>
                ))}
                </div>
                <TopSearches onSearchClick={handleTopSearchClick} />
            </div>

            {/* Search Info */}
            {searchTerm && (
                <div className="card p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                    <div className="flex-1 min-w-0">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 break-words">
                        Results for{" "}
                        <span className="text-primary-600">"{searchTerm}"</span>
                    </h2>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base">
                        {totalResults.toLocaleString()} images found
                    </p>
                    </div>
                    {loading && (
                    <div className="flex items-center space-x-2 text-primary-600">
                        <LoadingSpinner size="sm" />
                        <span className="text-sm">Searching...</span>
                    </div>
                    )}
                </div>
                </div>
            )}

            {/* Rest of the content with responsive adjustments */}
            <div className="px-2 sm:px-0">
                <SelectionCounter
                selectedCount={selectedImages.length}
                onClearSelection={clearSelection}
                />

                {/* Image Grid */}
                <div className="animate-fade-in mt-4 sm:mt-6">
                <ImageGrid
                    images={searchResults}
                    selectedImages={selectedImages}
                    onImageSelect={toggleImageSelection}
                    loading={loading}
                />
                </div>
            </div>
            </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <SearchHistory
              history={searchHistory}
              onSearchClick={searchImages}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};