/**
 * Standard response format for all API responses
 * @param {*} res - Express response object
 * @param {Object} options - Response options
 * @param {*} options.data - Response data
 * @param {string} options.message - Success message
 * @param {string} options.error - Error message
 * @param {number} options.status - HTTP status code
 */
export const sendResponse = (res, { data = null, message = null, error = null, status = 200 }) => {
  const response = {
    success: !error,
    status,
    timestamp: new Date().toISOString()
  };

  if (data !== null) response.data = data;
  if (message) response.message = message;
  if (error) response.error = error;

  res.status(status).json(response);
};

/**
 * Success response helper
 */
export const sendSuccess = (res, { data = null, message = null, status = 200 } = {}) => {
  sendResponse(res, { data, message, status });
};

/**
 * Error response helper
 */
export const sendError = (res, { error = 'Internal Server Error', status = 500, message = null } = {}) => {
  sendResponse(res, { error, message, status });
};

/**
 * Validation error response
 */
export const sendValidationError = (res, { error = 'Validation Failed', message = null } = {}) => {
  sendError(res, { error, message, status: 400 });
};

/**
 * Authentication error response
 */
export const sendAuthError = (res, { error = 'Authentication Failed', message = null } = {}) => {
  sendError(res, { error, message, status: 401 });
};

/**
 * Not found error response
 */
export const sendNotFound = (res, { error = 'Resource Not Found', message = null } = {}) => {
  sendError(res, { error, message, status: 404 });
};