import { authenticateToken } from './authMiddleware.js';
import { logRequests } from './logger.js'; // Import the logRequests middleware function
import { errorHandler } from './errorHandler.js';

export {
  authenticateToken,
  logRequests, // Export the logRequests middleware function
  errorHandler
};
