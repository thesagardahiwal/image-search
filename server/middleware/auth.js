import { sendAuthError } from '../utils/responseFormat.js';

export const auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  sendAuthError(res, { 
    error: 'Authentication required',
    message: 'Please log in to access this resource'
  });
};

export const optionalAuth = (req, res, next) => {
  next();
};