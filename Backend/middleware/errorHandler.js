import { logger } from './controller/userController.js'; // Import the logger

export const errorHandler = (err, req, res, next) => {
  // Log the error details using logger
  logger.error(`Error occurred: ${err.message}`, { stack: err.stack, statusCode: err.statusCode });

  // Handle different types of errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  } 

  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'Invalid data format' });
  }

  // For generic errors
  res.status(500).json({ error: 'Internal Server Error' });
};
