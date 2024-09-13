import { authenticateToken } from './authMiddleware.js';
import { logRequests } from './logger.js'; // Import the logging middleware
import { errorHandler } from './errorHandler.js';

// Export the middleware functions
export {
  authenticateToken,
  logRequests, // Middleware for logging requests
  errorHandler // Middleware for handling errors
};
