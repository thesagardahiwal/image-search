import api from './api';
import type { ApiResponse, User } from '../types';

export const authService = {
  async getAuthStatus(): Promise<ApiResponse<{ user: User }>> {
    return api.get('/auth/status');
  },

  async logout(): Promise<ApiResponse> {
    return api.post('/auth/logout');
  },

  async initiateOAuth(provider: string): Promise<{ redirectUrl: string }> {
    // For OAuth, we need to redirect to the backend OAuth endpoint
    // The backend will handle the OAuth flow and redirect back to our app
    return { redirectUrl: `/api/auth/${provider}` };
  },

  async handleOAuthCallback(): Promise<ApiResponse<{ user: User }>> {
    // This would be called after OAuth redirects back to our app
    // We check the auth status to get the user
    return this.getAuthStatus();
  },
};