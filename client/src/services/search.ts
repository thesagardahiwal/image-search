import api from './api';
import type { ApiResponse, SearchResult, SearchHistory, TopSearch } from '../types';

export const searchService = {
  async searchImages(term: string): Promise<ApiResponse<SearchResult>> {
    return api.post('/search', { term });
  },

  async getSearchHistory(): Promise<ApiResponse<SearchHistory[]>> {
    return api.get('/history');
  },

  async getTopSearches(): Promise<ApiResponse<TopSearch[]>> {
    return api.get('/top-searches');
  },

  async clearSearchHistory(): Promise<ApiResponse> {
    return api.delete('/history');
  },
};