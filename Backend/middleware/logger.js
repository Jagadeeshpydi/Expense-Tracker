import winston from 'winston';

const { combine, timestamp, printf, errors } = winston.format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    errors({ stack: true }),
    logFormat
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'app.log' })
  ]
});

export const logRequests = (req, res, next) => {
  const start = Date.now();
  logger.info(`Request: ${req.method} ${req.url}`);

  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(`Response: ${req.method} ${req.url} ${res.statusCode} - ${duration}ms`);
  });

  next();
};

export { logger };
