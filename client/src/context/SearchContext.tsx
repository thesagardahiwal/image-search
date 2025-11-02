import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { UnsplashImage, SearchHistory, TopSearch } from '../types';
import { searchService } from '../services/search';

interface SearchContextType {
  searchResults: UnsplashImage[];
  searchTerm: string;
  totalResults: number;
  selectedImages: string[];
  loading: boolean;
  searchHistory: SearchHistory[];
  topSearches: TopSearch[];
  searchImages: (term: string) => Promise<void>;
  toggleImageSelection: (imageId: string) => void;
  clearSelection: () => void;
  fetchSearchHistory: () => Promise<void>;
  fetchTopSearches: () => Promise<void>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [searchResults, setSearchResults] = useState<UnsplashImage[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalResults, setTotalResults] = useState(0);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [topSearches, setTopSearches] = useState<TopSearch[]>([]);

  const searchImages = async (term: string) => {
    if (!term.trim()) return;

    setLoading(true);
    setSearchTerm(term);
    setSelectedImages([]);

    try {
      const response = await searchService.searchImages(term);
      if (response.success && response.data) {
        setSearchResults(response.data.results);
        setTotalResults(response.data.total);
        await fetchSearchHistory(); // Refresh history after new search
      }
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  const toggleImageSelection = (imageId: string) => {
    setSelectedImages(prev =>
      prev.includes(imageId)
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId]
    );
  };

  const clearSelection = () => {
    setSelectedImages([]);
  };

  const fetchSearchHistory = async () => {
    try {
      const response = await searchService.getSearchHistory();
      if (response.success && response.data) {
        setSearchHistory(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch search history:', error);
    }
  };

  const fetchTopSearches = async () => {
    try {
      const response = await searchService.getTopSearches();
      if (response.success && response.data) {
        setTopSearches(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch top searches:', error);
    }
  };

  const value: SearchContextType = {
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
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};