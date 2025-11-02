import { sendSuccess, sendError, sendAuthError } from '../utils/responseFormat.js';

export const getAuthStatus = (req, res) => {
  if (req.user) {
    sendSuccess(res, {
      data: {
        user: {
          _id: req.user._id,
          email: req.user.email,
          name: req.user.name,
          avatar: req.user.avatar,
          provider: req.user.provider
        }
      },
      message: 'User is authenticated'
    });
  } else {
    sendSuccess(res, {
      data: { user: null },
      message: 'User is not authenticated'
    });
  }
};

export const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err);
      return sendError(res, {
        error: 'Logout failed',
        message: 'Failed to logout user'
      });
    }
    
    req.session.destroy((err) => {
      if (err) {
        console.error('Session destroy error:', err);
      }
      
      res.clearCookie('connect.sid');
      sendSuccess(res, {
        message: 'Logged out successfully'
      });
    });
  });
};

export const oauthCallback = (req, res) => {
  // Successful authentication, redirect home
  res.redirect(process.env.CLIENT_URL);
};

export const oauthFailure = (req, res) => {
  res.redirect(`${process.env.CLIENT_URL}/login?error=auth_failed`);
};