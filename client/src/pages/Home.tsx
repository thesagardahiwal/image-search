import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useSearch } from '../hooks/useSearch';
import { SearchBar } from '../components/search/SearchBar';
import { ImageGrid } from '../components/search/ImageGrid';
import { SelectionCounter } from '../components/search/SelectionCounter';
import { SearchHistory } from '../components/history/SearchHistory';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { EmptyState } from '../components/common/EmptyState';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export const Home: React.FC = () => {
  const { user } = useAuth();
  const {
    searchResults,
    searchTerm,
    totalResults,
    selectedImages,
    loading,
    searchHistory,
    topSearches,
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
  }, [user, fetchSearchHistory, fetchTopSearches]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-gray-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search Section */}
            <Card>
              <CardContent className="p-6">
                <SearchBar
                  onSearch={searchImages}
                  loading={loading}
                  initialValue={searchTerm}
                />
              </CardContent>
            </Card>

            {/* Search Info */}
            {searchTerm && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        Results for{" "}
                        <span className="text-primary-600">"{searchTerm}"</span>
                      </h2>
                      <p className="text-gray-600 mt-1">
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
                </CardContent>
              </Card>
            )}

            {/* Selection Counter */}
            <SelectionCounter
              selectedCount={selectedImages.length}
              onClearSelection={clearSelection}
            />

            {/* Image Grid */}
            <div className="animate-fade-in">
              <ImageGrid
                images={searchResults}
                selectedImages={selectedImages}
                onImageSelect={toggleImageSelection}
                loading={loading}
              />
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