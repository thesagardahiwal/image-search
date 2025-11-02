import { sendValidationError } from '../utils/responseFormat.js';

export const validateSearchTerm = (req, res, next) => {
  const { term } = req.body;

  if (!term || typeof term !== 'string') {
    return sendValidationError(res, {
      error: 'Invalid search term',
      message: 'Search term is required and must be a string'
    });
  }

  const trimmedTerm = term.trim();
  
  if (trimmedTerm.length === 0) {
    return sendValidationError(res, {
      error: 'Empty search term',
      message: 'Search term cannot be empty or whitespace'
    });
  }

  if (trimmedTerm.length > 100) {
    return sendValidationError(res, {
      error: 'Search term too long',
      message: 'Search term must be less than 100 characters'
    });
  }

  req.body.term = trimmedTerm;
  next();
};