export interface User {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: string;
}

export interface UnsplashImage {
  id: string;
  urls: {
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string;
  description: string | null;
  user: {
    name: string;
  };
  likes: number;
  color: string;
}

export interface SearchResult {
  term: string;
  results: UnsplashImage[];
  total: number;
}

export interface SearchHistory {
  _id: string;
  term: string;
  timestamp: string;
}

export interface TopSearch {
  _id: string;
  count: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  status: number;
  message?: string;
  data?: T;
  error?: string;
  timestamp: string;
}

export interface AuthContextType {
  user: User | null;
  login: (provider: string) => void;
  logout: () => void;
  loading: boolean;
}

export interface SearchContextType {
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